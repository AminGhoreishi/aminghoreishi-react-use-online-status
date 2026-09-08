import { useEffect } from "react";
import type { ShortcutCombo, ShortcutHandler, ShortcutOptions } from "../types";

export const useKeyboardShortcut = (
  combo: ShortcutCombo,
  handler: ShortcutHandler,
  options: ShortcutOptions = {}
): void => {

useEffect(() => {
  const listener = (event: KeyboardEvent) => { 
   if (event.ctrlKey && event.key === combo ) {
    handler(event);
   }
  };

  window.addEventListener("keydown", listener);

  return () => window.removeEventListener("keydown", listener);
}, []);



};

export default useKeyboardShortcut;