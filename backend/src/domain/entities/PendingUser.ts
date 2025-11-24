import { UserRole } from "./User";

export class PendingUser {
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public phone_number: string,
    public passwordHash: string,
    public role: UserRole,
    public otpHash: string,
    public otpExpiresAt: Date,
    public createdAt: Date
  ) {}
}

