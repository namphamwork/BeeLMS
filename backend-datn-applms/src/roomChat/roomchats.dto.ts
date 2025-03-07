import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomChatDto {
    @ApiProperty()
    classroomId: string;
}
