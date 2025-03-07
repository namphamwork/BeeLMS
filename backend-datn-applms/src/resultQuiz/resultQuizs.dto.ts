import { ApiProperty } from '@nestjs/swagger';

export class SaveResultQuizDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    learner: string;
    
    @ApiProperty()
    quiz: string;

    @ApiProperty()
    answerQuestions: answerQuestionsDto[];
    
    @ApiProperty()
    score: number;
}

export class CreateResultQuizDto {
    @ApiProperty()
    classroom: string;

    @ApiProperty()
    course: string;

    @ApiProperty()
    learner: string;
    
    @ApiProperty()
    quiz: string;

    @ApiProperty()
    answerQuestions: answerQuestionsDto[];
    
    @ApiProperty()
    score: number;
}

export class answerQuestionsDto {
    @ApiProperty()
    question: string;
    
    @ApiProperty()
    answer: string[];
}