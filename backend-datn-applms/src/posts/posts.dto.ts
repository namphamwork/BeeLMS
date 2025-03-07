import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    category?: string;
}
