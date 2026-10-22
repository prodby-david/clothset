import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import type { OnModuleInit } from "@nestjs/common";
import bcrypt from "bcryptjs";
import type { AdminSignInInput } from "@clothset/shared-schemas";
import { AdminAuthRepository } from "./admin-auth.repository";
import { TokenService } from "../token/token.service";
import type { AuthenticatedAdmin } from "../token/token.types";

export interface AdminAuthResult {
  admin: AuthenticatedAdmin;
  token: string;
}

@Injectable()
export class AdminAuthService implements OnModuleInit {
  private readonly saltRounds = 10;

  constructor(
    private readonly repository: AdminAuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async onModuleInit() {
    await this.seedInitialAdminIfEmpty();
  }

  async signIn(input: AdminSignInInput): Promise<AdminAuthResult> {
    const admin = await this.repository.findByEmail(input.email);
    if (!admin || !admin.passwordHash) {
      throw new UnauthorizedException("Invalid administrator credentials");
    }

    const isValid = await bcrypt.compare(input.password, admin.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Invalid administrator credentials");
    }

    const authenticatedAdmin: AuthenticatedAdmin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };

    const token = await this.tokenService.generateAdminToken(authenticatedAdmin);

    return {
      admin: authenticatedAdmin,
      token,
    };
  }

  async getProfile(adminId: string): Promise<AuthenticatedAdmin> {
    const admin = await this.repository.findById(adminId);
    if (!admin) {
      throw new NotFoundException("Administrator account not found");
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };
  }

  private async seedInitialAdminIfEmpty() {
    const count = await this.repository.count();
    if (count > 0) return;

    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@clothset.app";
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@Clothset2026!";
    const defaultName = "System Administrator";

    const passwordHash = await bcrypt.hash(defaultPassword, this.saltRounds);

    await this.repository.create({
      email: defaultEmail,
      passwordHash,
      name: defaultName,
    });
  }
}
