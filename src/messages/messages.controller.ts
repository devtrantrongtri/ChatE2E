import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messagesService.create(createMessageDto);
  // }

  // @Get()
  // findAll() {
  //   return this.messagesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messagesService.remove(+id);
  // }
  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  sendMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') receiverID: string,
    @Req() req,
  ) {
    const senderID = req.user.userId; 
    // Thêm senderID và receiverID vào createMessageDto
    createMessageDto.senderId = senderID;
    createMessageDto.receiverId = receiverID;
    return this.messagesService.createMessage(createMessageDto);
  }
}
