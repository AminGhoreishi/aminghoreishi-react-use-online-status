# @aminghoreishi/react-use-online-status

<p align="center">
  <strong>An ultra-lightweight, SSR-safe React hook to monitor online/offline status and network connection quality in real-time.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@aminghoreishi/react-use-online-status"><img src="https://img.shields.io/npm/v/@aminghoreishi/react-use-online-status.svg?style=flat-square&color=blue" alt="npm version" /></a>
  <a href="https://bundlephobia.com/package/@aminghoreishi/react-use-online-status"><img src="https://img.shields.io/bundlephobia/minzip/@aminghoreishi/react-use-online-status?style=flat-square&color=green" alt="bundle size" /></a>
  <a href="https://github.com/AminGhoreishi/amin-kbd-shortcut/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@aminghoreishi/react-use-online-status?style=flat-square&color=orange" alt="license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" alt="TypeScript" />
</p>

---

## Features

- **Real-Time Detection:** Listens to `online` and `offline` browser events automatically.
- **Network Quality Insights:** Exposes Network Information API metrics including `effectiveType`, `downlink`, `saveData`, and `isSlowConnection`.
- **SSR Safe:** Safely handles server-side rendering environments without `window` or `navigator` crashes.
- **Event Callbacks:** Provides `onOnline` and `onOffline` triggers for alerts or synchronization.
- **Zero Dependencies:** Extremely light footprint (< 1KB minified + gzipped).
- **First-Class TypeScript:** Full type definitions out of the box.

---

## Installation

```bash
# npm
npm install @aminghoreishi/react-use-online-status

# pnpm
pnpm add @aminghoreishi/react-use-online-status

# yarn
yarn add @aminghoreishi/react-use-online-status

# bun
bun add @aminghoreishi/react-use-online-status
```

---

## Quick Start

```tsx
import React from "react";
import useOnlineStatus from "@aminghoreishi/react-use-online-status";

export const StatusBanner = () => {
  const { isOnline } = useOnlineStatus();

  return (
    <div style={{ background: isOnline ? "#10b981" : "#ef4444", color: "#fff", padding: "8px 16px" }}>
      {isOnline ? "Back online" : "You are currently offline"}
    </div>
  );
};
```

---

## Advanced Usage

### Monitoring Connection Speed & Quality

Detect slow connections (e.g. 2G, low downlink bandwidth, or Data Saver mode enabled):

```tsx
import React from "react";
import useOnlineStatus from "@aminghoreishi/react-use-online-status";

export const NetworkMonitor = () => {
  const {
    isOnline,
    effectiveType,
    downlink,
    saveData,
    isSlowConnection,
  } = useOnlineStatus({
    onOnline: () => {
      console.log("Connection restored!");
    },
    onOffline: () => {
      console.log("Connection lost!");
    },
  });

  return (
    <div className="network-card">
      <p>Status: {isOnline ? "Online" : "Offline"}</p>
      <p>Speed Tier: {effectiveType || "N/A"}</p>
      <p>Downlink: {downlink ? `${downlink} Mbps` : "N/A"}</p>
      <p>Data Saver: {saveData ? "Enabled" : "Disabled"}</p>
      {isSlowConnection && (
        <span className="warning">Slow connection detected. Loading optimized assets...</span>
      )}
    </div>
  );
};
```

---

## API Reference

### `useOnlineStatus(options?)`

#### Parameters

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onOnline` | `() => void` | `undefined` | Callback invoked when the browser transitions to online. |
| `onOffline` | `() => void` | `undefined` | Callback invoked when the browser transitions to offline. |

#### Return Value

| Property | Type | Description |
| :--- | :--- | :--- |
| `isOnline` | `boolean` | `true` if the browser has network connectivity, `false` otherwise. |
| `effectiveType` | `string` | Effective connection type (`"slow-2g"`, `"2g"`, `"3g"`, `"4g"`, or `""`). |
| `downlink` | `number` | Estimated bandwidth in megabits per second (Mbps). |
| `saveData` | `boolean` | `true` if the user enabled reduced data usage mode. |
| `isSlowConnection` | `boolean` | `true` if on 2G, slow-2g, data-saver, or downlink < 1.5 Mbps. |

---

## TypeScript

All types are exported directly from the package:

```ts
import type {
  UseOnlineStatusOptions,
  UseOnlineStatusReturn,
} from "@aminghoreishi/react-use-online-status";
```

---

## Browser Support

- All modern browsers supporting standard `online` / `offline` events (Chrome, Firefox, Safari, Edge).
- Network Quality details (`effectiveType`, `downlink`, `saveData`) leverage the `navigator.connection` API where supported (Chromium-based browsers) and gracefully degrade to defaults in unsupported environments.

---

## License

MIT © [AminGhoreishi](https://github.com/AminGhoreishi)
