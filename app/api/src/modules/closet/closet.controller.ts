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
} from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUserId } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import {
  createClosetSchema,
  updateClosetSchema,
  activateTemplateSchema,
  type CreateClosetInput,
  type UpdateClosetInput,
  type ActivateTemplateInput,
} from "@clothset/shared-schemas/closet.schema";
import { ClosetService } from "./closet.service";

@Controller("closets")
@UseGuards(JwtAuthGuard)
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  @Get()
  async getClosets(@CurrentUserId() userId: string) {
    return this.closetService.getClosets(userId);
  }

  @Get(":id")
  async getClosetById(
    @CurrentUserId() userId: string,
    @Param("id") id: string
  ) {
    return this.closetService.getClosetById(userId, id);
  }

  @Post("activate-template")
  @UsePipes(new ZodValidationPipe(activateTemplateSchema))
  async activateTemplate(
    @CurrentUserId() userId: string,
    @Body() body: ActivateTemplateInput
  ) {
    return this.closetService.activateTemplate(userId, body.templateId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createClosetSchema))
  async createCloset(
    @CurrentUserId() userId: string,
    @Body() body: CreateClosetInput
  ) {
    return this.closetService.createCloset(userId, body);
  }

  @Put(":id")
  @UsePipes(new ZodValidationPipe(updateClosetSchema))
  async updateCloset(
    @CurrentUserId() userId: string,
    @Param("id") id: string,
    @Body() body: UpdateClosetInput
  ) {
    return this.closetService.updateCloset(userId, id, body);
  }

  @Delete(":id")
  async deleteCloset(
    @CurrentUserId() userId: string,
    @Param("id") id: string
  ) {
    return this.closetService.deleteCloset(userId, id);
  }
}
