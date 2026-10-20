"use client";

import { useState } from "react";

export function useDeleteConfirm(
  onConfirm: () => Promise<void>,
  onClose: () => void
) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleConfirm,
  };
}
