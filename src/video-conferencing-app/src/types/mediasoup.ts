export interface MediaCodec {
  kind: 'audio' | 'video';
  mimeType: string;
  clockRate: number;
  channels?: number;
  parameters?: Record<string, any>;
}

export interface Producer {
  id: string;
  kind: 'audio' | 'video';
  rtpParameters: any; // Define more specific type based on your needs
}

export interface Consumer {
  id: string;
  producerId: string;
  kind: 'audio' | 'video';
  rtpParameters: any; // Define more specific type based on your needs
}

export interface Transport {
  id: string;
  iceParameters: any; // Define more specific type based on your needs
  iceCandidates: any; // Define more specific type based on your needs
  dtlsParameters: any; // Define more specific type based on your needs
}