

import bcrypt from "bcrypt"
import { IPasswordService } from "@domain/services/IPasswordService"

export class BcryptPasswordService implements IPasswordService {
    
    async hashPassword( password :string ) : Promise <string>{
        return bcrypt.hash( password, 10)
    }

    async comparePassword ( password : string, hash : string ): Promise <boolean>{
        return bcrypt.compare(password, hash)
    }
}