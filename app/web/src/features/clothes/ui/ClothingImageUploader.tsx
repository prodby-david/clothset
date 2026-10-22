import Image from "next/image";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import type { ClothingImageUploaderProps } from "../types/clothing.types";
import { useImageUpload } from "../hooks/useImageUpload";

export default function ClothingImageUploader(props: ClothingImageUploaderProps) {
  const { previewUrl, onImageChange } = props;
  const {
    fileInputRef,
    handleFileChange,
    handleClear,
    triggerFileInput,
  } = useImageUpload(props);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-gray">
        Garment Photo
      </label>
      <div className="flex flex-col items-center justify-center border border-dashed border-warm-gray rounded-2xl p-4 bg-cream/60 relative">
        {previewUrl ? (
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface border border-warm-gray">
            <Image
              src={previewUrl}
              alt="Garment preview"
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-surface/90 text-rose-600 hover:bg-surface shadow-xs cursor-pointer"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="w-10 h-10 rounded-full bg-surface border border-warm-gray flex items-center justify-center text-sage mb-2">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs text-charcoal font-medium">
              Upload clothing image or paste link below
            </span>
            <span className="text-xs text-muted-gray mt-0.5">
              PNG, JPG up to 5MB
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 gap-1.5"
              onClick={triggerFileInput}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose File</span>
            </Button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <Input
        placeholder="Or paste an image URL..."
        className="text-xs h-9"
        value={previewUrl.startsWith("data:") ? "" : previewUrl}
        onChange={(e) => onImageChange(e.target.value)}
      />
    </div>
  );
}
