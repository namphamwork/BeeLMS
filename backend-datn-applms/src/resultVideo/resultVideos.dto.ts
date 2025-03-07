import { ApiProperty } from '@nestjs/swagger';

export class SaveResultVideoDto {
    @ApiProperty()
    course: string;
    @ApiProperty()
    learner: string;
    @ApiProperty()
    video: string;
}

export class CheckResultVideoDto {
    @ApiProperty()
    course: string;
    @ApiProperty()
    learner: string;
}
