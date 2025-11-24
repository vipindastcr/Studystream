import { IOtpService } from "@domain/services/IOtpService";
import bcrypt from "bcryptjs";
import { sendOtpMail } from "./mailService";

export class OtpServiceImpl implements IOtpService {
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async hashOtp(otp: string): Promise<string> {
    return bcrypt.hash(otp, 10);
  }

  async compareOtp(otp: string, hash: string): Promise<boolean> {
    return bcrypt.compare(otp, hash);
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    await sendOtpMail(email, otp);

    // Temporary console for debugging; remove in production
    console.log(`OTP ${otp} sent to ${email}`);
  }
}

