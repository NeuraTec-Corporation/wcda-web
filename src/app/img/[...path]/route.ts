import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const imageRoot = path.join(process.cwd(), "reference-html", "img");

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

async function listImages(directory: string, relativeDirectory = ""): Promise<string[][]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDirectory, entry.name);
      if (entry.isDirectory()) {
        return listImages(path.join(directory, entry.name), relativePath);
      }
      return [[...relativePath.split(path.sep)]];
    }),
  );
  return paths.flat();
}

export async function generateStaticParams() {
  const images = await listImages(imageRoot);
  return images.map((segments) => ({ path: segments }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const requestedPath = path.resolve(imageRoot, ...segments);
  const relativePath = path.relative(imageRoot, requestedPath);
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
