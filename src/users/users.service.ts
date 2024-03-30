import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    
    const user = await this.userModel.create({name: createUserDto.name, email: createUserDto.email, password: createUserDto.password});
    return  user;
    // return 'This action adds a new user';
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  // have to convert string to objectid to using findById()
  async findOne(id: string) {
    const objectId = new mongoose.Types.ObjectId(id); 
    return this.userModel.findById(objectId).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const objectId = new mongoose.Types.ObjectId(id); 
    return this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true }).exec();
  }

  async remove(id: string) {
    const objectId = new mongoose.Types.ObjectId(id); 
    return this.userModel.deleteOne(objectId).exec();
  }
}
