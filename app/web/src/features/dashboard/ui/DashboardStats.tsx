import { Folder, CheckCircle2, Shirt } from "lucide-react";
import { motion } from "motion/react";
import Card from "@/shared/components/ui/Card";
import { DashboardStatsProps } from "../types/dashboard.types";

export default function DashboardStats({
  totalClosets,
  totalGarments,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-5 flex items-center gap-4 transition-colors hover:border-sage/50">
          <div className="w-12 h-12 rounded-2xl bg-pale-sage text-forest flex items-center justify-center shrink-0 shadow-xs">
            <Folder className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-gray font-medium block">
              Total Closets
            </span>
            <span className="text-2xl font-bold text-charcoal tracking-tight">
              {totalClosets}
            </span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-5 flex items-center gap-4 transition-colors hover:border-sage/50">
          <div className="w-12 h-12 rounded-2xl bg-sage/15 text-forest flex items-center justify-center shrink-0 shadow-xs">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-gray font-medium block">
              Garments Curated
            </span>
            <span className="text-2xl font-bold text-charcoal tracking-tight">
              {totalGarments}
            </span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Card className="p-5 flex items-center gap-4 transition-colors hover:border-sage/50">
          <div className="w-12 h-12 rounded-2xl bg-pale-sage/40 border border-warm-gray text-forest flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-gray font-medium block">
              Wardrobe Status
            </span>
            <span className="text-sm font-bold text-forest">
              Minimalist & Ready
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
