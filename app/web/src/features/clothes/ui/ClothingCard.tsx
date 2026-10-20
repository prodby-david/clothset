import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import ClothingCardImage from "./ClothingCardImage";
import ClothingCardDetails from "./ClothingCardDetails";
import { ClothingCardProps } from "../types/clothing.types";
import { useClothingCard } from "../hooks/useClothingCard";

export default function ClothingCard({
  clothing,
  onEdit,
  onDelete,
}: ClothingCardProps) {
  const { categoryLabel, seasonLabel } = useClothingCard(clothing);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden flex flex-col group transition-all hover:border-sage/60 hover:shadow-md">
        <ClothingCardImage
          imageUrl={clothing.imageUrl}
          name={clothing.name}
          categoryLabel={categoryLabel}
          onEdit={() => onEdit(clothing)}
          onDelete={() => onDelete(clothing)}
        />
        <ClothingCardDetails
          name={clothing.name}
          color={clothing.color}
          seasonLabel={seasonLabel}
        />
      </Card>
    </motion.div>
  );
}
