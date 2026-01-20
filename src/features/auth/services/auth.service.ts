import { prismaClient } from "@/src/lib";
import bcrypt from "bcryptjs";
import { RegisterSchema, type RegisterInput } from "@/src/validation/auth";
import type { RegisterResponse } from "@/src/types/auth";
import {
  BusinessLogicError,
} from "@/src/lib/api/errors/customErrors";
import {
  ErrorCode,
} from "@/src/lib/api/errorConstants";

export class AuthService {
  /**
   * Register a new user with email and password
   */
  static async register(data: RegisterInput): Promise<RegisterResponse> {
    // Validate input
    const validatedData = RegisterSchema.parse(data);

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new BusinessLogicError(ErrorCode.USER_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        provider: "Email",
      },
      select: {
        id: true,
        email: true,
      },
    });

    return {
      message: "User created successfully",
      user,
    };
  }
}

