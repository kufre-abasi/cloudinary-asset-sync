export interface AssetUploadResult {
  file: string;
  url: string;
  timestamp: number;
}

export interface SyncConfig {
  assetPath: string;
  mode: 'safe' | 'auto';
}

export type OnUpdateCallback = (
  file: string,
  url: string
) => void | Promise<void>;

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}
