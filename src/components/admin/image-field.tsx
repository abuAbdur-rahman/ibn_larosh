"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

interface ImageFieldProps {
  capId?: string;
}

function fileProblem(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return "Choose a JPEG, PNG or WebP image.";
  if (file.size > MAX_BYTES) return "Photo must be 5 MB or smaller.";
  return null;
}

/**
 * Admin photo picker: click or drag a file, see a preview, remove it before
 * saving. The real <input type="file"> stays in the form so server actions
 * receive the file, and server-side validation remains authoritative.
 */
export function ImageField({ capId }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function resetInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  function accept(file: File | undefined) {
    setError(null);
    if (!file) return;

    const problem = fileProblem(file);
    if (problem) {
      resetInput();
      setError(problem);
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setFileMeta({ name: file.name, size: file.size });

    // Drops bypass the input, so put the file back into the form control.
    if (inputRef.current && inputRef.current.files?.[0] !== file) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      inputRef.current.files = transfer.files;
    }
  }

  function remove() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileMeta(null);
    setError(null);
    resetInput();
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    accept(event.dataTransfer.files?.[0]);
  }

  return (
    <div className="grid gap-2">
      <label
        htmlFor="cap-photo"
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`grid cursor-pointer justify-items-center gap-2 rounded-[16px] border-[1.5px] border-dashed px-6 py-7 text-center transition-colors ${
          dragging ? "border-g7 bg-g7/[0.05]" : "border-line bg-white hover:border-g7"
        }`}
      >
        <span className="grid size-11 place-items-center rounded-full bg-cream text-g9">
          <ImagePlus className="ic" aria-hidden="true" />
        </span>
        <span className="text-[13.5px] font-semibold text-g9">
          {capId ? "Add another photo" : "Choose a cap photo"}
        </span>
        <span className="text-xs font-medium text-mut">
          Click to browse or drag a file here · JPEG, PNG, WebP · up to 5 MB
        </span>
      </label>

      <input
        ref={inputRef}
        id="cap-photo"
        name="image"
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        onChange={(event) => accept(event.target.files?.[0])}
      />

      {error ? (
        <p role="alert" className="text-[12.5px] font-medium text-[#b3261e]">
          {error}
        </p>
      ) : null}

      {preview ? (
        <div className="flex items-center gap-3 rounded-[14px] border border-line bg-white p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview, never optimised */}
          <img
            src={preview}
            alt="Selected photo preview"
            className="size-16 flex-none rounded-[10px] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-g9">{fileMeta?.name}</p>
            <p className="text-xs text-mut">{fileMeta ? formatSize(fileMeta.size) : ""}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            aria-label="Remove selected photo"
            className="grid size-9 flex-none place-items-center rounded-full text-mut hover:bg-line/60 hover:text-g9"
          >
            <X className="ic" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
