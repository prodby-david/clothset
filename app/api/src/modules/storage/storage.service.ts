import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client | null = null;
  private readonly bucket: string;
  private readonly region: string;

  constructor() {
    this.region = process.env.AWS_REGION || "us-east-1";
    this.bucket = process.env.AWS_S3_BUCKET || "clothset-wardrobe-assets";

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  async uploadBase64Image(dataUrl: string, fileName?: string): Promise<string> {
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new BadRequestException("Invalid data URL format");
    }

    const contentType = matches[1].toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      throw new BadRequestException("Invalid image type. Only JPEG, PNG, and WEBP are allowed.");
    }

    const buffer = Buffer.from(matches[2], "base64");
    if (buffer.length > MAX_UPLOAD_BYTES) {
      throw new BadRequestException("Image file size exceeds the 5MB limit");
    }

    const sanitizedName = (fileName || "image.jpg").replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `clothes/${randomUUID()}-${sanitizedName || "image.jpg"}`;

    if (!this.s3Client) {
      this.logger.warn("AWS S3 not configured. Returning local placeholder/data URL.");
      return dataUrl;
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  async getPresignedUploadUrl(
    fileName: string,
    contentType: string
  ): Promise<{ uploadUrl: string; fileUrl: string; key: string }> {
    const normalizedType = contentType.toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(normalizedType)) {
      throw new BadRequestException("Invalid content type. Only JPEG, PNG, and WEBP are allowed.");
    }

    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "");
    const key = `clothes/${randomUUID()}-${sanitizedName || "image.jpg"}`;

    if (!this.s3Client) {
      return {
        uploadUrl: "",
        fileUrl: `/placeholder/${key}`,
        key,
      };
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: normalizedType,
    });

    const uploadUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    const fileUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    return { uploadUrl, fileUrl, key };
  }
}
