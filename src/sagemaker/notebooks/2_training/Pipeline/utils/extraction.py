#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
DAiSEE Engagement – entrenamiento temporal
EfficientNet-B0 (features pre-extraídas) →  [Transformer | Bi-LSTM]  →  MLP
"""

# ------------------------------------------------------------------
# 0. IMPORTS Y CONFIGURACIÓN GLOBAL
# ------------------------------------------------------------------
import os, numpy as np, tensorflow as tf


# -------------------- PRE-PROCESADO / DATASET ---------------------
ROOT_DIR        = "../../DAiSEE/DataSet/Aug"    # carpeta vídeos (solo referencia → ya convertidos a .npy)
OUTPUT_FEATURES = "../../DAiSEE/features"       # donde están los .npy
CLASSES         = ["0", "1", "2", "3"]
SPLITS          = ["train", "validation", "test"]
NUM_FRAMES      = 32
BATCH_SIZE      = 32
DEPTH           = len(CLASSES)                  # 4

def make_dataset(split: str, shuffle=True) -> tf.data.Dataset:
    """
    Devuelve tf.data.Dataset con lotes mezclados y etiquetas ONE-HOT.
    Siempre balancea por clase mediante sample_from_datasets + repeat().
    """
    datasets = []
    for cls in CLASSES:
        pattern = os.path.join(OUTPUT_FEATURES, cls, split, "*.npy")
        files   = tf.data.Dataset.list_files(pattern, shuffle=shuffle)

        def _load(path):
            x = tf.numpy_function(np.load, [path], tf.float32)       # (32, 1280)
            x.set_shape((NUM_FRAMES, 1280))
            y = tf.strings.split(path, os.sep)[-3]
            y = tf.strings.to_number(y, out_type=tf.int32)           # escalar
            return x, y

        ds = files.map(_load, num_parallel_calls=tf.data.AUTOTUNE).repeat()
        datasets.append(ds)

    mixed = tf.data.Dataset.sample_from_datasets(
        datasets,
        weights=[1/DEPTH]*DEPTH,         # balance ¼-¼-¼-¼
        stop_on_empty_dataset=False,
    )

    # 🔸 Etiquetas → one-hot int32 → float32
    def to_one_hot(x, y):
        y = tf.one_hot(tf.cast(y, tf.int32), DEPTH)          # (4,) float32
        return x, y

    return (mixed
            .map(to_one_hot, num_parallel_calls=tf.data.AUTOTUNE)
            .shuffle(1000)
            .batch(BATCH_SIZE, drop_remainder=True)
            .prefetch(tf.data.AUTOTUNE))