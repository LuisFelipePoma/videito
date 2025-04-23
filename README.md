# 📡 FocusTrack

**FocusTrack** es una aplicación web de monitoreo en tiempo real del estado de atención de estudiantes durante clases virtuales. A través de tecnologías modernas de _reconocimiento facial_, _análisis emocional_ y _visión computacional_, permite a los docentes visualizar, interpretar y analizar el nivel de atención de sus alumnos en tiempo real y al finalizar la sesión.

El sistema está diseñado para integrarse con plataformas de videoconferencia y utilizar únicamente la cámara del estudiante como fuente de entrada, garantizando así una solución escalable, ética y centrada en la privacidad.

---

## 🧠 Características principales

- 🎥 Detección facial en tiempo real durante videollamadas (mediante conexión a modelos alojados en Amazon SageMaker).
- 🔒 Autenticación segura y gestión de usuarios vía REST API.
- 🧑‍🏫 Visualización del estado de atención de los estudiantes durante la sesión.
- 💬 Comunicación en tiempo real entre frontend y backend con WebSockets (Socket.IO).
- 📊 Generación de reportes automáticos de atención por clase.
- 📁 Almacenamiento seguro de recursos en AWS S3.
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
- **S3ServiceConnection**: Conexión con **Amazon S3** para almacenamiento de archivos no sensibles.
- **Base de datos**: PostgreSQL gestionado con migraciones y modelos en TypeORM o Prisma.

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

| Stack           | Tecnología                                                           |
| --------------- | -------------------------------------------------------------------- |
| Frontend        | React 18, TailwindCSS 4, Zustand, Vite, TypeScript                   |
| Backend         | Express.js, TypeScript, PostgreSQL, Socket.IO, Mediasoup, AWS SDK    |
| Infraestructura | AWS S3, AWS SageMaker, Docker, Nginx (reverse proxy), PM2 (opcional) |

---

## 🚀 Instalación local

### 1. Clonar repositorio

```bash
git clone https://github.com/tuusuario/focustrack.git
cd focustrack
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en las carpetas `backend/` y `frontend/` con las siguientes variables:

**Backend (.env):**

```env
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/focustrack
JWT_SECRET=supersecret
S3_BUCKET=my-bucket
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
SAGEMAKER_ENDPOINT_URL=...
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Instalar dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 4. Iniciar el proyecto

```bash
# Desde la raíz
docker-compose up
```

O iniciar cada parte por separado si no usas Docker.

---

## 🧪 Testing

- Backend: Jest + Supertest
- Frontend: Vitest + React Testing Library

---

## 📈 Roadmap

- [x] Soporte a multi-salas
- [x] Visualización de atención por estudiante
- [ ] Panel administrativo
- [ ] Exportación de reportes en PDF
- [ ] Soporte multiplataforma móvil

---

## 🔐 Consideraciones de privacidad

FocusTrack ha sido diseñado con una fuerte orientación hacia la protección de la privacidad de los usuarios. En ningún momento se almacenan imágenes, videos ni rostros de los estudiantes. Las capturas enviadas al backend tienen un propósito exclusivamente transitorio y se utilizan **únicamente para realizar inferencias en tiempo real** a través del modelo alojado en SageMaker. Una vez procesadas, estas imágenes son descartadas de inmediato, sin ser guardadas en ninguna base de datos ni sistema de archivos.

El sistema cumple con los principios de minimización de datos y se alinea con buenas prácticas éticas y técnicas en el desarrollo de tecnologías educativas.

---

## 👨‍💻 Autor

Desarrollado por **Luis Felipe Poma Astete** y **Jhon Davids Sovero Cubillas**

---

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la **Apache License 2.0**.

Puedes consultar los términos completos en el archivo [LICENSE](./LICENSE) o en:  
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
