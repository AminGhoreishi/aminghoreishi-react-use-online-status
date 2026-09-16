import { useEffect, useState } from "react";

const useOnlineStatus = (
  { onOnline, onOffline } = { onOnline: () => {}, onOffline: () => {} },
) => {
  const [isUserOnline, setIsUserOnline] = useState(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });

  const [effectiveType, setEffectiveType] = useState(() => {
    return typeof navigator !== "undefined"
      ? (navigator.connection?.effectiveType ?? "")
      : "";
  });

  const [downlink, setDownlink] = useState(() => {
    return typeof navigator !== "undefined"
      ? (navigator.connection?.downlink ?? 0)
      : 0;
  });

  const [saveData, setSaveData] = useState(() => {
    return typeof navigator !== "undefined"
      ? (navigator.connection?.saveData ?? false)
      : false;
  });

  const checkConnectivity = async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setIsUserOnline(false);
      onOffline?.();
      return false;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(`/favicon.ico?_t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      if (res.ok) {
        setIsUserOnline(true);
        onOnline?.();
        return true;
      } else {
        setIsUserOnline(false);
        onOffline?.();
        return false;
      }
    } catch {
      setIsUserOnline(false);
      onOffline?.();
      return false;
    } finally {
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    const handleStatusChange = () => {
      if (navigator.onLine) {
        checkConnectivity();
        setDownlink(navigator.connection?.downlink ?? 0);
        setSaveData(navigator.connection?.saveData ?? false);
        setEffectiveType(navigator.connection?.effectiveType ?? "");
      } else {
        setIsUserOnline(false);
        setDownlink(0);
        onOffline?.();
      }
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    const conn = navigator.connection;
    conn?.addEventListener?.("change", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
      conn?.removeEventListener?.("change", handleStatusChange);
    };
  }, []);

  const isSlowConnection = Boolean(
    saveData ||
    effectiveType === "2g" ||
    effectiveType === "slow-2g" ||
    (downlink > 0 && downlink < 1.5),
  );

  return {
    isOnline: isUserOnline,
    effectiveType,
    downlink,
    saveData,
    isSlowConnection,
    recheck: checkConnectivity,
  };
};

export default useOnlineStatus;
