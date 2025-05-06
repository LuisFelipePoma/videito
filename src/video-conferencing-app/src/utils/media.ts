import { MediaStream, MediaStreamConstraints } from 'media-stream';

export const getUserMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error accessing media devices.', error);
    throw error;
  }
};

export const stopMediaStream = (stream: MediaStream): void => {
  stream.getTracks().forEach(track => {
    track.stop();
  });
};