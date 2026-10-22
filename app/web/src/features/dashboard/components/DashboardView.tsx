"use client";

import { Plus } from "lucide-react";
import PageTransition from "@/shared/components/ui/PageTransition";
import DeleteConfirmModal from "@/shared/components/ui/DeleteConfirmModal";
import Button from "@/shared/components/ui/Button";
import DashboardSidebar from "../ui/DashboardSidebar";
import DashboardBottomNav from "../ui/DashboardBottomNav";
import DashboardOverviewTab from "../ui/DashboardOverviewTab";
import DashboardClothesTab from "../ui/DashboardClothesTab";
import ClosetList from "@/features/closets/components/ClosetList";
import ClosetFormModal from "@/features/closets/ui/ClosetFormModal";
import WardrobeTemplateCatalogModal from "@/features/closets/ui/WardrobeTemplateCatalogModal";
import DashboardClothingModal from "../ui/DashboardClothingModal";
import { useDashboardView } from "../hooks/useDashboardView";

export default function DashboardView() {
  const {
    user,
    logout,
    closets,
    isLoading,
    totalClothesCount,
    planLimit,
    maxClosets,
    isCatalogOpen,
    setIsCatalogOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingCloset,
    setEditingCloset,
    deletingCloset,
    setDeletingCloset,
    isAddGarmentOpen,
    setIsAddGarmentOpen,
    activeTab,
    handleSelectTab,
    handleSelectWardrobe,
    filteredGarments,
    selectedWardrobeId,
    setSelectedWardrobeId,
    selectedCategory,
    setSelectedCategory,
    handleCreateSubmit,
    handleActivateTemplate,
    handleUpdateSubmit,
    handleDeleteConfirm,
    handleAddGarmentSubmit,
    handleDeleteGarment,
  } = useDashboardView();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-charcoal">
      <DashboardSidebar
        userEmail={user?.email || "Guest"}
        userName={user?.name}
        userPlan={user?.plan}
        onLogout={logout}
        closets={closets}
        selectedWardrobeId={selectedWardrobeId}
        onSelectWardrobe={handleSelectWardrobe}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onCreateCloset={() => setIsCatalogOpen(true)}
        totalClothesCount={totalClothesCount}
        planLimit={planLimit}
      />

      <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-6 flex flex-col gap-6">
        <PageTransition className="flex flex-col gap-6 max-w-6xl w-full mx-auto">
          {activeTab === "overview" && (
            <DashboardOverviewTab
              userName={user?.name}
              userPlan={user?.plan}
              totalClosets={closets.length}
              totalGarments={totalClothesCount}
              planLimit={planLimit}
              closets={closets}
              onNavigateTab={handleSelectTab}
              onCreateCloset={() => setIsCatalogOpen(true)}
              onAddGarment={() => setIsAddGarmentOpen(true)}
              onSelectWardrobe={handleSelectWardrobe}
              onEditCloset={(closet) => setEditingCloset(closet)}
              onDeleteCloset={(closet) => setDeletingCloset(closet)}
              onAddGarmentToCloset={(closetId) => {
                setSelectedWardrobeId(closetId);
                setIsAddGarmentOpen(true);
              }}
            />
          )}

          {activeTab === "wardrobes" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                    Wardrobes & Closets
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-gray mt-0.5">
                    Choose from curated wardrobes or organize your collections
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCatalogOpen(true)}
                  className="gap-2 text-sm h-9 px-4 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Choose Wardrobe</span>
                </Button>
              </div>

              <ClosetList
                closets={closets}
                isLoading={isLoading}
                onEdit={(closet) => setEditingCloset(closet)}
                onDelete={(closet) => setDeletingCloset(closet)}
                onCreateNew={() => setIsCatalogOpen(true)}
                onSelectCloset={handleSelectWardrobe}
              />
            </div>
          )}

          {activeTab === "clothes" && (
            <DashboardClothesTab
              closets={closets}
              selectedWardrobeId={selectedWardrobeId}
              onSelectWardrobe={setSelectedWardrobeId}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              garments={filteredGarments}
              onAddNewGarment={() => setIsAddGarmentOpen(true)}
              onDeleteGarment={handleDeleteGarment}
              onNavigateTab={handleSelectTab}
            />
          )}
        </PageTransition>
      </main>

      <DashboardBottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      <WardrobeTemplateCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onActivate={handleActivateTemplate}
        userPlan={user?.plan}
        closets={closets}
        maxClosets={maxClosets}
      />

      <ClosetFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <ClosetFormModal
        isOpen={Boolean(editingCloset)}
        onClose={() => setEditingCloset(null)}
        onSubmit={handleUpdateSubmit}
        initialData={editingCloset}
      />

      <DashboardClothingModal
        isOpen={isAddGarmentOpen}
        onClose={() => setIsAddGarmentOpen(false)}
        onSubmit={handleAddGarmentSubmit}
        closets={closets}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingCloset)}
        onClose={() => setDeletingCloset(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Closet"
        description={`Are you sure you want to delete "${deletingCloset?.name}"? All clothing items inside will be removed.`}
      />
    </div>
  );
}
