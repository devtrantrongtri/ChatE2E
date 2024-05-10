import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private groupModel: Model<Group>,
  ){}

  // Tạo Group
  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      const group = await this.groupModel.create(createGroupDto)
      return group;
    } catch (error) {
      return new Error(error);
    }
  }

  // Tìm tất cả Group
  async findAllGroup() {
    const groupList = await this.groupModel.find()
    return groupList;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
