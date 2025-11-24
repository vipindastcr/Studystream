import { PendingUser } from "../entities/PendingUser";

export interface IPendingUserRepository {
  create(pendingUser: PendingUser): Promise<PendingUser>;
  findById(id: string): Promise<PendingUser | null>;
  findByEmail(email: string): Promise<PendingUser | null>;
  deleteById(id: string): Promise<void>;
  deleteByEmail(email: string): Promise<void>;
}

