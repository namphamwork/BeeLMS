import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    title?: string;
}
