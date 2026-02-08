export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  type: 'text' | 'emoji' | 'system';
  timestamp: Date;
  roomId: string;
}

export interface VoiceMessage {
  id: string;
  userId: string;
  type: 'voice_start' | 'voice_end' | 'voice_data';
  timestamp: Date;
  roomId: string;
  audioData?: ArrayBuffer;
}

export interface ChatUser {
  id: string;
  name: string;
  email?: string;
  image?: string;
  isSpeaking?: boolean;
  isInVoiceChat?: boolean;
  lastSeen?: Date;
}

export interface VoiceChatState {
  isEnabled: boolean;
  isMuted: boolean;
  isPushToTalk: boolean;
  participants: string[];
  audioLevel?: number;
}

export type MessageEvent = {
  type: 'message';
  data: ChatMessage;
};

export type VoiceEvent = {
  type: 'voice_start' | 'voice_end' | 'voice_data';
  data: VoiceMessage;
};

export type PresenceEvent = {
  type: 'presence';
  data: ChatUser;
};
