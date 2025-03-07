import { ApiProperty } from '@nestjs/swagger';

export class CreateCurriculumDto {
    @ApiProperty({required: false})
    _id?: string;

    @ApiProperty()
    originalname?: string;

    @ApiProperty()
    filename?: string;

    @ApiProperty()
    size?: number;

    @ApiProperty()
    type?: string;
}
