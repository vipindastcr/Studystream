
import { IUserRepository } from "@domain/repositories/IUserRepository";
import { User } from "@domain/entities/User";
import { IPasswordService} from "@domain/services/IPasswordService"; // Importing the Interface

export class RegisterUserUseCase {
  // 1. We ask for the TOOLS we need in the constructor
  constructor(
    private userRepo: IUserRepository,
    private passwordService: IPasswordService // <--- Dependency Injection
  ) {}


  // 2. Use the service to hash the password
  async execute(data: User): Promise<User> {
    return this.userRepo.create(data);
  }
}
