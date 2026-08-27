interface DownloadsNamespace {
  save(request: { filename: string; data: Blob }): Promise<{ status: "saved" }>;
}

interface ClaudeGlobal {
  use(name: "downloads"): Promise<DownloadsNamespace | null>;
}

declare global {
  interface Window {
    claude?: ClaudeGlobal;
  }
}

export type SaveFileResult =
  | { ok: true }
  | { ok: false; reason: "declined" | "unavailable" | "error"; message?: string };

export async function saveFile(blob: Blob, filename: string): Promise<SaveFileResult> {
  const claude = window.claude;
  if (claude?.use) {
    try {
      const downloads = await claude.use("downloads");
      if (downloads) {
        try {
          await downloads.save({ filename, data: blob });
          return { ok: true };
        } catch (err) {
          const code = (err as { code?: string } | undefined)?.code;
          if (code === "declined") return { ok: false, reason: "declined" };
          if (code === "extension_not_enabled" || code === "unavailable" || code === "not_granted") {
            return { ok: false, reason: "unavailable" };
          }
          return { ok: false, reason: "error", message: (err as Error)?.message };
        }
      }
    } catch {
      // claude.use() itself failed unexpectedly — fall through to the plain browser download.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return { ok: true };
}
