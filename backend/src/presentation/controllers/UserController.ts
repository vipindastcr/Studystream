import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';
// 1. Import the Password Service Implementation
import { BcryptPasswordService } from '../../infrastructure/services/BcryptPasswordService';

export class UserController {
    // 2. Instantiate the Repository (The Ingredients)
    private userRepo = new UserRepositoryImpl();

    // 3. Instantiate the Password Service (The Knife)
    private passwordService = new BcryptPasswordService();

    // 4. Update the Use Case to accept BOTH arguments
    private registerUserUseCase = new RegisterUserUseCase(
        this.userRepo,       // First arg: Repository
        this.passwordService // Second arg: Password Service (This was missing!)
    );

    // ... your register method ...
     register = async (req: Request, res: Response)=>{
        try {
            const result = await this.registerUserUseCase.execute(req.body);
            // console.log('resul t : ', result );
            res.status(201).json(result);
        } catch (error) {
            
            // 1. Cast error to 'any' to access properties freely
            const err = error as any;

            console.error("🔴 Error in Controller:", err.message); 
            
            if (err.errors) console.error("Validation Details:", err.errors);
            
            res.status(400).json({ error: err.message });
        }
    }
}