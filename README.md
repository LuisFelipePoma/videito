# 📡 FocusTrack

**FocusTrack** es una aplicación web de monitoreo en tiempo real del estado de atención de estudiantes durante clases virtuales. A través de tecnologías modernas de *reconocimiento facial*, *análisis emocional* y *visión computacional*, permite a los docentes visualizar, interpretar y analizar el nivel de atención de sus alumnos en tiempo real y al finalizar la sesión.

El sistema está diseñado para integrarse con plataformas de videoconferencia y utilizar únicamente la cámara del estudiante como fuente de entrada, garantizando así una solución escalable, ética y centrada en la privacidad.

---

## 🧠 Características principales

- 🎥 Detección facial en tiempo real durante videollamadas (mediante conexión a modelos alojados en Amazon SageMaker).
- 🔒 Autenticación segura y gestión de usuarios vía REST API.
- 🧑‍🏫 Visualización del estado de atención de los estudiantes durante la sesión.
- 💬 Comunicación en tiempo real entre frontend y backend con WebSockets (Socket.IO).
- 📊 Generación de reportes automáticos de atención por clase.
- 📁 Almacenamiento seguro de reportes en AWS S3.
- 🧩 Arquitectura modular con separación por capas (MVC).

---

## 🏗️ Arquitectura del proyecto

FocusTrack sigue una arquitectura **full stack desacoplada**, compuesta por un frontend moderno y un backend robusto:

### 🔧 Backend — Express.js + TypeScript + PostgreSQL

Estructura basada en el patrón **MVC** (Model-View-Controller) con las siguientes funcionalidades:

- **API RESTful**: Gestión de usuarios, sesiones, cursos, clases virtuales, estudiantes, docentes, etc.
- **Autenticación y autorización**: Control de acceso mediante JWT.
- **Mediasoup (SFU)**: Transmisión de video/audio eficiente para sesiones en vivo.
- **Socket.IO**: Comunicación bidireccional en tiempo real (notificaciones, sincronización de atención).
- **Inference API**: Integración con modelos alojados en **AWS SageMaker** para procesar inferencias sobre atención a partir de frames.
- **S3ServiceConnection**: Subida/descarga de imágenes y documentos desde **Amazon S3**.
- **Base de datos**: PostgreSQL gestionado con migraciones y modelos en TypeORM o Prisma (según implementación).

### 🖥️ Frontend — React 18 + TailwindCSS 4 + Zustand

SPA moderna con componentes modulares y diseño intuitivo:

- **Captura de video del usuario** y envío de frames para análisis.
- **Dashboard docente** con vista de clase en tiempo real.
- **Línea de tiempo de atención** por estudiante.
- **Reportes de sesiones pasadas**.
- **Gestión de clases y cursos**.
- **Estado global** centralizado mediante Zustand.
- **Interfaz rápida y responsiva** gracias a Tailwind 4 y optimizaciones de React.

---

## 🛠️ Tecnologías utilizadas

| Stack | Tecnología |
|-------|------------|
| Frontend | React 18, TailwindCSS 4, Zustand, Vite, TypeScript |
| Backend | Express.js, TypeScript, PostgreSQL, Socket.IO, Mediasoup, AWS SDK |
| Infraestructura | AWS S3, AWS SageMaker, Docker, Nginx (reverse proxy), PM2 (opcional) |

---

## 🚀 Instalación local

### 1. Clonar repositorio

```bash
git clone https://github.com/tuusuario/focustrack.git
cd focustrack
