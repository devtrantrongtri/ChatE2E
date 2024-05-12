import { IsNotEmpty } from "class-validator";
import { Message } from "src/messages/schemas/message.schemas";

export class CreateConversationDto {
    @IsNotEmpty()
    participants :[];
    @IsNotEmpty()
    messageIds: [];
    groupName: string|null;
}
