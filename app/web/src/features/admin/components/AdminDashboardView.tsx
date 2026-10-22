"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  LogOut,
} from "lucide-react";
import Button from "@/shared/components/ui/Button";
import Badge from "@/shared/components/ui/Badge";
import Card from "@/shared/components/ui/Card";
import DeleteConfirmModal from "@/shared/components/ui/DeleteConfirmModal";
import AdminTemplateFormModal from "../ui/AdminTemplateFormModal";
import type { Admin, AdminTemplateFormData } from "../types/admin.types";
import type { WardrobeTemplateItem } from "@/features/closets/types/closet.types";
import {
  adminGetMeApi,
  adminLogoutApi,
  getAdminWardrobeTemplatesApi,
  createWardrobeTemplateApi,
  updateWardrobeTemplateApi,
  deleteWardrobeTemplateApi,
} from "../api/admin.api";
import { clearAdminTokenCookie } from "../lib/admin-cookies";

export default function AdminDashboardView() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [templates, setTemplates] = useState<WardrobeTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WardrobeTemplateItem | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<WardrobeTemplateItem | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await adminGetMeApi();
      setAdmin(data);
    } catch {
    }
  }, []);

  const fetchTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAdminWardrobeTemplatesApi();
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void fetchProfile();
      void fetchTemplates();
    });
  }, [fetchProfile, fetchTemplates]);

  const handleLogout = async () => {
    try {
      await adminLogoutApi();
    } catch {
    } finally {
      clearAdminTokenCookie();
      router.replace("/admin/login");
      router.refresh();
    }
  };

  const handleCreateOrUpdate = async (data: AdminTemplateFormData) => {
    if (editingTemplate) {
      const updated = await updateWardrobeTemplateApi(editingTemplate.id, data);
      setTemplates((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingTemplate(null);
    } else {
      const created = await createWardrobeTemplateApi(data);
      setTemplates((prev) => [created, ...prev]);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTemplate) return;
    try {
      await deleteWardrobeTemplateApi(deletingTemplate.id);
      setTemplates((prev) => prev.filter((t) => t.id !== deletingTemplate.id));
      setDeletingTemplate(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete template");
    }
  };

  const freeCount = templates.filter((t) => t.minTier === "FREE").length;
  const plusCount = templates.filter((t) => t.minTier === "PLUS").length;
  const eliteCount = templates.filter((t) => t.minTier === "ELITE").length;

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-warm-gray px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-forest text-white flex items-center justify-center shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight text-charcoal">Clothset Admin</h2>
            <p className="text-[10px] text-muted-gray leading-none">Management Console</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="accent">Administrator</Badge>
          <span className="text-xs text-muted-gray hidden sm:inline">{admin?.email}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 text-xs text-muted-gray hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 h-8 px-2.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
              Wardrobe Template Catalog
            </h1>
            <p className="text-xs sm:text-sm text-muted-gray mt-1 leading-relaxed">
              Manage the curated list of wardrobes that users can unlock according to their subscription plan tier.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setEditingTemplate(null);
              setIsModalOpen(true);
            }}
            className="gap-2 shrink-0 h-10 px-4 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Template</span>
          </Button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="p-4 sm:p-5 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
              Total Templates
            </span>
            <span className="text-2xl font-bold font-mono text-charcoal">
              {templates.length}
            </span>
          </Card>

          <Card className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Free Tier
              </span>
              <Badge variant="neutral">FREE</Badge>
            </div>
            <span className="text-2xl font-bold font-mono text-forest">
              {freeCount}
            </span>
          </Card>

          <Card className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Plus Tier
              </span>
              <Badge variant="secondary">PLUS</Badge>
            </div>
            <span className="text-2xl font-bold font-mono text-sage">
              {plusCount}
            </span>
          </Card>

          <Card className="p-4 sm:p-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-gray uppercase tracking-wider">
                Elite Tier
              </span>
              <Badge variant="accent">ELITE</Badge>
            </div>
            <span className="text-2xl font-bold font-mono text-amber-700">
              {eliteCount}
            </span>
          </Card>
        </div>

        <Card className="p-0 overflow-hidden border border-warm-gray">
          <div className="p-5 border-b border-warm-gray flex items-center justify-between">
            <h3 className="font-bold text-sm text-charcoal">Configured Templates</h3>
            <span className="text-xs text-muted-gray">{templates.length} total entries</span>
          </div>

          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2 text-muted-gray">
              <Loader2 className="w-6 h-6 animate-spin text-forest" />
              <span className="text-xs">Loading catalog...</span>
            </div>
          ) : templates.length === 0 ? (
            <div className="py-16 text-center text-xs text-muted-gray">
              No wardrobe templates found. Click &quot;New Template&quot; to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream/60 border-b border-warm-gray text-muted-gray uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Template Name</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Closet Type</th>
                    <th className="py-3 px-4">Required Plan</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-gray/60">
                  {templates.map((tpl) => (
                    <tr key={tpl.id} className="hover:bg-cream/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-charcoal">
                        {tpl.name}
                      </td>
                      <td className="py-3.5 px-4 text-muted-gray max-w-xs truncate">
                        {tpl.description || "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-warm-gray/40 dark:bg-[#252f27] font-mono text-[11px] uppercase">
                          {tpl.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            tpl.minTier === "ELITE"
                              ? "accent"
                              : tpl.minTier === "PLUS"
                              ? "secondary"
                              : "neutral"
                          }
                        >
                          {tpl.minTier}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingTemplate(tpl);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-muted-gray hover:text-forest hover:bg-cream transition-colors cursor-pointer"
                            aria-label={`Edit ${tpl.name}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingTemplate(tpl)}
                            className="p-1.5 rounded-lg text-muted-gray hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            aria-label={`Delete ${tpl.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>

      <AdminTemplateFormModal
        key={editingTemplate?.id ?? (isModalOpen ? "open" : "new")}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTemplate(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTemplate}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingTemplate)}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Wardrobe Template"
        description={`Are you sure you want to delete "${deletingTemplate?.name}"? Users will no longer be able to activate this template.`}
      />
    </div>
  );
}
