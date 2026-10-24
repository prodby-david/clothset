import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UsePipes,
  Req,
} from "@nestjs/common";
import type { Request } from "express";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AdminAuthGuard } from "../../common/guards/admin-auth.guard";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import {
  createWardrobeTemplateSchema,
  updateWardrobeTemplateSchema,
  type CreateWardrobeTemplateInput,
  type UpdateWardrobeTemplateInput,
} from "@clothset/shared-schemas/closet.schema";
import type { UserPlan } from "@clothset/shared-schemas/user.schema";
import { WardrobeTemplateService } from "./wardrobe-template.service";

@Controller()
export class WardrobeTemplateController {
  constructor(private readonly service: WardrobeTemplateService) {}

  @Get("wardrobe-templates")
  @UseGuards(JwtAuthGuard)
  async getTemplatesForUser(@Req() req: Request & { user: { plan: string } }) {
    const userPlan = (req.user?.plan || "FREE") as UserPlan;
    return this.service.getTemplatesForUser(userPlan);
  }

  @Get("admin/wardrobe-templates")
  @UseGuards(AdminAuthGuard)
  async getAllTemplates() {
    return this.service.getAllTemplates();
  }

  @Post("admin/wardrobe-templates")
  @UseGuards(AdminAuthGuard)
  @UsePipes(new ZodValidationPipe(createWardrobeTemplateSchema))
  async createTemplate(@Body() body: CreateWardrobeTemplateInput) {
    return this.service.create(body);
  }

  @Put("admin/wardrobe-templates/:id")
  @UseGuards(AdminAuthGuard)
  @UsePipes(new ZodValidationPipe(updateWardrobeTemplateSchema))
  async updateTemplate(
    @Param("id") id: string,
    @Body() body: UpdateWardrobeTemplateInput
  ) {
    return this.service.update(id, body);
  }

  @Delete("admin/wardrobe-templates/:id")
  @UseGuards(AdminAuthGuard)
  async deleteTemplate(@Param("id") id: string) {
    return this.service.delete(id);
  }
}
