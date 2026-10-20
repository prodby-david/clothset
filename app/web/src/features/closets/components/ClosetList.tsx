import { FolderPlus } from "lucide-react";
import { motion } from "motion/react";
import ClosetCard from "../ui/ClosetCard";
import EmptyState from "@/shared/components/ui/EmptyState";
import { ClosetListProps } from "../types/closet.types";

export default function ClosetList({
  closets,
  isLoading,
  onEdit,
  onDelete,
  onCreateNew,
  onAddNew,
  onSelectCloset,
}: ClosetListProps) {
  const handleCreate = onCreateNew || onAddNew || (() => {});

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-48 rounded-2xl bg-surface border border-warm-gray p-6 animate-pulse flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="h-6 w-24 bg-warm-gray/60 rounded-full" />
              <div className="h-6 w-12 bg-warm-gray/60 rounded-lg" />
            </div>
            <div>
              <div className="h-5 w-40 bg-warm-gray/60 rounded-md mb-2" />
              <div className="h-3 w-48 bg-warm-gray/40 rounded-md" />
            </div>
            <div className="pt-4 border-t border-warm-gray flex justify-between items-center">
              <div className="h-4 w-16 bg-warm-gray/60 rounded-md" />
              <div className="h-8 w-20 bg-warm-gray/60 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (closets.length === 0) {
    return (
      <EmptyState
        icon={<FolderPlus className="w-6 h-6" />}
        title="No closets yet"
        description="Organize your outfits by creating your first wardrobe closet."
        actionLabel="Create Closet"
        onAction={handleCreate}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {closets.map((closet, index) => (
        <motion.div
          key={closet.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
          className="h-full"
        >
          <ClosetCard
            closet={closet}
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelectCloset}
          />
        </motion.div>
      ))}
    </div>
  );
}
