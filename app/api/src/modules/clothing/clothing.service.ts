import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { ClothingRepository } from "./clothing.repository";
import { ClosetService } from "../closet/closet.service";
import type {
  ClothingCategory,
  CreateClothingInput,
  UpdateClothingInput,
} from "@clothset/shared-schemas";

@Injectable()
export class ClothingService {
  constructor(
    private readonly clothingRepository: ClothingRepository,
    private readonly closetService: ClosetService
  ) {}

  async getClothesByCloset(
    userId: string,
    closetId: string,
    category?: ClothingCategory
  ) {
    await this.closetService.getClosetById(userId, closetId);
    return this.clothingRepository.findManyByClosetId(closetId, category);
  }

  async getClothesByUser(userId: string, category?: ClothingCategory) {
    return this.clothingRepository.findManyByUserId(userId, category);
  }

  async createClothing(
    userId: string,
    closetId: string,
    data: CreateClothingInput
  ) {
    const closet = await this.closetService.getClosetById(userId, closetId);

    const currentCount = await this.clothingRepository.countByClosetId(closetId);
    if (currentCount >= closet.maxItems) {
      throw new BadRequestException(
        `Wardrobe capacity reached (${currentCount}/${closet.maxItems}). Remove an item before adding more.`
      );
    }

    return this.clothingRepository.create(userId, closetId, data);
  }

  async updateClothing(
    userId: string,
    clothingId: string,
    data: UpdateClothingInput
  ) {
    const item = await this.clothingRepository.findById(clothingId);
    if (!item) {
      throw new NotFoundException("Clothing item not found");
    }
    if (item.userId !== userId) {
      throw new ForbiddenException("Access denied to this clothing item");
    }

    return this.clothingRepository.update(clothingId, data);
  }

  async deleteClothing(userId: string, clothingId: string) {
    const item = await this.clothingRepository.findById(clothingId);
    if (!item) {
      throw new NotFoundException("Clothing item not found");
    }
    if (item.userId !== userId) {
      throw new ForbiddenException("Access denied to this clothing item");
    }

    await this.clothingRepository.delete(clothingId);
    return { success: true };
  }
}
