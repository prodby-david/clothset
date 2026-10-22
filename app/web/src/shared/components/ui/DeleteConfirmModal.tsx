"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import { DeleteConfirmModalProps } from "@/shared/types/ui.types";
import { useDeleteConfirm } from "@/shared/hooks/useDeleteConfirm";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmModalProps) {
  const { isDeleting, handleConfirm } = useDeleteConfirm(onConfirm, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-xs text-muted-gray leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-warm-gray">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={handleConfirm}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
