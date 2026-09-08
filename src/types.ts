import type { RefObject } from "react";

export type ModifierKey = "ctrl" | "shift" | "alt" | "meta" | "mod";

export type KeyboardEventType = "keydown" | "keyup";

export type ShortcutCombo = string | string[];

export type ShortcutHandler = (event: KeyboardEvent) => void;

export type ShortcutTarget =
  | Window
  | Document
  | HTMLElement
  | RefObject<HTMLElement | null>
  | null;

export interface ShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  ignoreInputs?: boolean;
  target?: ShortcutTarget;
  eventType?: KeyboardEventType;
}

export interface ParsedShortcut {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
  mod: boolean;
}
