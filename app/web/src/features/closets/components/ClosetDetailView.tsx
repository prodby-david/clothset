"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/shared/components/ui/Navbar";
import PageTransition from "@/shared/components/ui/PageTransition";
import DeleteConfirmModal from "@/shared/components/ui/DeleteConfirmModal";
import ClosetHeader from "../ui/ClosetHeader";
import ClosetFormModal from "../ui/ClosetFormModal";
import ClothingFilterBar from "@/features/clothes/ui/ClothingFilterBar";
import ClothingGrid from "@/features/clothes/components/ClothingGrid";
import ClothingFormModal from "@/features/clothes/components/ClothingFormModal";
import type { ClosetDetailViewProps } from "../types/closet.types";
import { useClosetDetailView } from "../hooks/useClosetDetailView";

export default function ClosetDetailView({ closetId }: ClosetDetailViewProps) {
  const {
    user,
    logout,
    closet,
    isClosetLoading,
    clothes,
    allClothesCount,
    isClothesLoading,
    selectedCategory,
    selectedSeason,
    setSelectedCategory,
    setSelectedSeason,
    typeTitle,
    capacity,
    isAddClothingOpen,
    setIsAddClothingOpen,
    editingClothing,
    setEditingClothing,
    deletingClothing,
    setDeletingClothing,
    isEditClosetOpen,
    setIsEditClosetOpen,
    isDeleteClosetOpen,
    setIsDeleteClosetOpen,
    handleClothingSubmit,
    handleClothingDeleteConfirm,
    handleClosetEditSubmit,
    handleClosetDeleteConfirm,
  } = useClosetDetailView(closetId);

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal">
      <Navbar userEmail={user?.email || "Guest"} onLogout={logout} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <PageTransition className="flex flex-col gap-6">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-gray hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Closets</span>
            </Link>
          </div>

          <ClosetHeader
            name={closet?.name}
            description={closet?.description}
            typeTitle={typeTitle}
            itemsCount={allClothesCount}
            isLoading={isClosetLoading}
            capacity={capacity}
            onEdit={() => setIsEditClosetOpen(true)}
            onDelete={() => setIsDeleteClosetOpen(true)}
            onAddClothing={() => {
              setEditingClothing(null);
              setIsAddClothingOpen(true);
            }}
          />

          <div className="flex flex-col gap-4">
            <ClothingFilterBar
              selectedCategory={selectedCategory}
              selectedSeason={selectedSeason}
              onSelectCategory={setSelectedCategory}
              onSelectSeason={setSelectedSeason}
              totalCount={clothes.length}
            />

            <ClothingGrid
              clothes={clothes}
              isLoading={isClothesLoading}
              onEdit={(item) => setEditingClothing(item)}
              onDelete={(item) => setDeletingClothing(item)}
              onAddNew={() => {
                setEditingClothing(null);
                setIsAddClothingOpen(true);
              }}
            />
          </div>
        </PageTransition>
      </main>

      <ClothingFormModal
        isOpen={isAddClothingOpen || Boolean(editingClothing)}
        onClose={() => {
          setIsAddClothingOpen(false);
          setEditingClothing(null);
        }}
        onSubmit={handleClothingSubmit}
        initialData={editingClothing}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingClothing)}
        onClose={() => setDeletingClothing(null)}
        onConfirm={handleClothingDeleteConfirm}
        title="Delete Clothing Item"
        description={`Are you sure you want to remove "${deletingClothing?.name}" from this closet?`}
      />

      {closet && (
        <ClosetFormModal
          isOpen={isEditClosetOpen}
          onClose={() => setIsEditClosetOpen(false)}
          onSubmit={handleClosetEditSubmit}
          initialData={closet}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteClosetOpen}
        onClose={() => setIsDeleteClosetOpen(false)}
        onConfirm={handleClosetDeleteConfirm}
        title="Delete Closet"
        description={`Are you sure you want to delete "${closet?.name}"? You will be redirected to the dashboard.`}
      />
    </div>
  );
}
