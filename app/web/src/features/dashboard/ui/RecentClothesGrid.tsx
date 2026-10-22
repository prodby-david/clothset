"use client";

import Image from "next/image";
import { Plus, Shirt } from "lucide-react";
import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import Badge from "@/shared/components/ui/Badge";
import type {
  RecentGarment,
  RecentClothesGridProps,
} from "../types/dashboard.types";

export default function RecentClothesGrid({
  items,
  onAddNew,
}: RecentClothesGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-charcoal tracking-tight">
            Recently Added Pieces
          </h2>
          <p className="text-xs text-muted-gray mt-0.5">
            Latest additions cataloged across your custom wardrobes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item: RecentGarment, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
            whileHover={{ y: -3 }}
          >
            <Card className="p-3.5 h-full flex flex-col justify-between border border-warm-gray bg-surface hover:border-sage/60 hover:shadow-sm transition-all group">
              <div>
                <div className="relative aspect-square w-full rounded-xl bg-cream dark:bg-[#151a16] border border-warm-gray/60 flex items-center justify-center text-forest dark:text-sage overflow-hidden mb-3 group-hover:scale-[1.02] transition-transform">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <Shirt className="w-8 h-8 opacity-80" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <Badge variant="accent" className="text-xs px-2.5 py-0.5">
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-charcoal line-clamp-1 pt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-gray line-clamp-1">
                    {item.color} • {item.season}
                  </p>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-warm-gray/50 flex items-center justify-between text-xs text-sage font-medium">
                <span className="truncate">{item.closetName}</span>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.15 }}
        >
          <button
            type="button"
            onClick={onAddNew}
            className="w-full h-full min-h-[180px] rounded-2xl border-2 border-dashed border-warm-gray hover:border-sage bg-cream/30 dark:bg-[#151a16] hover:bg-cream/60 dark:hover:bg-[#1c231e] flex flex-col items-center justify-center gap-2 text-muted-gray hover:text-forest dark:hover:text-sage transition-all cursor-pointer p-4 group"
            aria-label="Add new garment"
          >
            <div className="w-10 h-10 rounded-full bg-surface border border-warm-gray flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-sage transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold">Add Piece</span>
            <span className="text-xs text-muted-gray text-center leading-tight">
              Catalog new item with tags
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
