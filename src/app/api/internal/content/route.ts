import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import {
  parseSiteContentPatch,
  pickSiteContentPatch,
} from "@/config/site-content";
import { isThemeLabEnabled } from "@/config/theme";
import { writeApprovedSiteContent } from "@/lib/content-persist";

export async function POST(request: Request) {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid site content configuration" },
      { status: 400 },
    );
  }

  const record =
    body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const content = parseSiteContentPatch(record?.content);

  if (!content) {
    return NextResponse.json(
      { error: "Invalid site content configuration" },
      { status: 400 },
    );
  }

  try {
    const saved = await writeApprovedSiteContent(content);
    return NextResponse.json({
      ok: true,
      content: pickSiteContentPatch(saved.content),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save site content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  if (!isThemeLabEnabled()) {
    notFound();
  }
  return new NextResponse(null, { status: 405 });
}
