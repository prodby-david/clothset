"use client";

import { Plus, Sparkles } from "lucide-react";
import PageTransition from "@/shared/components/ui/PageTransition";
import DeleteConfirmModal from "@/shared/components/ui/DeleteConfirmModal";
import Button from "@/shared/components/ui/Button";
import DashboardSidebar from "../ui/DashboardSidebar";
import DashboardBottomNav from "../ui/DashboardBottomNav";
import DashboardOverviewTab from "../ui/DashboardOverviewTab";
import DashboardClothesTab from "../ui/DashboardClothesTab";
import DailyOutfitSpotlight from "../ui/DailyOutfitSpotlight";
import WardrobeInsights from "../ui/WardrobeInsights";
import ClosetList from "@/features/closets/components/ClosetList";
import ClosetFormModal from "@/features/closets/ui/ClosetFormModal";
import DashboardClothingModal from "../ui/DashboardClothingModal";
import { useDashboardView } from "../hooks/useDashboardView";

export default function DashboardView() {
  const {
    user,
    logout,
    closets,
    isLoading,
    totalClothesCount,
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
    activeOccasion,
    currentOutfit,
    isCurrentOutfitSaved,
    filteredGarments,
    selectedWardrobeId,
    setSelectedWardrobeId,
    selectedCategory,
    setSelectedCategory,
    handleSelectOccasion,
    handleShuffleOutfit,
    handleToggleSaveOutfit,
    handleCreateSubmit,
    handleUpdateSubmit,
    handleDeleteConfirm,
    handleAddGarmentSubmit,
  } = useDashboardView();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-charcoal">
      <DashboardSidebar
        userEmail={user?.email || "Guest"}
        userName={user?.name}
        onLogout={logout}
        closets={closets}
        selectedWardrobeId={selectedWardrobeId}
        onSelectWardrobe={handleSelectWardrobe}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onCreateCloset={() => setIsCreateModalOpen(true)}
        totalClothesCount={totalClothesCount}
      />

      <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-6 flex flex-col gap-6">
        <PageTransition className="flex flex-col gap-6 max-w-6xl w-full mx-auto">
          {activeTab === "overview" && (
            <DashboardOverviewTab
              userName={user?.name}
              totalClosets={closets.length}
              totalGarments={totalClothesCount}
              onNavigateTab={handleSelectTab}
              onCreateCloset={() => setIsCreateModalOpen(true)}
              onAddGarment={() => setIsAddGarmentOpen(true)}
            />
          )}

          {activeTab === "wardrobes" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                    Wardrobe Closets & Capsules
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-gray mt-0.5">
                    Organize and track capacity across all your specialized collections
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="gap-2 text-sm h-9 px-4 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Capsule</span>
                </Button>
              </div>

              <ClosetList
                closets={closets}
                isLoading={isLoading}
                onEdit={(closet) => setEditingCloset(closet)}
                onDelete={(closet) => setDeletingCloset(closet)}
                onCreateNew={() => setIsCreateModalOpen(true)}
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
              onNavigateTab={handleSelectTab}
            />
          )}

          {activeTab === "outfits" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sage">
                      Outfit Ideas
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                    Daily Outfit Spotlight
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-gray mt-0.5">
                    Coordinated outfit combinations crafted from your personal closet pieces
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleShuffleOutfit}
                  className="gap-2 text-sm h-9 px-4 shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-sage" />
                  <span>Shuffle Outfit</span>
                </Button>
              </div>

              <DailyOutfitSpotlight
                activeOccasion={activeOccasion}
                onSelectOccasion={handleSelectOccasion}
                outfit={currentOutfit}
                onShuffle={handleShuffleOutfit}
                isSaved={isCurrentOutfitSaved}
                onToggleSave={handleToggleSaveOutfit}
              />
            </div>
          )}

          {activeTab === "insights" && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-surface border border-warm-gray shadow-xs">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                    Wardrobe Insights & Analytics
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-gray mt-0.5">
                    Breakdown of your wardrobe balance, category splits, and color distribution
                  </p>
                </div>
              </div>

              <WardrobeInsights
                totalClosets={closets.length}
                totalGarments={totalClothesCount}
              />
            </div>
          )}
        </PageTransition>
      </main>

      <DashboardBottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
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
