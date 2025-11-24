import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { VerifyOtpUseCase } from '../../application/use-cases/VerifyOtpUseCase';
import { UserRepositoryImpl } from '../../infrastructure/repositories/UserRepositoryImpl';
import { PendingUserRepositoryImpl } from '../../infrastructure/repositories/PendingUserRepositoryImpl';
import { BcryptPasswordService } from '../../infrastructure/services/BcryptPasswordService';
import { OtpServiceImpl } from '../../infrastructure/services/OtpServiceImpl';

export class UserController {
    private userRepo = new UserRepositoryImpl();
    private pendingUserRepo = new PendingUserRepositoryImpl();
    private passwordService = new BcryptPasswordService();
    private otpService = new OtpServiceImpl();

    private registerUserUseCase = new RegisterUserUseCase(
        this.userRepo,
        this.pendingUserRepo,
        this.passwordService,
        this.otpService
    );
    private verifyOtpUseCase = new VerifyOtpUseCase(
        this.userRepo,
        this.pendingUserRepo,
        this.otpService
    );

    register = async (req: Request, res: Response) => {
        try {
            console.log('req------ -', req);
            const result = await this.registerUserUseCase.execute(req.body);
            // console.log('the req: --', result);
            res.status(201).json(result);
        } catch (error) {
            const err = error as any;
            console.error("Error in Controller:", err.message);

            if (err.errors) console.error("Validation Details:", err.errors);

            res.status(400).json({ error: err.message });
        }
    };

    verifyOtp = async (req: Request, res: Response) => {
        try {
            const result = await this.verifyOtpUseCase.execute(req.body);
            res.status(200).json(result);
        } catch (error) {
            const err = error as any;
            console.error("Error verifying OTP:", err.message);
            res.status(400).json({ error: err.message });
        }
    };
}
