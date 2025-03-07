import { ApiProperty } from '@nestjs/swagger';

export class SaveResultLabDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    learner: string;

    @ApiProperty()
    lab: string;

    @ApiProperty()
    originalname: string;

    @ApiProperty()
    filename: string;

    @ApiProperty()
    size: number;

    @ApiProperty()
    type: string;
}

export class CheckResultLabDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    lab: string;

    @ApiProperty()
    learner: string;
}