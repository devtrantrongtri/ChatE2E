import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

   async validateUser(username: string, password: string): Promise<any>{
        const user = await this.usersService.getUser(username);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                return {
                    userId: user.id,
                    userName: user.username,
                    hashPassword: user.password
                    // nen return only username and id and hash password
                  };
            }else{
                return null;
            }
        }
    }

}

