import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import ClosetCardHeader from "./ClosetCardHeader";
import ClosetCardFooter from "./ClosetCardFooter";
import { ClosetCardProps } from "../types/closet.types";
import { useClosetCard } from "../hooks/useClosetCard";

export default function ClosetCard({
  closet,
  onEdit,
  onDelete,
  onSelect,
}: ClosetCardProps) {
  const { typeTitle } = useClosetCard(closet);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full flex flex-col justify-between p-5 sm:p-6 transition-all hover:border-sage/60 hover:shadow-md">
        <div>
          <ClosetCardHeader
            typeTitle={typeTitle}
            onEdit={() => onEdit(closet)}
            onDelete={() => onDelete(closet)}
          />

          <h3 className="mt-2.5 text-base font-bold text-charcoal tracking-tight">
            {closet.name}
          </h3>

          {closet.description && (
            <p className="mt-1 text-xs text-muted-gray line-clamp-2 leading-relaxed">
              {closet.description}
            </p>
          )}
        </div>

        <ClosetCardFooter
          closetId={closet.id}
          clothesCount={closet.clothesCount}
          maxSize={closet.maxSize}
          onSelect={onSelect}
        />
      </Card>
    </motion.div>
  );
}
