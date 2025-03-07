import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
    @ApiProperty()
    _id?: string;

    @ApiProperty()
    title?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    questions?: {
      question: string;
      answers: string[];
      correctAnswer: string[];
    }[];

    @ApiProperty()
    weight?: number;
}
