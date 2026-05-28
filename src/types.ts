export type InvitationTheme = 'kyoto' | 'zen' | 'minimal';

export interface AtmosphereSettings {
  fallingLeaves: boolean;
  goldDust: boolean;
  lanternGlow: number; // 0 to 100
  ambientSound: boolean;
  presentationMode: boolean;
}

export interface PresetRecipient {
  name: string;
  role: string;
}
