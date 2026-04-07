"use client";

import { useState } from "react";

type DownloadButtonProps = {
  label: string;
  disabled?: boolean;
};

export function DownloadButton({ label, disabled = false }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (disabled || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      const message =
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout.";

      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || isLoading}
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-amber-300/70 bg-amber-200 px-6 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-100 disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-900 disabled:text-stone-500"
      >
        {isLoading ? "Redirecting to checkout..." : label}
      </button>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
