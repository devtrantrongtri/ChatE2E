import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';


@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiTags('messages')
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
  @ApiTags('messages')
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getMessages(
    @Param('id') receiverID: string,
    @Req() req){

       const senderID = req.user.userId; 
       return this.messagesService.getMessages(senderID, receiverID);
    }
  
    @ApiTags('messages')
    @UseGuards(AuthenticatedGuard)
    @Post('/group/:id')
    createMessageInGroup(
      @Body() createMessageDto : CreateMessageDto,
    ){
    return this.messagesService.createMessageInGroup(createMessageDto);

    }
}
