"use client";

import { useEffect, useState } from "react";

type AutoDownloadProps = {
  downloadUrl: string;
  enabled: boolean;
  delayMs?: number;
  className?: string;
};

export function AutoDownload({
  downloadUrl,
  enabled,
  delayMs = 1800,
  className,
}: AutoDownloadProps) {
  const startingSeconds = Math.max(1, Math.ceil(delayMs / 1000));
  const [secondsRemaining, setSecondsRemaining] = useState(startingSeconds);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const countdownInterval = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) => Math.max(1, currentSeconds - 1));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      window.location.assign(downloadUrl);
    }, delayMs);

    return () => {
      window.clearInterval(countdownInterval);
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, downloadUrl, enabled, startingSeconds]);

  if (!enabled) {
    return null;
  }

  return (
    <p className={className}>
      Starting your download in {secondsRemaining} second{secondsRemaining === 1 ? "" : "s"}...
    </p>
  );
}
