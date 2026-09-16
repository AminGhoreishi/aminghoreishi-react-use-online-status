export interface UseOnlineStatusOptions {
  onOnline?: () => void;
  onOffline?: () => void;
}

export interface UseOnlineStatusReturn {
  isOnline: boolean;
  effectiveType: string;
  downlink: number;
  saveData: boolean;
  isSlowConnection: boolean;
  recheck: () => Promise<boolean>;
}
