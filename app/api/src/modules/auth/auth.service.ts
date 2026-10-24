import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import bcrypt from "bcryptjs";
import type { SignInInput, SignUpInput } from "@clothset/shared-schemas/user.schema";
import { AuthRepository } from "./auth.repository";
import { TokenService } from "../token/token.service";
import type { TokenPair, AuthenticatedUser } from "../token/token.types";

export interface AuthResult {
  user: AuthenticatedUser & { name: string | null };
  tokens: TokenPair;
}

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(input: SignUpInput): Promise<AuthResult> {
    const existing = await this.authRepository.existsByEmail(input.email);
    if (existing) {
      throw new ConflictException("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, this.saltRounds);

    const user = await this.authRepository.create({
      email: input.email,
      passwordHash,
      name: input.name,
      plan: "FREE",
    });

    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      plan: user.plan,
    };

    const tokens = await this.tokenService.generateTokens(authenticatedUser);

    return {
      user: {
        ...authenticatedUser,
        name: user.name,
      },
      tokens,
    };
  }

  async signIn(input: SignInInput): Promise<AuthResult> {
    const user = await this.authRepository.findByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      plan: user.plan,
    };

    const tokens = await this.tokenService.generateTokens(authenticatedUser);

    return {
      user: {
        ...authenticatedUser,
        name: user.name,
      },
      tokens,
    };
  }

  async refresh(refreshToken: string): Promise<AuthResult> {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.authRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException("User no longer exists");
    }

    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: user.email,
      plan: user.plan,
    };

    const tokens = await this.tokenService.generateTokens(authenticatedUser);

    return {
      user: {
        ...authenticatedUser,
        name: user.name,
      },
      tokens,
    };
  }

  async getCurrentUserProfile(userId: string): Promise<AuthenticatedUser & { name: string | null }> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      plan: user.plan,
      name: user.name,
    };
  }
}
