"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { ModalProps } from "@/shared/types/ui.types";
import { useModalEffect } from "@/shared/hooks/useModalEffect";

const MAX_WIDTH_STYLES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: ModalProps) {
  useModalEffect(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-full ${MAX_WIDTH_STYLES[maxWidth]} bg-surface rounded-2xl border border-warm-gray shadow-xl overflow-hidden z-10 flex flex-col max-h-[85vh]`}
          >
            <div className="flex items-start justify-between p-5 border-b border-warm-gray">
              <div>
                <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
                {description && (
                  <p className="text-xs text-muted-gray mt-1 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-gray hover:text-charcoal hover:bg-cream transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
