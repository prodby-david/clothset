import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import bcrypt from "bcryptjs";
import type { AdminSignInInput } from "@clothset/shared-schemas/admin.schema";
import { AdminAuthRepository } from "./admin-auth.repository";
import { TokenService } from "../token/token.service";
import type { AuthenticatedAdmin } from "../token/token.types";

export interface AdminAuthResult {
  admin: AuthenticatedAdmin;
  token: string;
}

@Injectable()
export class AdminAuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly repository: AdminAuthRepository,
    private readonly tokenService: TokenService,
  ) {}

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
}
