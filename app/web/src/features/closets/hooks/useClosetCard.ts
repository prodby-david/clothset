import { Closet, CLOSET_TYPES } from "../types/closet.types";

export function useClosetCard(closet: Closet) {
  const typePreset = CLOSET_TYPES.find((t) => t.id === closet.type);
  const typeTitle = typePreset ? typePreset.title : closet.type;

  return { typeTitle };
}
