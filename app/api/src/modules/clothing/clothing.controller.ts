import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUserId } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import {
  createClothingSchema,
  updateClothingSchema,
  type ClothingCategory,
  type CreateClothingInput,
  type UpdateClothingInput,
} from "@clothset/shared-schemas/clothing.schema";
import { ClothingService } from "./clothing.service";

@Controller()
@UseGuards(JwtAuthGuard)
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) {}

  @Get("clothes")
  async getAllClothes(
    @CurrentUserId() userId: string,
    @Query("category") category?: ClothingCategory
  ) {
    return this.clothingService.getClothesByUser(userId, category);
  }

  @Get("closets/:closetId/clothes")
  async getClothesByCloset(
    @CurrentUserId() userId: string,
    @Param("closetId") closetId: string,
    @Query("category") category?: ClothingCategory
  ) {
    return this.clothingService.getClothesByCloset(userId, closetId, category);
  }

  @Post("closets/:closetId/clothes")
  @UsePipes(new ZodValidationPipe(createClothingSchema))
  async createClothing(
    @CurrentUserId() userId: string,
    @Param("closetId") closetId: string,
    @Body() body: CreateClothingInput
  ) {
    return this.clothingService.createClothing(userId, closetId, body);
  }

  @Put("clothes/:id")
  @UsePipes(new ZodValidationPipe(updateClothingSchema))
  async updateClothing(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() body: UpdateClothingInput
  ) {
    return this.clothingService.updateClothing(userId, id, body);
  }

  @Delete("clothes/:id")
  async deleteClothing(
    @CurrentUserId() userId: string,
    @Param("id") id: string
  ) {
    return this.clothingService.deleteClothing(userId, id);
  }
}
