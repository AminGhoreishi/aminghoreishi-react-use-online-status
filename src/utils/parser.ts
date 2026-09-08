import type { ParsedShortcut } from "../types";

export const parseShortcut = (rawCombo: string): ParsedShortcut => {
  const result: ParsedShortcut = {
    key: "",
    ctrl: false,
    shift: false,
    alt: false,
    meta: false,
    mod: false,
  };

  const parts = rawCombo
    .toLowerCase()
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part === "ctrl" || part === "control") {
      result.ctrl = true;
    } else if (part === "shift") {
      result.shift = true;
    } else if (part === "alt" || part === "option") {
      result.alt = true;
    } else if (part === "meta" || part === "cmd" || part === "command") {
      result.meta = true;
    } else if (part === "mod") {
      result.mod = true;
    } else {
      result.key = part;
    }
  }

  return result;
};
