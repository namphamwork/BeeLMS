import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    weight?: number;
}
