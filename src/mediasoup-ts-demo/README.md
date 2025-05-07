### Paso 1: Configuración del proyecto

1. **Inicializa un nuevo proyecto de Node.js**:

   ```bash
   mkdir mediasoup-video-chat
   cd mediasoup-video-chat
   npm init -y
   ```

2. **Instala las dependencias necesarias**:

   ```bash
   npm install express socket.io mediasoup
   npm install --save-dev typescript @types/node @types/express @types/socket.io ts-node
   ```

3. **Crea un archivo de configuración de TypeScript**:

   ```bash
   npx tsc --init
   ```

   Asegúrate de que tu `tsconfig.json` tenga configuraciones adecuadas, como `"target": "ES6"` y `"module": "commonjs"`.

### Paso 2: Estructura del servidor

Crea un archivo llamado `server.ts` en la raíz de tu proyecto y agrega el siguiente código:

```typescript
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Router } from 'express';
import { createWorker, Worker, Router as MediasoupRouter, Transport, Producer, Consumer } from 'mediasoup';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const workers: Worker[] = [];
const routers: MediasoupRouter[] = {};
const rooms: { [key: string]: string[] } = {}; // Almacena las salas y sus participantes

const createMediasoupWorker = async () => {
    const worker = await createWorker();
    workers.push(worker);
    return worker;
};

app.get('/', (req, res) => {
    res.send('Servidor de videoconferencia en funcionamiento');
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('createRoom', async (roomId: string) => {
        if (!routers[roomId]) {
            const worker = await createMediasoupWorker();
            const router = await worker.createRouter();
            routers[roomId] = router;
            rooms[roomId] = [];
            console.log(`Sala creada: ${roomId}`);
        }
        socket.join(roomId);
        rooms[roomId].push(socket.id);
        console.log(`Usuario ${socket.id} se unió a la sala ${roomId}`);
    });

    socket.on('sendMessage', (roomId: string, message: string) => {
        socket.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            if (rooms[roomId].length === 0) {
                delete routers[roomId];
                delete rooms[roomId];
                console.log(`Sala ${roomId} eliminada`);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

### Paso 3: Ejecutar el servidor

Para ejecutar el servidor, puedes usar `ts-node`:

```bash
npx ts-node server.ts
```

### Paso 4: Frontend (opcional)

Para probar el servidor, necesitarás un cliente que se conecte a través de Socket.IO. Puedes crear un archivo HTML simple que se conecte al servidor y maneje el chat y la videoconferencia.

### Notas finales

Este es un ejemplo básico y no incluye la lógica completa para manejar los transportes de Mediasoup, la producción y el consumo de medios, ni la gestión de errores. Para una implementación completa, deberías considerar agregar la lógica para manejar los transportes, los productores y los consumidores de Mediasoup, así como la gestión de errores y la seguridad.

Recuerda que Mediasoup es una biblioteca poderosa y compleja, y este ejemplo es solo un punto de partida. Te recomiendo revisar la [documentación oficial de Mediasoup](https://mediasoup.org/documentation/v3/) para obtener más información sobre cómo implementar características avanzadas.