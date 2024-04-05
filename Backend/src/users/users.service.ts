import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPass(password: string){
  const hashed = bcrypt.hashSync(password, 10);
  return hashed.toString();
}

async isMatchPass(password: string,hash: string){
  await bcrypt.compare(password, hash);
}
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.getUser(createUserDto.username);
  
    if (existingUser) {
      //  throw new Error('Username already exists');
      return {
        msg: 'Username already exists'
      }
    }else{
      const password = await this.hashPass(createUserDto.password);
      const user = await this.userModel.create({username: createUserDto.username, email: createUserDto.email, password: password});
      return  {
      msg : "created a new user !",
      username : user.username
    };
    }

    
    // return 'This action adds a new user';
  }

  async findAll() {
    return this.userModel.find().exec();
  }
  async getUser(username:string){
    const user=await this.userModel.findOne({username: username}).exec();
    return user;
  }

  // // have to convert string to objectid to using findById()
  async findOne(id: string) {
    const objectId = new mongoose.Types.ObjectId(id); 
    return this.userModel.findById(objectId).exec();
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   const objectId = new mongoose.Types.ObjectId(id); 
  //   return this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true }).exec();
  // }

  // async remove(id: string) {
  //   const objectId = new mongoose.Types.ObjectId(id); 
  //   return this.userModel.deleteOne(objectId).exec();
  // }

}
