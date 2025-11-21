import { v4 as uuidv4 } from 'uuid'; // Tool to generate random IDs
import { User, UserRole } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IPasswordService } from '../../domain/services/IPasswordService';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordService: IPasswordService
  ) {}

  async execute(userData: any) {
    // 1. Hash the password first
    const hashedPassword = await this.passwordService.hashPassword(userData.password);
    // console.log('the hashed password -- @ appli/use-cases/RgstUrUscs ', hashedPassword );

    // 2. Create the User Entity
    // You must fill ALL fields defined in your User class constructor
    const newUser = new User(
      uuidv4(),              // id: We generate it here!
      userData.first_name,   // first_name
      userData.last_name,    // last_name
      userData.email,        // email
      userData.phone_number, // phone_number
      hashedPassword,        // passwordHash (NOT plain text)
      UserRole.USER,         // role: Default to USER
      new Date(),            // created_at: Current time
      new Date(),            // last_login: Current time (assuming auto-login)
      false                  // isBlocked: Default to false
    );

    // 3. Save to repository
    return await this.userRepository.create(newUser);
  }
}