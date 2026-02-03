"use client";

import { useEffect, useRef, useState } from "react";

const RESUME_URL = "/Nathan_Schrader_Resume.pdf";

export default function MyResumePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const renderPdf = async () => {
      if (!containerRef.current) {
        return;
      }

      setStatus("loading");

      try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

        const loadingTask = pdfjsLib.getDocument({
          url: RESUME_URL,
          disableWorker: true,
        });
        const pdf = await loadingTask.promise;

        if (cancelled || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = "";

        const renderPages = async () => {
          if (!containerRef.current) {
            return;
          }

          containerRef.current.innerHTML = "";
          const containerWidth = containerRef.current.clientWidth;

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
            if (cancelled || !containerRef.current) {
              return;
            }

            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / viewport.width;
            const scaledViewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) {
              continue;
            }

            canvas.width = Math.floor(scaledViewport.width);
            canvas.height = Math.floor(scaledViewport.height);
            canvas.className = "resume-page";

            containerRef.current.appendChild(canvas);

            await page.render({
              canvasContext: context,
              viewport: scaledViewport,
              canvas,
            }).promise;
          }
        };

        await renderPages();

        resizeObserver = new ResizeObserver(() => {
          renderPages();
        });

        resizeObserver.observe(containerRef.current);
        setStatus("ready");
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <main className="doc-content resume-content">
      <h1 className="doc-title">Resume</h1>
      <p>
        <a href={RESUME_URL} download>
          Download PDF
        </a>
      </p>
      <p className="resume-helper">
        Prefer the native viewer?{" "}
        <a href={RESUME_URL} target="_blank" rel="noreferrer">
          Open full PDF
        </a>
        .
      </p>
      <div className="resume-viewer">
        {status === "loading" && <p>Loading resume…</p>}
        {status === "error" && (
          <p>
            The resume could not be displayed.{" "}
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              Open full PDF
            </a>
            .
          </p>
        )}
        <div ref={containerRef} className="resume-pages" />
      </div>
    </main>
  );
}
