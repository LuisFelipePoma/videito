# Proyecto de Entrenamiento y Despliegue de Modelo

Este repositorio contiene el código para el proceso completo del modelo, desde la extracción y transformación de datos (ETL) hasta su entrenamiento y despliegue.

## Índice

- [Proyecto de Entrenamiento y Despliegue de Modelo](#proyecto-de-entrenamiento-y-despliegue-de-modelo)
	- [Índice](#índice)
	- [Estructura del Directorio](#estructura-del-directorio)
	- [Requisitos](#requisitos)
	- [Instrucciones de Uso](#instrucciones-de-uso)
	- [Como Configurar el Entorno](#como-configurar-el-entorno)

## Estructura del Directorio

- **etl/**: Scripts y recursos para la extracción, transformación y carga de datos.
- **training/**: Código y notebooks para el entrenamiento del modelo.
- **deployment/**: Scripts y configuraciones para el despliegue del modelo.

## Requisitos

- Python 3.10.*.
- Librerías necesarias (por ejemplo, boto3, pandas, scikit-learn, etc.).
- Acceso configurado a AWS SageMaker.

## Instrucciones de Uso

1. Configurar el entorno e instalar las dependencias.
2. Ejecutar los scripts en la carpeta "etl" para preparar los datos.
3. Entrenar el modelo en la carpeta "training".
4. Desplegar el modelo utilizando los recursos en la carpeta "deployment".


## Como Configurar el Entorno
1. Crear 2 entornos virtuales, uno para el preprocesamiento y otro para el entrenamiento/despliegue.
   
   	```bash
	conda create -n tf-gpu python=3.10 tensorflow -c conda-forge
	```	
	>Este creara un entorno con el nombre tf-gpu y la version de python 3.10 y tensorflow (Entrenamiento y Despliegue).
	>Este entorno ira a la nube.

	```bash
	conda create -n tf python=3.10
	```
	>Este creara un entorno con el nombre tf y la version de python 3.10 (Preprocesamiento).