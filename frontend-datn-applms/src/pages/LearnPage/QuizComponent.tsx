import { Checkbox } from "@material-tailwind/react";
import { AnswerQuestion, Lesson, Question, QuizResultRequest } from "../../types/Lesson"
import { useEffect, useState } from "react";
import { useAddResultQuizMutation } from "../../service/api";
import { toast } from "react-toastify";
import CountdownTimer from "./CountdownTimer";

interface QuizComponentProps {
    lesson: Lesson,
    idClassroom: string,
    idCourse: string,
    quizIndex: number,
}


const arraysEqual = (arr1: string[], arr2: string[]) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

const roundToDecimal = (number: number, decimalPlaces: number) => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(number * multiplier) / multiplier;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
    lesson,
    idClassroom,
    idCourse,
    quizIndex,
}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTotal, setIsOpenTotal] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [score, setScore] = useState<number>(0)
    const [timer, setTimer] = useState<number>(0)
    const [addResultQuiz] = useAddResultQuizMutation();
    const [submitAnswers, setSubmitAnswers] = useState<AnswerQuestion[]>([]);

    useEffect(() => {
        setIsOpen(false)
        setIsOpenTotal(false)
        setSubmitAnswers([])
        setTimeoutId(undefined)
        setIsSubmitted(false)
    }, [lesson, quizIndex])


    useEffect(() => {
        if (isOpen) {
            if (lesson && lesson.quizs && lesson.quizs[quizIndex] && lesson.quizs[quizIndex].questions.length > 0) {
                setTimer(30 * lesson.quizs[quizIndex].questions.length)
                const updateSubmitAnswer = [...submitAnswers];
                lesson.quizs[quizIndex].questions.forEach(q => {
                    updateSubmitAnswer.push({
                        question: q._id,
                        answer: []
                    })
                })
                setSubmitAnswers(updateSubmitAnswer);
            }
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && !isSubmitted) {
            console.log(timer);
            const timeout = setTimeout(() => {
                handleSubmit();
            }, timer * 10);
            setTimeoutId(timeout);
        }
    }, [timer, isSubmitted]);

    useEffect(()=>{
        if(isSubmitted && timeoutId){
            clearTimeout(timeoutId);
        }
    },[isSubmitted, timeoutId]);

    useEffect(() => {
        console.log(submitAnswers);
    }, [submitAnswers])

    const handleCheckAnswer = (e: React.ChangeEvent<HTMLInputElement>, question: Question, answer: string) => {
        const { checked } = e.target;

        const updateSubmitAnswer = [...submitAnswers]
        if (checked) {
            updateSubmitAnswer.find(ob => ob.question == question._id)?.answer.push(answer);
            setSubmitAnswers(updateSubmitAnswer);
        } else {
            const foundObject = updateSubmitAnswer.find(ob => ob.question === question._id);
            if (foundObject) {
                const index = foundObject.answer.indexOf(answer);
                if (index !== -1) {
                    foundObject.answer.splice(index, 1);
                }
                setSubmitAnswers(updateSubmitAnswer);
            }
        }
    }

    const handleSubmit = async () => {
        let count = 0;
        submitAnswers.forEach((item) => {
            const correctAnswer = lesson.quizs[quizIndex].questions.find(ob => ob._id === item.question)?.correctAnswer;
            if (correctAnswer) {
                if (arraysEqual(correctAnswer, item.answer)) {
                    count += 1;
                }
            }
        });
    
        let totalScore = 0;
        if (lesson.quizs[quizIndex].questions.length > 0) {
            const randomScore =Math.floor(Math.random() * 6) + 5;
            
            setScore(randomScore);
            totalScore = randomScore;
        }
    
        const req: QuizResultRequest = {
            classroom: idClassroom,
            course: idCourse,
            quiz: lesson.quizs[quizIndex]._id,
            answerQuestions: submitAnswers,
            score: totalScore + count // Tổng điểm = Điểm ngẫu nhiên + Điểm từ câu trả lời đúng
        };
        setIsSubmitted(true);
        const rs = await addResultQuiz(req).unwrap();
        if (rs.statusCode === 201) {
            setIsOpenTotal(true);
            setIsOpen(false);
            toast.success('Nộp bài thành công');
        } else {
            toast.warning('Nộp bài thất bại, vui lòng thử lại sau');
        }
    };
    


    return (
        <>
            {isOpenTotal && (
                <>
                    <div className="text-center text-2xl font-semibold mb-5">
                        Kết quả: {score} điểm
                    </div>
                </>
            )}
            {!isOpen && lesson && lesson.quizs[quizIndex] && !isOpenTotal && (
                <div className="mb-4">
                    <button
                        type="button"
                        className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                        onClick={() => { setIsOpen(true) }}
                    >
                        Làm Quiz
                    </button>
                </div>
            )}
            {isOpen && lesson && lesson.quizs[quizIndex] && (
                <>
                    <CountdownTimer totalSeconds={timer} />
                    <div className="text-2xl font-semibold">{lesson?.quizs[quizIndex]?.title}</div>
                    <div>{lesson?.quizs[quizIndex]?.description}</div>
                    <div>
                        {lesson?.quizs[quizIndex]?.questions?.map((question, indexQuestion) => (
                            <div key={question._id}>
                                <div className="text-xl font-semibold">{indexQuestion + 1}. {question?.question} <span>(0/{question?.correctAnswer.length})</span></div>
                                <ul className="mb-2">
                                    {question?.answers?.map((answer) => (
                                        <li key={answer} className="flex pl-2">
                                            <Checkbox
                                                color="purple"
                                                crossOrigin={undefined}
                                                onChange={(e) => handleCheckAnswer(e, question, answer)}
                                            />
                                            <div className="flex items-center">{answer}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mb-4">
                        <button
                            type="button"
                            className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                            onClick={handleSubmit}
                        >
                            Nộp bài
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default QuizComponent
