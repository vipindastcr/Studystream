

import {Request, Response} from "express"
import { UserRepositoryImpl} from "@infrastructure/repositories/UserRepositoryImpl"
import {RegisterUserUseCase} from "@application/use-cases/RegisterUserUseCase"


export class UserController {
    private userRepo = new UserRepositoryImpl();
    private createUser = new RegisterUserUseCase( this.userRepo )

    // register = async ( req: Request, res: Response) => {
    //     try {
    //             console.log('req.body : ---', req.body);
    //          const user = await this.createUser.execute(req.body)
    //          res.status(201).json(user)
    //     } catch (error) {
    //         res.status(500).json({message: "Internal server error"})
    //     }
    // }

    register = async (req: Request, res: Response) => {
    try {
        console.log("req.body:", req.body);

        const user = await this.createUser.execute(req.body);

        return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            console.error("ERROR:", error.message);
            return res.status(500).json({ message: error.message });
        }
        
        console.error("Unknown ERROR:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


}
