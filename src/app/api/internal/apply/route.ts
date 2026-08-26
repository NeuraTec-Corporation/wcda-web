import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { parseExperienceValues } from "@/config/experience";
import { isThemeLabEnabled, parseThemeValues } from "@/config/theme";
import { writeApprovedVisualPlatform } from "@/lib/visual-persist";

export async function POST(request: Request) {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid theme or experience configuration" },
      { status: 400 },
    );
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const theme = parseThemeValues(record?.theme);
  const experience = parseExperienceValues(record?.experience);

  if (!theme || !experience) {
    return NextResponse.json(
      { error: "Invalid theme or experience configuration" },
      { status: 400 },
    );
  }

  try {
    const saved = await writeApprovedVisualPlatform(theme, experience);
    return NextResponse.json({
      ok: true,
      theme: saved.theme,
      version: saved.version,
      experience: saved.experience,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to save approved visual platform";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  return new NextResponse(null, { status: 405 });
}
