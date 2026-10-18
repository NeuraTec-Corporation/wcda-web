import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const referenceRoot = path.join(process.cwd(), "reference-html");

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function listFiles(directory: string, relativeDirectory = ""): Promise<string[][]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDirectory, entry.name);
      if (entry.isDirectory()) {
        return listFiles(path.join(directory, entry.name), relativePath);
      }
      return [[...relativePath.split(path.sep)]];
    }),
  );

  return paths.flat();
}

export async function generateStaticParams() {
  const files = await listFiles(referenceRoot);
  return files.map((segments) => ({ path: segments }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const requestedPath = path.resolve(referenceRoot, ...segments);
  const relativePath = path.relative(referenceRoot, requestedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const contents = await readFile(requestedPath);
    const contentType = contentTypes[path.extname(requestedPath).toLowerCase()];
    return new Response(contents, {
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
