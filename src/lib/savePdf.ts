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

export type SavePdfResult =
  | { ok: true }
  | { ok: false; reason: "declined" | "unavailable" | "error"; message?: string };

export async function savePdf(blob: Blob, filename: string): Promise<SavePdfResult> {
  const claude = window.claude;
  if (claude?.use) {
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
