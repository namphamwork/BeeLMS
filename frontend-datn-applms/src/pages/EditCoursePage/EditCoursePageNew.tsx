import { Checkbox, Input, Textarea } from "@material-tailwind/react";
import { FileInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultipleFileEdit from "../../components/MultipleFile/MultipleFileEdit";
import { urlUpload } from "../../constant/config";
import {
  useAddCurriculumsMutation,
  useGetCourseQuery,
  useUpdateAssignmentsMutation,
  useUpdateCourseMutation,
  useUpdateLabMutation,
  useUpdateLessonMutation,
  useUpdateQuizMutation,
  useUploadFileMutation,
  useUploadThumbnailMutation,
} from "../../service/api";
import { Course, CourseUpdateRequest } from "../../types/Course";
import { FileUpload } from "../../types/Curiculum";
import { LabUpdateRequest } from "../../types/Lab";
import { LessonUpdateRequest, QuizUpdateRequest } from "../../types/Lesson";
import InputURL from "../CrudCoursePage/InputURL";

const EditCoursePageNew: React.FC = () => {
  const { id } = useParams();

  const { data: courseData } = useGetCourseQuery(id as string);

  const [dataCourse, setDataCourse] = useState<Course>();
  const [errorNotification, setErrorNotification] = useState(false);

  useEffect(() => {
    if (courseData) {
      setDataCourse(courseData.data);
    }
  }, [courseData]);
  console.log(courseData);
  
  const handleEditCourse = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevDataCourse: any) => ({
      ...prevDataCourse,
      [field]: value,
    }));
  };

  const handleEditLab = (
    field: string,
    indexLab: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLabs = [...newData.labs];
      updatedLabs[indexLab] = {
        ...updatedLabs[indexLab],
        [field]: value,
      };
      newData.labs = updatedLabs;
      return newData;
    });
  };

  const handleEditAssignments = (
    field: string,
    indexAssignments: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLabs = [...newData.assignments];
      updatedLabs[indexAssignments] = {
        ...updatedLabs[indexAssignments],
        [field]: value,
      };
      newData.assignments = updatedLabs;
      return newData;
    });
  };

  const handleEditLesson = (
    field: string,
    indexLesson: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        [field]: value,
      };
      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const handleEditVideo = (
    field: string,
    indexLesson: number,
    indexVideo: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];
      const updatedVideos = [...updatedLessons[indexLesson].videos];
      updatedVideos[indexVideo] = {
        ...updatedVideos[indexVideo],
        [field]: value,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        videos: updatedVideos,
      };

      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const handleEditVideoDuration = (
    field: string,
    indexLesson: number,
    indexVideo: number,
    value: string
  ) => {
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];
      const updatedVideos = [...updatedLessons[indexLesson].videos];
      updatedVideos[indexVideo] = {
        ...updatedVideos[indexVideo],
        [field]: value,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        videos: updatedVideos,
      };

      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const handleEditQuiz = (
    field: string,
    indexLesson: number,
    indexQuiz: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];
      const updatedQuizs = [...updatedLessons[indexLesson].quizs];
      updatedQuizs[indexQuiz] = {
        ...updatedQuizs[indexQuiz],
        [field]: value,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        quizs: updatedQuizs,
      };

      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const handleEditQuestion = (
    field: string,
    indexLesson: number,
    indexQuiz: number,
    indexQuestion: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];

      const updatedQuestions = [
        ...updatedLessons[indexLesson].quizs[indexQuiz].questions,
      ];
      updatedQuestions[indexQuestion] = {
        ...updatedQuestions[indexQuestion],
        [field]: value,
      };
      const updatedQuizs = [...updatedLessons[indexLesson].quizs];
      updatedQuizs[indexQuiz] = {
        ...updatedQuizs[indexQuiz],
        questions: updatedQuestions,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        quizs: updatedQuizs,
      };

      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const handleEditAnswer = (
    indexLesson: number,
    indexQuiz: number,
    indexQuestion: number,
    indexAnswer: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];

      const updatedAnswers = [
        ...newData.lessons[indexLesson].quizs[indexQuiz].questions[
          indexQuestion
        ].answers,
      ];
      const updatedCorrectAnswers = [
        ...newData.lessons[indexLesson].quizs[indexQuiz].questions[
          indexQuestion
        ].correctAnswer,
      ];

      if (updatedCorrectAnswers.includes(updatedAnswers[indexAnswer])) {
        const matchingIndex = updatedCorrectAnswers.indexOf(
          updatedAnswers[indexAnswer]
        );
        updatedAnswers[indexAnswer] = value;
        updatedCorrectAnswers[matchingIndex] = value;
      } else {
        updatedAnswers[indexAnswer] = value;
      }

      const updatedQuestions = [
        ...updatedLessons[indexLesson].quizs[indexQuiz].questions,
      ];
      updatedQuestions[indexQuestion] = {
        ...updatedQuestions[indexQuestion],
        answers: updatedAnswers,
        correctAnswer: updatedCorrectAnswers,
      };
      const updatedQuizs = [...updatedLessons[indexLesson].quizs];
      updatedQuizs[indexQuiz] = {
        ...updatedQuizs[indexQuiz],
        questions: updatedQuestions,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        quizs: updatedQuizs,
      };
      newData.lessons = updatedLessons;
      return newData;
    });
  };

  const [updateCourse] = useUpdateCourseMutation();
  const [updateLab] = useUpdateLabMutation();
  const [updateAssignments] = useUpdateAssignmentsMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [uploadFile] = useUploadFileMutation();
  const [uploadCurriculum] = useAddCurriculumsMutation();
  const [uploadThumbnail] = useUploadThumbnailMutation();
  const [thumbnailCourse, setThumbnailCourse] = useState<FileList>();
  const [multipleCurriculums, setMultipleCurriculums] = useState<File[]>([]);
  const handleFileThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnailCourse(e.target.files);
    }
  };

  const updateArrCurriculums = async (
    courseUpdate: Course,
    newCurriculums?: FileUpload[]
  ) => {
    if (multipleCurriculums && multipleCurriculums.length > 0) {
      const filteredCurriculums = courseUpdate.curriculums.filter((item) =>
        multipleCurriculums.some((c) => c.name === item.originalname)
      );

      const filteredIds = filteredCurriculums.map((item) => item._id);
      const updateCurriculums: string[] = [];
      filteredIds.map((c) => updateCurriculums.push(c));
      newCurriculums?.map(async (file) => {
        const newFile = {
          originalname: file.originalname,
          filename: file.filename,
          size: file.size,
          type: file.mimetype,
        };
        const res = await uploadCurriculum(newFile).unwrap();
        if (res.data._id) {
          updateCurriculums.push(res.data._id);
        }
      });
      return updateCurriculums;
    }
  };

  const handleUpdateCourse = async (
    courseUpdate: Course,
    thumbnail?: string,
    newCurriculums?: FileUpload[]
  ) => {
    const updateCurriculums = await updateArrCurriculums(
      courseUpdate,
      newCurriculums
    );

    const request: CourseUpdateRequest = {
      title: courseUpdate.title,
      description: courseUpdate.description,
    };
    if (thumbnail) {
      request.thumbnail = thumbnail;
    }
    request.curriculums = updateCurriculums;

    setTimeout(async () => {
      const updateCourseResponse = await updateCourse({
        body: request,
        id: courseUpdate._id,
      }).unwrap();

      if (updateCourseResponse.statusCode !== 200) {
        setErrorNotification(true);
      }
    }, 1000);
  };

  const handleUpdateLabs = async (courseUpdate: Course) => {
    courseUpdate.labs?.map(async (lab) => {
      const request: LabUpdateRequest = {
        title: lab.title,
        description: lab.description,
      };

      const updateLabResponse = await updateLab({
        body: request,
        id: lab._id,
      }).unwrap();
      if (updateLabResponse.statusCode !== 200) {
        setErrorNotification(true);
      }
    });
  };

  const handleUpdateAssignments = async (courseUpdate: Course) => {
    courseUpdate.assignments?.map(async (assi) => {
      const request: LabUpdateRequest = {
        title: assi.title,
        description: assi.description,
      };

      const updateAssignmentsResponse = await updateAssignments({
        body: request,
        id: assi._id,
      }).unwrap();
      console.log(updateAssignmentsResponse);
      
      if (updateAssignmentsResponse.statusCode !== 200) {
        setErrorNotification(true);
      }
    });
  };

  const handleUpdateLessons = async (courseUpdate: Course) => {
    courseUpdate?.lessons?.map(async (lesson) => {
      const request: LessonUpdateRequest = {
        title: lesson.title,
        description: lesson.description,
        videos: lesson.videos,
      };

      const updateLessonResponse = await updateLesson({
        body: request,
        id: lesson._id,
      }).unwrap();
      if (updateLessonResponse.statusCode !== 200) {
        setErrorNotification(true);
      }
      lesson?.quizs?.map(async (quiz) => {
        const request: QuizUpdateRequest = {
          title: quiz.title,
          description: quiz.description,
          questions: quiz.questions,
        };

        const updateQuizResponse = await updateQuiz({
          body: request,
          id: quiz._id,
        }).unwrap();
        if (updateQuizResponse.statusCode !== 200) {
          setErrorNotification(true);
        }
      });
    });
  };

  const handleEditThumnail = (filename: string) => {
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      newData.thumbnail = filename;
      return newData;
    });
  };

  const handleUpdateThumnail = async () => {
    if (thumbnailCourse && thumbnailCourse.length > 0) {
      const formData = new FormData();
      formData.append("image", thumbnailCourse[0]);
      const reponse = await uploadThumbnail(formData).unwrap();
      if (reponse.statusCode == 200) {
        handleEditThumnail(reponse.data.filename);
        return reponse.data.filename;
      }
    }
  };

  const handleFileData = (files: File[]) => {
    setMultipleCurriculums(files);
  };

  const handleUpdateCurriculum = async (courseUpdate: Course) => {
    const formData = new FormData();
    if (multipleCurriculums && multipleCurriculums.length > 0) {
      const arrCurriculums = courseUpdate?.curriculums?.map(
        (c) => c.originalname
      );
      multipleCurriculums.forEach((file) => {
        if (!arrCurriculums.includes(file.name)) {
          formData.append(`curriculums`, file);
        }
      });

      const reponse = await uploadFile(formData).unwrap();
      if (reponse.statusCode == 200) {
        return reponse.data;
      }
    }
  };

  const handleSubmit = async () => {
    if (dataCourse) {
      const newThumnail = await handleUpdateThumnail();
      const newCurriculums = await handleUpdateCurriculum(dataCourse);

      await handleUpdateCourse(dataCourse, newThumnail, newCurriculums);
      await handleUpdateLabs(dataCourse);
      await handleUpdateAssignments(dataCourse);
      await handleUpdateLessons(dataCourse);

      if (errorNotification) {
        toast.error("Sửa Khóa học thất bại");
        setErrorNotification(false);
      } else {
        toast.success("Sửa Khóa học thành công");
      }
    }
  };

  const handleCheckBox = (
    indexLesson: number,
    indexQuiz: number,
    indexQuestion: number,
    indexAnswer: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setDataCourse((prevData: any) => {
      const newData: Course = { ...prevData };
      const updatedLessons = [...newData.lessons];

      const updatedAnswers = [
        ...newData.lessons[indexLesson].quizs[indexQuiz].questions[
          indexQuestion
        ].answers,
      ];
      const updatedCorrectAnswers = [
        ...newData.lessons[indexLesson].quizs[indexQuiz].questions[
          indexQuestion
        ].correctAnswer,
      ];

      if (checked) {
        if (!updatedCorrectAnswers.includes(updatedAnswers[indexAnswer])) {
          updatedCorrectAnswers.push(updatedAnswers[indexAnswer]);
        }
      } else {
        const index = updatedCorrectAnswers.indexOf(
          updatedAnswers[indexAnswer]
        );
        if (index !== -1) {
          updatedCorrectAnswers.splice(index, 1);
        }
      }

      const updatedQuestions = [
        ...updatedLessons[indexLesson].quizs[indexQuiz].questions,
      ];
      updatedQuestions[indexQuestion] = {
        ...updatedQuestions[indexQuestion],
        answers: updatedAnswers,
        correctAnswer: updatedCorrectAnswers,
      };
      const updatedQuizs = [...updatedLessons[indexLesson].quizs];
      updatedQuizs[indexQuiz] = {
        ...updatedQuizs[indexQuiz],
        questions: updatedQuestions,
      };
      updatedLessons[indexLesson] = {
        ...updatedLessons[indexLesson],
        quizs: updatedQuizs,
      };
      newData.lessons = updatedLessons;
      return newData;
    });
  };

  return (
    <>
      {courseData && courseData.data && (
        <>
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-4xl font-semibold leading-7 text-gray-900 ">
                Thông tin khóa học
              </h1>
              <div className="flex space-x-2">
                <Link to={"/list-course"}>
                  <button
                    type="button"
                    className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 hover:bg-red-900 hover:text-white"
                  >
                    Huỷ
                  </button>
                </Link>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={async () => {
                    await handleSubmit();
                  }}
                >
                  Sửa
                </button>
              </div>
            </div>

            <div className="mb-3">
              <Input
                color="purple"
                label="Tên môn học"
                title="title"
                name="title"
                defaultValue={courseData.data?.title}
                onChange={(e) => {
                  handleEditCourse("title", e);
                }}
                placeholder=""
                crossOrigin={undefined}
              />
            </div>
            <div className="mb-3">
              <Textarea
                color="purple"
                label="Mô tả môn học"
                name="description"
                onChange={(e) => {
                  handleEditCourse("description", e);
                }}
                defaultValue={courseData.data?.description}
                title="description"
              />
            </div>
            <div className="mb-3">
              <FileInput
                id="file-upload"
                name="thumbnail"
                title="thumbnail"
                onChange={(e) => handleFileThumbnail(e)}
              />
            </div>
            <div className="flex justify-center">
              <img
                width={"200px"}
                height={"100px"}
                src={`${urlUpload}/images/${courseData.data?.thumbnail}`}
                alt="Thumbnail"
              />
            </div>
          </div>
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <MultipleFileEdit
              onFileData={(files) => {
                handleFileData(files);
              }}
              curriculumData={courseData.data?.curriculums || []}
            />
          </div>
          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              Lab
            </h1>

            {courseData.data?.labs?.map((lab, indexLab) => (
              <div className="mb-3" key={lab?._id}>
                <div className="border-b border-gray-900/10 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold leading-7 text-gray-900">
                        Lab {indexLab + 1}
                      </h3>
                    </div>
                    <div className="mb-2">
                      <Input
                        color="purple"
                        label="Tiêu đề"
                        name="title"
                        onChange={(e) => {
                          handleEditLab("title", indexLab, e);
                        }}
                        defaultValue={lab?.title}
                        crossOrigin={undefined}
                        placeholder=""
                      />
                    </div>
                    <div className="mb-4">
                      <Textarea
                        color="purple"
                        label="Mô tả"
                        onChange={(e) => {
                          handleEditLab("description", indexLab, e);
                        }}
                        defaultValue={lab?.description}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
            Assignments
            </h1>

            {courseData.data?.assignments?.map((assi, indexAssignments) => (
              <div className="mb-3" key={assi?._id}>
                <div className="border-b border-gray-900/10 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold leading-7 text-gray-900">
                      Assignments {indexAssignments + 1}
                      </h3>
                    </div>
                    <div className="mb-2">
                      <Input
                        color="purple"
                        label="Tiêu đề"
                        name="title"
                        onChange={(e) => {
                          handleEditAssignments("title", indexAssignments, e);
                        }}
                        defaultValue={assi?.title}
                        crossOrigin={undefined}
                        placeholder=""
                      />
                    </div>
                    <div className="mb-4">
                      <Textarea
                        color="purple"
                        label="Mô tả"
                        onChange={(e) => {
                          handleEditAssignments("description", indexAssignments, e);
                        }}
                        defaultValue={assi?.description}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <form>
              <div className="border-b border-gray-900/10 pb-4">
                <h1 className="text-2xl font-semibold leading-7 text-gray-900">
                  Bài học
                </h1>

                {courseData.data?.lessons?.map((lesson, indexLesson) => (
                  <div className="mb-3" key={lesson?._id}>
                    <div className="border-b-2 border-gray-900 mb-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center cursor-pointer mb-2">
                            <h3 className="text-xl font-semibold leading-7 text-gray-900">
                              Bài học {indexLesson + 1}
                            </h3>
                            {/* <ChevronUpIcon className="w-6 h-6 ml-2 text-gray-600" />
                          <ChevronDownIcon className="w-6 h-6 ml-2 text-gray-600" /> */}
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">
                            <Input
                              color="purple"
                              label="Tiêu đề"
                              name="title"
                              defaultValue={lesson?.title}
                              onChange={(e) => {
                                handleEditLesson("title", indexLesson, e);
                              }}
                              crossOrigin={undefined}
                              placeholder=""
                            />
                          </div>
                          <div className="mb-4">
                            <Textarea
                              color="purple"
                              onChange={(e) => {
                                handleEditLesson("description", indexLesson, e);
                              }}
                              defaultValue={lesson?.description}
                              label="Mô tả"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="border-b border-gray-900/10 mb-4">
                          {lesson?.quizs?.map((quiz, indexQuiz) => (
                            <div key={quiz._id}>
                              <div className="text-2xl font-semibold leading-7 text-gray-900 mb-2">
                                <h2>Quiz {indexQuiz + 1}</h2>
                              </div>
                              <div className="space-x-2 text-xl font-semibold leading-7 text-gray-900 mb-2">
                                <div>
                                  <div className="mb-3">
                                    <Input
                                      color="purple"
                                      label="Tiêu đề"
                                      defaultValue={quiz?.title}
                                      onChange={(e) => {
                                        handleEditQuiz(
                                          "title",
                                          indexLesson,
                                          indexQuiz,
                                          e
                                        );
                                      }}
                                      crossOrigin={undefined}
                                      placeholder=""
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <Textarea
                                      color="purple"
                                      label="Mô tả"
                                      defaultValue={quiz?.description}
                                      onChange={(e) => {
                                        handleEditQuiz(
                                          "description",
                                          indexLesson,
                                          indexQuiz,
                                          e
                                        );
                                      }}
                                      placeholder=""
                                    />
                                  </div>
                                </div>
                              </div>
                              <div>
                                {quiz?.questions?.map(
                                  (question, indexQuestion) => (
                                    <div key={question?._id}>
                                      <div className="flex items-center justify-between space-x-2 text-xl leading-7 text-gray-900 mb-2">
                                        <h2>Câu hỏi {indexQuestion + 1}</h2>
                                      </div>
                                      <div className="mb-3">
                                        <Input
                                          color="purple"
                                          label="Câu hỏi"
                                          defaultValue={question?.question}
                                          onChange={(e) => {
                                            handleEditQuestion(
                                              "question",
                                              indexLesson,
                                              indexQuiz,
                                              indexQuestion,
                                              e
                                            );
                                          }}
                                          crossOrigin={undefined}
                                          placeholder=""
                                        />
                                      </div>
                                      {question?.answers?.map(
                                        (answer, indexAnswer) => (
                                          <div key={answer}>
                                            <div
                                              className={`sm:col-span-6 flex items-center mb-2`}
                                            >
                                              <Checkbox
                                                color="purple"
                                                onChange={(e) => {
                                                  handleCheckBox(
                                                    indexLesson,
                                                    indexQuiz,
                                                    indexQuestion,
                                                    indexAnswer,
                                                    e
                                                  );
                                                }}
                                                defaultChecked={question?.correctAnswer?.includes(
                                                  answer
                                                )}
                                                crossOrigin={undefined}
                                              />
                                              <Input
                                                color="purple"
                                                label="Đáp án"
                                                crossOrigin={undefined}
                                                defaultValue={answer}
                                                onChange={(e) => {
                                                  handleEditAnswer(
                                                    indexLesson,
                                                    indexQuiz,
                                                    indexQuestion,
                                                    indexAnswer,
                                                    e
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 text-xl font-semibold leading-7 text-gray-900 mb-2">
                          <h2>Video</h2>
                        </div>
                        {lesson?.videos?.map((video, indexVideo) => (
                          <div key={video?._id}>
                            <div className="flex items-center space-x-2 text-xl leading-7 text-gray-900 mb-2">
                              <h2>Video</h2>
                            </div>
                            <div className="grid grid-rows-2 grid-flow-col gap-x-6 mb-6">
                              <div className="col-span-12">
                                <div className="mt-2">
                                  <Input
                                    color="purple"
                                    label="Tên video"
                                    defaultValue={video?.title}
                                    crossOrigin={undefined}
                                    onChange={(e) => {
                                      handleEditVideo(
                                        "title",
                                        indexLesson,
                                        indexVideo,
                                        e
                                      );
                                    }}
                                    placeholder=""
                                  />
                                </div>
                              </div>
                              <InputURL
                                onChange={(e, duration) => {
                                  handleEditVideo(
                                    "urlVideo",
                                    indexLesson,
                                    indexVideo,
                                    e
                                  );
                                  handleEditVideoDuration(
                                    "duration",
                                    indexLesson,
                                    indexVideo,
                                    duration
                                  );
                                }}
                                video={video}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
            <div className="flex space-x-2 justify-end mt-6">
              <div className="flex space-x-2">
                <Link to={"/list-course"}>
                  <button
                    type="button"
                    className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 hover:bg-red-900 hover:text-white"
                  >
                    Huỷ
                  </button>
                </Link>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={async () => {
                    await handleSubmit();
                  }}
                >
                  Sửa
                </button>
              </div>
            </div>{" "}
          </div>
        </>
      )}
    </>
  );
};

export default EditCoursePageNew;
