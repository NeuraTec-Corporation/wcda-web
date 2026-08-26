import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { isThemeLabEnabled } from "@/config/theme";

export async function POST() {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  return NextResponse.json(
    {
      error:
        "Experience-only Apply is disabled. Use /api/internal/apply so Theme and Experience commit together.",
    },
    { status: 409 },
  );
}

export async function GET() {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  return new NextResponse(null, { status: 405 });
}
