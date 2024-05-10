import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Tạo group mới
  @ApiTags('Group')
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    try {
      return this.groupService.createGroup(createGroupDto);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // hiển thị tất cả group
  @ApiTags('Group')
  @Get()
  findAll() {
    return this.groupService.findAllGroup();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
