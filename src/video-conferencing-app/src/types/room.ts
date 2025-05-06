export interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoEnabled: boolean;
}

export interface Room {
  id: string;
  participants: Participant[];
  isActive: boolean;
}