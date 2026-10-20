import { Shirt } from "lucide-react";
import { motion } from "motion/react";
import ClothingCard from "../ui/ClothingCard";
import EmptyState from "@/shared/components/ui/EmptyState";
import { ClothingGridProps } from "../types/clothing.types";

export default function ClothingGrid({
  clothes,
  isLoading,
  onEdit,
  onDelete,
  onAddNew,
}: ClothingGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="rounded-2xl bg-surface border border-warm-gray overflow-hidden animate-pulse"
          >
            <div className="aspect-portrait bg-warm-gray/50 w-full" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-4 w-3/4 bg-warm-gray/60 rounded-md" />
              <div className="h-3 w-1/2 bg-warm-gray/40 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (clothes.length === 0) {
    return (
      <EmptyState
        icon={<Shirt className="w-6 h-6" />}
        title="No clothing items found"
        description="Add clothing pieces to this closet to begin organizing your wardrobe."
        actionLabel="Add Clothing"
        onAction={onAddNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {clothes.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
          className="h-full"
        >
          <ClothingCard
            clothing={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
}
