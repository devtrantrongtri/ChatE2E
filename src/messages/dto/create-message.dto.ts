import { IsEmpty } from "class-validator";

export class CreateMessageDto {
    @IsEmpty()
    senderId: string;
    @IsEmpty()
    receiverId: string;
    
    message: string;
}
