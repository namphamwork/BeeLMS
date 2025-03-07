import { ApiProperty } from '@nestjs/swagger';

export class CreatePostCateDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    title?: string;
}
