import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { detectPlatform, getDownloadUrl } from "@/lib/download";

export async function GET() {
  const requestHeaders = await headers();
  const platform = detectPlatform(requestHeaders.get("user-agent"));

  return NextResponse.redirect(getDownloadUrl(platform));
}
