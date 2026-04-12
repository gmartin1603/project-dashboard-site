import { siteConfig } from "@/lib/site-config";

export type DownloadPlatform = "macos" | "windows" | "linux" | "default";

function getLinuxDirectAssetUrl() {
  const preferredAssetMatchers = [
    (fileName: string, assetName: string) =>
      fileName.endsWith(".deb") || assetName.includes("debian"),
    (fileName: string, assetName: string) =>
      fileName.endsWith(".rpm") || assetName.includes("rpm"),
    (fileName: string, assetName: string) =>
      fileName.endsWith(".appimage") || assetName.includes("appimage"),
  ];

  const preferredAsset = preferredAssetMatchers
    .map((matchesAsset) =>
      siteConfig.releaseAssets.find((asset) => {
        const fileName = asset.fileName.toLowerCase();
        const assetName = asset.name.toLowerCase();

        return matchesAsset(fileName, assetName);
      }),
    )
    .find(Boolean);

  return preferredAsset?.url ?? siteConfig.releaseAssets[0]?.url ?? null;
}

export function getDownloadUrl(platform: DownloadPlatform = "default") {
  if (platform === "linux") {
    return getLinuxDirectAssetUrl() ?? siteConfig.releasesUrl;
  }

  return siteConfig.releasesUrl;
}

export function getDownloadRouteUrl() {
  return `${siteConfig.siteUrl}/download`;
}

export function hasDirectDownloadUrl(platform: DownloadPlatform = "default") {
  return platform === "linux" && Boolean(getLinuxDirectAssetUrl());
}

export function isPaidDownloadSupported(platform: DownloadPlatform = "default") {
  return hasDirectDownloadUrl(platform);
}

export function detectPlatform(userAgent: string | null | undefined): DownloadPlatform {
  if (!userAgent) {
    return "default";
  }

  const normalizedUserAgent = userAgent.toLowerCase();

  if (normalizedUserAgent.includes("mac os") || normalizedUserAgent.includes("macintosh")) {
    return "macos";
  }

  if (normalizedUserAgent.includes("windows")) {
    return "windows";
  }

  if (normalizedUserAgent.includes("linux") || normalizedUserAgent.includes("x11")) {
    return "linux";
  }

  return "default";
}

export function getPlatformLabel(platform: DownloadPlatform) {
  switch (platform) {
    case "macos":
      return "macOS";
    case "windows":
      return "Windows";
    case "linux":
      return "Linux";
    default:
      return "your device";
  }
}
