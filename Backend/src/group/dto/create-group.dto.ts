export class CreateGroupDto {
    groupName: string;
    groupConversation: string[]; // Giải quyết DC ở đây.
    groupDescription: string;
    members: string[];
}
