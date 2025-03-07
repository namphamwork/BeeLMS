import { ApiProperty } from '@nestjs/swagger';

export class SaveResultAssignmentDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    learner: string;

    @ApiProperty()
    assignment: string;

    @ApiProperty()
    originalname: string;

    @ApiProperty()
    filename: string;

    @ApiProperty()
    size: number;

    @ApiProperty()
    type: string;
}

export class CheckResultAssignmentDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    assignment: string;

    @ApiProperty()
    learner: string;
}