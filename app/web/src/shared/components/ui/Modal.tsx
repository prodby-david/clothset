"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ModalProps } from "@/shared/types/ui.types";
import { useModalEffect } from "@/shared/hooks/useModalEffect";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
}: ModalProps) {
  useModalEffect(isOpen, onClose);

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs"
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
            className={`relative w-full ${maxWidthStyles[maxWidth]} bg-surface rounded-2xl border border-warm-gray shadow-xl overflow-hidden z-10 flex flex-col max-h-[85vh]`}
          >
            <div className="flex items-start justify-between p-5 border-b border-warm-gray">
              <div>
                <h2 className="text-lg font-semibold text-charcoal">{title}</h2>
                {description && (
                  <p className="mt-1 text-xs text-muted-gray">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-muted-gray hover:text-charcoal hover:bg-cream rounded-lg transition-colors cursor-pointer"
                aria-label="Close dialog"
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
