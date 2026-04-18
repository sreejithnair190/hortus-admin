"use client";

import { useRef, useState, useEffect } from "react";
import { CloudUpload, Image as ImageIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploaderProps {
  value?: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string[]; // e.g., ["image/jpeg", "image/png", "image/webp"]
  title?: string;
  description?: string;
  onError?: (error: string | null) => void;
  className?: string; // height/aspect-ratio overrides
  initialImageUrl?: string; // Add support for existing images
}

export function FileUploader({
  value,
  onChange,
  multiple = false,
  maxFiles = 0,
  maxSize = 15 * 1024 * 1024,
  accept = ["image/jpeg", "image/png", "image/webp"],
  title = "Upload image",
  description = "JPEG, PNG, WEBP — Max 15MB",
  onError,
  className,
  initialImageUrl,
}: FileUploaderProps) {
  const [internalError, setInternalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleError = (error: string | null) => {
    setInternalError(error);
    onError?.(error);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleError(null);
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Validate size and type for all files
    for (const file of files) {
      if (accept.length && !accept.includes(file.type)) {
        handleError(`File type not allowed: ${file.name}`);
        return;
      }
      if (file.size > maxSize) {
        handleError(`File exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB: ${file.name}`);
        return;
      }
    }

    if (multiple) {
      const currentFiles = Array.isArray(value) ? value : value ? [value] : [];
      const totalFiles = [...currentFiles, ...files];
      if (maxFiles > 0 && totalFiles.length > maxFiles) {
        handleError(`You can only upload up to ${maxFiles} files`);
        return;
      }
      onChange(totalFiles);
    } else {
      onChange(files[0]);
    }
  };

  const clearFile = (fileToRemove: File) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = value.filter((f) => f !== fileToRemove);
      onChange(newFiles.length ? newFiles : null);
    } else {
      onChange(null);
    }
    handleError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectedFiles = Array.isArray(value) ? value : value ? [value] : [];

  // Assuming single image preview for non-multiple or first item of multiple
  const previewFile = selectedFiles.length > 0 && selectedFiles[0].type.startsWith("image/") ? selectedFiles[0] : null;

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "group relative w-full rounded-2xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-4 bg-surface-container-low transition-all overflow-hidden cursor-pointer hover:bg-surface-container hover:border-primary/30 min-h-[160px]",
          className
        )}
      >
        {previewFile && !multiple ? (
          <PreviewImage file={previewFile} />
        ) : !previewFile && initialImageUrl && !multiple ? (
          <img
            src={initialImageUrl}
            alt="Existing"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
          />
        ) : null}

        <div className="z-10 flex flex-col items-center p-6 text-center">
          <CloudUpload
            size={40}
            strokeWidth={1.5}
            className="text-primary/60 mb-2"
          />
          <p className="font-bold text-on-surface">
            {previewFile && !multiple ? "Change image" : title}
          </p>
          <p className="text-xs text-on-surface-variant max-w-[200px]">
            {description}
          </p>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept.join(",")}
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
      />

      {internalError && (
        <p className="text-error text-xs mt-2 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          {internalError}
        </p>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {selectedFiles.map((file, i) => (
            <div key={`${file.name}-${i}`} className="flex items-center justify-between bg-surface-container-low rounded-xl px-4 py-3 ring-1 ring-outline-variant/10">
              <div className="flex items-center gap-3 min-w-0">
                <ImageIcon size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-on-surface truncate">
                  {file.name}
                </span>
                <span className="text-xs text-on-surface-variant/50 shrink-0">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile(file);
                }}
                className="hover:bg-error/10 text-error rounded-lg p-1.5 transition-colors shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PreviewImage({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!url) return null;

  return (
    <img
      src={url}
      alt="Preview"
      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
    />
  );
}
