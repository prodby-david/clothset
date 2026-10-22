import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { StorageService } from "./storage.service";

@Controller("storage")
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post("upload")
  async uploadFile(@Body() body: { dataUrl: string; fileName?: string }) {
    if (!body?.dataUrl) {
      throw new BadRequestException("dataUrl is required");
    }
    const url = await this.storageService.uploadBase64Image(body.dataUrl, body.fileName);
    return { url };
  }

  @Post("presigned-url")
  async getPresignedUrl(@Body() body: { fileName: string; contentType: string }) {
    if (!body?.fileName || !body?.contentType) {
      throw new BadRequestException("fileName and contentType are required");
    }
    return this.storageService.getPresignedUploadUrl(body.fileName, body.contentType);
  }
}
