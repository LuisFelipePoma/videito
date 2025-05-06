import { isMobile } from 'react-device-detect';

export const getUserMedia = async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    console.error('Error accessing media devices.', error);
    throw error;
  }
};

export const isDeviceSupported = (): boolean => {
  const hasCamera = !!navigator.mediaDevices.getUserMedia;
  const hasMicrophone = !!navigator.mediaDevices.getUserMedia;
  return hasCamera && hasMicrophone;
};

export const isMobileDevice = (): boolean => {
  return isMobile;
};