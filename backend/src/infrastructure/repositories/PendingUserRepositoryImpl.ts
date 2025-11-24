import { PendingUser } from "@domain/entities/PendingUser";
import { IPendingUserRepository } from "@domain/repositories/IPendingUserRepository";
import { PendingUserModel } from "@infrastructure/models/PendingUserModel";

export class PendingUserRepositoryImpl implements IPendingUserRepository {
  private toEntity(doc: any): PendingUser {
    if (!doc) return null as any;

    return new PendingUser(
      doc._id.toString(),
      doc.first_name,
      doc.last_name,
      doc.email,
      doc.phone_number,
      doc.passwordHash,
      doc.role,
      doc.otpHash,
      doc.otpExpiresAt,
      doc.createdAt
    );
  }

  async create(pendingUser: PendingUser): Promise<PendingUser> {
    const created = await PendingUserModel.create({
      first_name: pendingUser.first_name,
      last_name: pendingUser.last_name,
      email: pendingUser.email,
      phone_number: pendingUser.phone_number,
      passwordHash: pendingUser.passwordHash,
      role: pendingUser.role,
      otpHash: pendingUser.otpHash,
      otpExpiresAt: pendingUser.otpExpiresAt,
      createdAt: pendingUser.createdAt
    });

    return this.toEntity(created.toObject());
  }

  async findById(id: string): Promise<PendingUser | null> {
    const doc = await PendingUserModel.findById(id).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async findByEmail(email: string): Promise<PendingUser | null> {
    const doc = await PendingUserModel.findOne({ email }).lean();
    return doc ? this.toEntity(doc) : null;
  }

  async deleteById(id: string): Promise<void> {
    await PendingUserModel.findByIdAndDelete(id);
  }

  async deleteByEmail(email: string): Promise<void> {
    await PendingUserModel.findOneAndDelete({ email });
  }
}

