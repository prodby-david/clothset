"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Briefcase,
  Shirt,
  Award,
  SunSnow,
  Folder,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";
import Modal from "@/shared/components/ui/Modal";
import Badge from "@/shared/components/ui/Badge";
import Button from "@/shared/components/ui/Button";
import type {
  WardrobeTemplateItem,
  WardrobeTemplateCatalogModalProps,
} from "../types/closet.types";
import { getWardrobeTemplatesApi } from "../api/closets.api";

const TYPE_ICONS: Record<string, React.ElementType> = {
  CAPSULE: Layers,
  WORK: Briefcase,
  EVERYDAY: Shirt,
  FORMAL: Award,
  SEASONAL: SunSnow,
  CUSTOM: Folder,
};

export default function WardrobeTemplateCatalogModal({
  isOpen,
  onClose,
  onActivate,
  userPlan = "FREE",
  closets,
  maxClosets,
}: WardrobeTemplateCatalogModalProps) {
  const [templates, setTemplates] = useState<WardrobeTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const normalizedPlan = (userPlan || "FREE").toUpperCase();
  const isLimitReached = closets.length >= maxClosets;

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {
        setIsLoading(true);
        setError(null);
      }
    });

    getWardrobeTemplatesApi()
      .then((data) => {
        if (isMounted) {
          setTemplates(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load wardrobe templates");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleActivate = async (templateId: string) => {
    try {
      setActivatingId(templateId);
      setError(null);
      await onActivate(templateId);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to activate wardrobe");
    } finally {
      setActivatingId(null);
    }
  };

  const getIcon = (type: string) => {
    const Icon = TYPE_ICONS[type.toUpperCase()] || Layers;
    return <Icon className="w-5 h-5 text-forest dark:text-sage" />;
  };

  const getTierBadgeVariant = (tier: string) => {
    if (tier === "ELITE") return "accent";
    if (tier === "PLUS") return "secondary";
    return "neutral";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose a Wardrobe"
      description={`Select a curated wardrobe to activate in your library (${closets.length}/${maxClosets} active).`}
      maxWidth="lg"
    >
      <div className="flex flex-col gap-4">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {isLimitReached && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              Wardrobe limit reached ({closets.length}/{maxClosets}). Upgrade your tier or remove an existing wardrobe to activate a new one.
            </span>
          </div>
        )}

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-muted-gray">
            <Loader2 className="w-6 h-6 animate-spin text-forest dark:text-sage" />
            <span className="text-xs">Loading available wardrobes...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {templates.map((tpl) => {
              const alreadyActive = closets.some((c) => c.templateId === tpl.id || c.name === tpl.name);
              const isEligible = tpl.isEligible ?? (
                normalizedPlan === "ELITE"
                  ? true
                  : normalizedPlan === "PLUS"
                  ? tpl.minTier === "FREE" || tpl.minTier === "PLUS"
                  : tpl.minTier === "FREE"
              );

              return (
                <div
                  key={tpl.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3.5 ${
                    alreadyActive
                      ? "bg-pale-sage/20 dark:bg-[#243026]/40 border-sage/40"
                      : isEligible
                      ? "bg-surface border-warm-gray hover:border-sage shadow-xs"
                      : "bg-warm-gray/20 dark:bg-[#151a16] border-warm-gray/60 opacity-75"
                  }`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-pale-sage text-forest dark:text-sage flex items-center justify-center shrink-0">
                          {getIcon(tpl.type)}
                        </div>
                        <h4 className="text-sm font-bold text-charcoal">{tpl.name}</h4>
                      </div>

                      <Badge variant={getTierBadgeVariant(tpl.minTier)}>
                        {tpl.minTier}
                      </Badge>
                    </div>

                    {tpl.description && (
                      <p className="text-xs text-muted-gray leading-relaxed">
                        {tpl.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-warm-gray/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-muted-gray uppercase tracking-wider">
                      Type: {tpl.type.toLowerCase()}
                    </span>

                    {alreadyActive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest dark:text-sage">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : !isEligible ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-gray">
                        <Lock className="w-3.5 h-3.5 text-muted-gray" />
                        <span>Requires {tpl.minTier}</span>
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={isLimitReached || activatingId === tpl.id}
                        isLoading={activatingId === tpl.id}
                        onClick={() => handleActivate(tpl.id)}
                        className="gap-1.5 text-xs h-8 px-3"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
