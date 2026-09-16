import { useEffect, useState } from "react";

const useOnlineStatus = ({ onOnline, onOffline } = {}) => {
  const [isUserOnline, setIsUserOnline] = useState(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });

  const [effectiveType, setEffectiveType] = useState(() => {
    return typeof navigator !== "undefined"
      ? navigator.connection?.effectiveType ?? ""
      : "";
  });

  const [downlink, setDownlink] = useState(() => {
    return typeof navigator !== "undefined"
      ? navigator.connection?.downlink ?? 0
      : 0;
  });

  const [saveData, setSaveData] = useState(() => {
    return typeof navigator !== "undefined"
      ? navigator.connection?.saveData ?? false
      : false;
  });

  useEffect(() => {
    const handleStatusChange = () => {
      const online = navigator.onLine;
      setIsUserOnline(online);

      if (online) {
        onOnline?.();
        setDownlink(navigator.connection?.downlink ?? 0);
        setSaveData(navigator.connection?.saveData ?? false);
        setEffectiveType(navigator.connection?.effectiveType ?? "");
      } else {
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
    (downlink > 0 && downlink < 1.5)
  );

  return {
    isOnline: isUserOnline,
    effectiveType,
    downlink,
    saveData,
    isSlowConnection,
  };
};

export default useOnlineStatus;