

export interface IOtpService {
    generateOtp(): string;
    hashOtp(otp: string): Promise<string>;
    compareOtp(otp: string, hash: string): Promise<boolean>;
    sendOtp(email: string, otp: string): Promise<void>;
}