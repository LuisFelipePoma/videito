# dataset.py

import os
import cv2
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader, WeightedRandomSampler

# ---------------------------
# Preprocessing parameters
# ---------------------------
ROOT_DIR  = ''  # Path to the dataset
CLASSES    = [0, 1, 2, 3]
IMG_SIZE   = 224      # image size for EfficientNet
MAX_FRAMES = 16       # frames per video
BATCH_SIZE = 8
SPLITS = ['train', 'validation', 'test']

def load_video(path, max_frames=MAX_FRAMES, img_size=IMG_SIZE):
    cap = cv2.VideoCapture(path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        cap.release()
        return np.zeros((max_frames, 3, img_size, img_size), np.float32)

    indices = np.linspace(0, total-1, max_frames, dtype=int)
    frames = []
    for idx in indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            frame = np.zeros((img_size, img_size, 3), np.uint8)
        else:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.resize(frame, (img_size, img_size))
        frames.append(frame.transpose(2, 0, 1))
    cap.release()

    arr = np.stack(frames).astype(np.float32) / 255.0
    mean = np.array([0.485,0.456,0.406]).reshape(1,3,1,1)
    std  = np.array([0.229,0.224,0.225]).reshape(1,3,1,1)
    return (arr - mean) / std

class VideoDataset(Dataset):
    def __init__(self, root_dir, split):
        self.video_paths = []
        self.labels = []
        for cls in CLASSES:
            folder = os.path.join(root_dir, str(cls), split)
            if not os.path.isdir(folder):
                continue
            for fname in os.listdir(folder):
                if fname.lower().endswith(('.mp4','.avi')):
                    p = os.path.join(folder, fname)
                    if os.path.getsize(p) > 0:
                        self.video_paths.append(p)
                        self.labels.append(cls)
        print(f"[{split}] {len(self.video_paths)} videos")

    def __len__(self):
        return len(self.video_paths)

    def __getitem__(self, idx):
        frames = load_video(self.video_paths[idx])
        label  = self.labels[idx]
        return torch.from_numpy(frames), torch.tensor(label, dtype=torch.long)

def _worker_init_fn(worker_id):
    # Para reproducibilidad: cada worker ve distinto offset
    seed = torch.initial_seed() % 2**32
    np.random.seed(seed + worker_id)

def create_dataloaders(root_dir, batch_size=BATCH_SIZE, num_workers=2):
    # 1) Datasets
    train_ds = VideoDataset(root_dir, 'train')
    val_ds   = VideoDataset(root_dir, 'validation')
    test_ds  = VideoDataset(root_dir, 'test')

    # 2) Weighted sampler para balancear clases en train
    labels = torch.tensor(train_ds.labels)
    counts = torch.bincount(labels, minlength=len(CLASSES)).float()
    weights = 1.0 / counts
    sample_weights = weights[labels]
    sampler = WeightedRandomSampler(sample_weights, len(sample_weights), replacement=True)

    # 3) DataLoaders con multiprocessing
    train_loader = DataLoader(
        train_ds,
        batch_size=batch_size,
        sampler=sampler,
        num_workers=num_workers,
        pin_memory=True,
        persistent_workers=True,
        worker_init_fn=_worker_init_fn,
        drop_last=True
    )
    val_loader = DataLoader(
        val_ds,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=True,
        persistent_workers=True,
        worker_init_fn=_worker_init_fn,
        drop_last=False
    )
    test_loader = DataLoader(
        test_ds,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers,
        pin_memory=True,
        persistent_workers=True,
        worker_init_fn=_worker_init_fn,
        drop_last=False
    )

    return train_loader, val_loader, test_loader
