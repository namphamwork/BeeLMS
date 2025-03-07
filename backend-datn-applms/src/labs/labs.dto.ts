import { ApiProperty } from '@nestjs/swagger';

export class CreateLabDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    weight?: number;
}
