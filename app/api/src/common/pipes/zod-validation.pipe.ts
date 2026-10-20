import type { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";

export interface ZodValidationSchema<T = unknown> {
  safeParse(data: unknown):
    | { success: true; data: T }
    | {
        success: false;
        error: {
          flatten(): { fieldErrors: Record<string, string[] | undefined> };
        };
      };
}

export class ZodValidationPipe<T = unknown> implements PipeTransform {
  constructor(private readonly schema: ZodValidationSchema<T>) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    return result.data;
  }
}
