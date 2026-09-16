type NetworkEffectiveType = "slow-2g" | "2g" | "3g" | "4g";

type NetworkType =
  | "bluetooth"
  | "cellular"
  | "ethernet"
  | "none"
  | "other"
  | "unknown"
  | "wifi"
  | "wimax";

interface NetworkInformationEventMap {
  change: Event;
}

interface NetworkInformation extends EventTarget {
  readonly downlink?: number;
  readonly downlinkMax?: number;
  readonly effectiveType?: NetworkEffectiveType;
  readonly rtt?: number;
  readonly saveData?: boolean;
  readonly type?: NetworkType;
  onchange?: ((this: NetworkInformation, ev: Event) => unknown) | null;
  addEventListener<K extends keyof NetworkInformationEventMap>(
    type: K,
    listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof NetworkInformationEventMap>(
    type: K,
    listener: (this: NetworkInformation, ev: NetworkInformationEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

interface Navigator {
  readonly connection?: NetworkInformation;
}
