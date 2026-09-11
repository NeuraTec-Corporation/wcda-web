import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import {
  parseContentPublicationPatch,
  pickContentPublicationPatch,
} from "@/config/content-publication";
import { isThemeLabEnabled } from "@/config/theme";
import { writeApprovedPublication } from "@/lib/publication-persist";

export async function POST(request: Request) {
  if (!isThemeLabEnabled()) {
    notFound();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid content publication configuration" },
      { status: 400 },
    );
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const publication = parseContentPublicationPatch(record?.publication);

  if (!publication) {
    return NextResponse.json(
      { error: "Invalid content publication configuration" },
      { status: 400 },
    );
  }

  try {
    const saved = await writeApprovedPublication(publication);
    return NextResponse.json({
      ok: true,
      publication: pickContentPublicationPatch(saved.publication),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to save content publication";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  if (!isThemeLabEnabled()) {
    notFound();
  }
  return new NextResponse(null, { status: 405 });
}
