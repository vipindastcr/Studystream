import { v4 as uuidv4 } from "uuid";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPendingUserRepository } from "../../domain/repositories/IPendingUserRepository";
import { IOtpService } from "../../domain/services/IOtpService";

interface VerifyOtpDTO {
  pendingId: string;
  otp: string;
}

export class VerifyOtpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private pendingUserRepository: IPendingUserRepository,
    private otpService: IOtpService
  ) {}

  async execute({ pendingId, otp }: VerifyOtpDTO) {
    if (!pendingId || !otp) {
      throw new Error("Registration ID and OTP are required");
    }

    const pendingUser = await this.pendingUserRepository.findById(pendingId);
    if (!pendingUser) {
      throw new Error("Registration session not found or already verified");
    }

    if (pendingUser.otpExpiresAt.getTime() < Date.now()) {
      await this.pendingUserRepository.deleteById(pendingUser.id);
      throw new Error("OTP expired. Please register again.");
    }

    const isOtpValid = await this.otpService.compareOtp(otp, pendingUser.otpHash);
    if (!isOtpValid) {
      throw new Error("Invalid OTP");
    }

    const newUser = new User(
      uuidv4(),
      pendingUser.first_name,
      pendingUser.last_name,
      pendingUser.email,
      pendingUser.phone_number,
      pendingUser.passwordHash,
      pendingUser.role,
      pendingUser.createdAt,
      new Date(),
      false,
      true
    );

    const savedUser = await this.userRepository.create(newUser);
    await this.pendingUserRepository.deleteById(pendingUser.id);

    return {
      success: true,
      message: "Email verified successfully",
      userId: savedUser.id,
      email: savedUser.email
    };
  }
}

