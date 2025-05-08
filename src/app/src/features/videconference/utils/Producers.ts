/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from "socket.io-client";

export const getProducers = (socket: Socket) => {
  socket.emit("getProducers", (producerIds: any) => {
    console.log(producerIds);
    // for each of the producer create a consumer
    // producerIds.forEach(id => signalNewConsumerTransport(id))
    // producerIds.forEach(signalNewConsumerTransport);
  });
};
