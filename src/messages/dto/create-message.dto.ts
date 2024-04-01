import {  IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    // @IsNotEmpty()
    senderId: string;
    // @IsNotEmpty()
    receiverId: string;
    @IsNotEmpty()
    message: string;
}
