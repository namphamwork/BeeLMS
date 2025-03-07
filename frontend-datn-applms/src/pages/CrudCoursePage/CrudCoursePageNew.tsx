import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Checkbox, Input, Textarea } from "@material-tailwind/react";
import { FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultipleFile from "../../components/MultipleFile/MultipleFile";
import {
  useAddCourseMutation,
  useUploadFileMutation,
  useUploadThumbnailMutation,
} from "../../service/api";
import InputURL from "./InputURL";
import { Link, useNavigate } from "react-router-dom";
export interface CourseType {
  title: string;
  description: string;
  thumbnail: string;
  lessons: {
    title: string;
    description: string;
    videos: {
      title: string;
      urlVideo: string;
      duration: string;
    }[];
    quizs: {
      title: string;
      description: string;
      questions: {
        question: string;
        answers: string[];
        correctAnswer: string[];
      }[];
    }[];
  }[];
  labs: {
    title: string;
    description: string;
  }[];
  assignments: {
    title: string;
    description: string;
  }[];
  curriculums: {
    originalname: string;
    filename: string;
    size: number;
    type: string;
  }[];
}

const CrudCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CourseType>({
    title: "",
    description: "",
    thumbnail: "",
    lessons: [
      {
        title: "",
        description: "",
        videos: [
          {
            title: "",
            urlVideo: "",
            duration: "",
          },
        ],
        quizs: [
          {
            title: "",
            description: "",
            questions: [
              {
                question: "",
                answers: [""],
                correctAnswer: [],
              },
            ],
          },
        ],
      },
    ],
    labs: [
      {
        title: "",
        description: "",
      },
    ],
    assignments: [
      {
        title: "",
        description: "",
      },
    ],
    curriculums: [],
  });

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const updateVideoDurationField = (
    value: string,
    lessonIndex: number,
    videoIndex: number
  ) => {
    const updatedData = { ...formData };
    updatedData.lessons[lessonIndex].videos[videoIndex]["duration"] = value;
    setFormData(updatedData);
  };

  const updateLessonVideoField = (
    newData: CourseType,
    value: string,
    lessonIndex: number,
    videoIndex: number,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (field === "urlVideo" || field === "title") {
      updatedData.lessons[lessonIndex].videos[videoIndex][field] = value;
    }
    return updatedData;
  };
  const updateQuizQuestionAnswerField = (
    newData: CourseType,
    value: string,
    lessonIndex: number,
    quizIndex: number,
    questionIndex: number,
    answerIndex: number | undefined,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (answerIndex !== undefined) {
      updatedData.lessons[lessonIndex].quizs[quizIndex].questions[
        questionIndex
      ].answers[answerIndex] = value;
    } else {
      if (field === "question") {
        updatedData.lessons[lessonIndex].quizs[quizIndex].questions[
          questionIndex
        ][field] = value;
      }
    }
    return updatedData;
  };

  interface Answer {
    lessonIndex: number;
    quizIndex: number;
    questionIndex: number;
    answerIndex: number;
  }

  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const handleCheckBox = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    lessonIndex: number,
    quizIndex: number,
    questionIndex: number,
    answerIndex: number
  ): void => {
    const target = e.target as HTMLInputElement;
    const isChecked = target.checked;

    if (isChecked) {
      const newAnswer: Answer = {
        lessonIndex,
        quizIndex,
        questionIndex,
        answerIndex,
      };
      setSelectedAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    } else {
      const existingIndex = selectedAnswers.findIndex(
        (answer) =>
          answer.lessonIndex === lessonIndex &&
          answer.quizIndex === quizIndex &&
          answer.questionIndex === questionIndex &&
          answer.answerIndex === answerIndex
      );

      if (existingIndex !== -1) {
        setSelectedAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers.splice(existingIndex, 1);
          return updatedAnswers;
        });
      }
    }
  };

  const resetCorrectAnswers = () => {
    setFormData((prevData) => {
      const newData = { ...prevData };

      newData.lessons = newData.lessons.map((lesson) => {
        lesson.quizs = lesson.quizs.map((quiz) => {
          quiz.questions = quiz.questions.map((question) => {
            question.correctAnswer = [];
            return question;
          });
          return quiz;
        });
        return lesson;
      });
      return newData;
    });
  };

  const updatedCorrectAnswer = () => {

    resetCorrectAnswers();
    selectedAnswers.forEach((item: Answer) => {
      setFormData((prevData) => {
        const newData = { ...prevData };
        const correctAnswer =
          newData.lessons[item.lessonIndex].quizs[item.quizIndex].questions[
            item.questionIndex
          ].correctAnswer;
        const dataAnswer =
          newData.lessons[item.lessonIndex].quizs[item.quizIndex].questions[
            item.questionIndex
          ].answers[item.answerIndex];
        if (!correctAnswer.includes(dataAnswer)) {
          correctAnswer.push(dataAnswer);
        }
 
        return newData;
      });
     
    });
  };

  const updateQuizField = (
    newData: CourseType,
    value: string,
    lessonIndex: number,
    quizIndex: number,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (field === "title" || field === "description") {
      updatedData.lessons[lessonIndex].quizs[quizIndex][field] = value;
    }

    return updatedData;
  };

  const updateLessonField = (
    newData: CourseType,
    value: string,
    lessonIndex: number,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (field === "title" || field === "description") {
      updatedData.lessons[lessonIndex][field] = value;
    }
    return updatedData;
  };

  const updateLabField = (
    newData: CourseType,
    value: string,
    labIndex: number,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (field === "title" || field === "description") {
      updatedData.labs[labIndex][field] = value;
    }
    return updatedData;
  };

  const updateAssignmentsField = (
    newData: CourseType,
    value: string,
    assignmentsIndex: number,
    field?: string
  ): CourseType => {
    const updatedData = { ...newData };
    if (field === "title" || field === "description") {
      updatedData.assignments[assignmentsIndex][field] = value;
    }
    return updatedData;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    lessonIndex?: number,
    quizIndex?: number,
    questionIndex?: number,
    answerIndex?: number,
    labIndex?: number,
    assignmentsIndex?: number,
    videoIndex?: number
  ) => {
    const { value } = e.target;
    setFormData((prevData) => {
      let newData = { ...prevData };

      if (lessonIndex !== undefined) {
        if (videoIndex !== undefined) {
          newData = updateLessonVideoField(
            newData,
            value,
            lessonIndex,
            videoIndex,
            field
          );
        } else if (quizIndex !== undefined) {
          if (questionIndex !== undefined) {
            newData = updateQuizQuestionAnswerField(
              newData,
              value,
              lessonIndex,
              quizIndex,
              questionIndex,
              answerIndex,
              field
            );
          } else {
            newData = updateQuizField(
              newData,
              value,
              lessonIndex,
              quizIndex,
              field
            );
          }
        } else {
          newData = updateLessonField(newData, value, lessonIndex, field);
        }
      } else if (labIndex !== undefined) {
        newData = updateLabField(newData, value, labIndex, field);
      } else if (assignmentsIndex !== undefined) {
        newData = updateAssignmentsField(newData, value, assignmentsIndex, field);
      } else {
        newData = { ...newData, [e.target.name]: value };
      }
      return newData;
    });
  };

  const [addCours] = useAddCourseMutation();
  const [uploadFile] = useUploadFileMutation();
  const [uploadThumbnail] = useUploadThumbnailMutation();
  const [multipleCurriculums, setMultipleCurriculums] = useState<File[]>([]);
  const [thumbnailCourse, setThumbnailCourse] = useState<FileList>();
  const handleFileData = (files: File[]) => {
    setMultipleCurriculums(files);
  };

  const handleFileThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnailCourse(e.target.files);
    }
  };
  const handleSubmit = async () => {
 
    await updatedCorrectAnswer();

    // Upload curriculums
    const formData1 = new FormData();
    if (multipleCurriculums && multipleCurriculums.length > 0) {
      multipleCurriculums.forEach((file) => {
        formData1.append(`curriculums`, file);
      });
      // console.log(multipleCurriculums);
    }
    // Upload thumbnail
    const formData2 = new FormData();
    if (thumbnailCourse && thumbnailCourse.length > 0) {
      formData2.append("image", thumbnailCourse[0]);
      // console.log(thumbnailCourse);
    }

    if (
      thumbnailCourse &&
      thumbnailCourse.length > 0 &&
      multipleCurriculums &&
      multipleCurriculums.length > 0
    ) {
      
      const [response1, response2] = await Promise.all([
        uploadFile(formData1).unwrap(),
        uploadThumbnail(formData2).unwrap(),
      ]);
      // console.log({response2});
      // console.log("OK") 
      try {
        if (response1?.data.length > 0) {
          const uploadedCurriculums = await response1.data.map(
            (curriculum: any) => {
              return {
                originalname: curriculum.originalname,
                filename: curriculum.filename,
                size: curriculum.size,
                type: curriculum.mimetype,
              };
            }
          );
          const newFormData = { ...formData };
          newFormData.thumbnail = response2.data.filename;
          newFormData.curriculums = uploadedCurriculums;
          setFormData(newFormData);
      
          const result = await addCours(newFormData).unwrap();
          if (result.statusCode === 201) {
            toast.success("addCours successfully");
            navigate("/list-course");
          } else {
            toast.error("Adding Cours failed ");
          }
        } else {
          toast.error("Error while addCours. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleAddAnswer = (
    lessonIndex: number,
    quizIndex: number,
    questionIndex: number
  ) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons[lessonIndex].quizs[quizIndex].questions[
      questionIndex
    ].answers.push("");
    setFormData(updatedCourse);
  };

  const handleDeleteAnswer = (
    lessonIndex: number,
    quizIndex: number,
    questionIndex: number,
    answerIndex: number
  ) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons[lessonIndex].quizs[quizIndex].questions[
      questionIndex
    ].answers.splice(answerIndex, 1);
    setFormData(updatedCourse);
  };

  const handleAddQuestion = (lessonIndex: number, quizIndex: number) => {
    const updatedCourse = { ...formData };
    const newQuestion = {
      question: "",
      answers: [""],
      correctAnswer: [],
    };
    updatedCourse.lessons[lessonIndex].quizs[quizIndex].questions.push(
      newQuestion
    );
    setFormData(updatedCourse);
  };

  const handleDeleteQuestion = (
    lessonIndex: number,
    quizIndex: number,
    questionIndex: number
  ) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons[lessonIndex].quizs[quizIndex].questions.splice(
      questionIndex,
      1
    );
    setFormData(updatedCourse);
  };

  const handleAddQuiz = (lessonIndex: number) => {
    const updatedCourse = { ...formData };
    const newQuiz = {
      title: "",
      description: "",
      questions: [],
    };
    updatedCourse.lessons[lessonIndex].quizs.push(newQuiz);
    setFormData(updatedCourse);
  };

  const handleDeleteQuiz = (lessonIndex: number, quizIndex: number) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons[lessonIndex].quizs.splice(quizIndex, 1);
    setFormData(updatedCourse);
  };

  const handleAddVideo = (lessonIndex: number) => {
    const updatedCourse = { ...formData };
    const newVideo = {
      title: "",
      urlVideo: "",
      duration: "",
    };
    updatedCourse.lessons[lessonIndex].videos.push(newVideo);
    setFormData(updatedCourse);
  };

  const handleDeleteVideo = (lessonIndex: number, videoIndex: number) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons[lessonIndex].videos.splice(videoIndex, 1);
    setFormData(updatedCourse);
  };

  const handleAddLesson = () => {
    const updatedCourse = { ...formData };
    const newLesson = {
      title: "",
      description: "",
      videos: [],
      quizs: [],
    };
    updatedCourse.lessons.push(newLesson);
    setFormData(updatedCourse);
  };

  const handleDeleteLesson = (lessonIndex: number) => {
    const updatedCourse = { ...formData };
    updatedCourse.lessons.splice(lessonIndex, 1);
    setFormData(updatedCourse);
  };

  const handleAddLab = () => {
    const updatedCourse = { ...formData };
    const newLab = {
      title: "",
      description: "",
    };
    updatedCourse.labs.push(newLab);
    setFormData(updatedCourse);
  };

  const handleDeleteLab = (labIndex: number) => {
    const updatedCourse = { ...formData };
    updatedCourse.labs.splice(labIndex, 1);
    setFormData(updatedCourse);
  };

  
  const handleAddAssignments = () => {
    const updatedCourse = { ...formData };
    const newAssignments = {
      title: "",
      description: "",
    };
    updatedCourse.assignments.push(newAssignments);
    setFormData(updatedCourse);
  };

  const handleDeleteAssignments = (assignmentsIndex: number) => {
    const updatedCourse = { ...formData };
    updatedCourse.assignments.splice(assignmentsIndex, 1);
    setFormData(updatedCourse);
  };

  return (
    <>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <div className="mb-2 flex justify-between items-center">
          <h1 className=" text-4xl font-semibold leading-7 text-gray-900 ">
            Thông tin khóa học
          </h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 hover:bg-red-900 hover:text-white"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tạo mới
            </button>
          </div>
        </div>

        <div className="mb-3">
          <Input
            color="purple"
            label="Tên môn học"
            title="title"
            name="title"
            onChange={(e) => handleInputChange(e, "title")}
            placeholder=""
            crossOrigin={undefined}
          />
        </div>
        <div className="mb-3">
          <Textarea
            color="purple"
            label="Mô tả môn học"
            name="description"
            title="description"
            onChange={(e) => handleInputChange(e, "description")}
          />
        </div>
        <Label htmlFor="file-upload" value="Upload file" />
        <FileInput
          id="file-upload"
          name="thumbnail"
          title="thumbnail"
          onChange={(e) => handleFileThumbnail(e)}
        />
      </div>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <MultipleFile onFileData={handleFileData} />
      </div>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">Lab</h1>

        <div className="mb-3">
          {formData.labs.map((lab, labIndex) => (
            <div key={labIndex} className="border-b border-gray-900/10 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                  Lab {labIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteLab(labIndex);
                  }}
                  className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "red", fontSize: "30px" }}
                  />
                </button>
              </div>
              <div className="mb-2">
                <Input
                  color="purple"
                  label="Tiêu đề"
                  name="title"
                  defaultValue={lab.title}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "title",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      labIndex
                    )
                  }
                  crossOrigin={undefined}
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <Textarea
                  color="purple"
                  defaultValue={lab.description}
                  label="Mô tả"
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "description",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      labIndex
                    )
                  }
                  placeholder=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              handleAddLab();
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Thêm Lab
          </button>
        </div>
      </div>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">Assignments</h1>

        <div className="mb-3">
          {formData.assignments.map((assi, assignmentsIndex) => (
            <div key={assignmentsIndex} className="border-b border-gray-900/10 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">
                Assignments {assignmentsIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteAssignments(assignmentsIndex);
                  }}
                  className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "red", fontSize: "30px" }}
                  />
                </button>
              </div>
              <div className="mb-2">
                <Input
                  color="purple"
                  label="Tiêu đề"
                  name="title"
                  defaultValue={assi.title}
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "title",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      assignmentsIndex
                    )
                  }
                  crossOrigin={undefined}
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <Textarea
                  color="purple"
                  defaultValue={assi.description}
                  label="Mô tả"
                  onChange={(e) =>
                    handleInputChange(
                      e,
                      "description",
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      undefined,
                      assignmentsIndex
                    )
                  }
                  placeholder=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              handleAddAssignments();
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Thêm Assignments
          </button>
        </div>
      </div>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <form>
          <div className="border-b border-gray-900/10 pb-4">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              Bài học
            </h1>

            <div className="mb-3">
              {formData.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="border-b-2 border-gray-900 mb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center cursor-pointer mb-2">
                      <h3 className="text-xl font-semibold leading-7 text-gray-900">
                        Bài học {lessonIndex + 1}
                      </h3>
                      <ChevronUpIcon className="w-6 h-6 ml-2 text-gray-600" />
                      <ChevronDownIcon className="w-6 h-6 ml-2 text-gray-600" />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteLesson(lessonIndex);
                      }}
                      className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{ color: "red", fontSize: "30px" }}
                      />
                    </button>
                  </div>

                  <div className="mb-3">
                    <Input
                      color="purple"
                      label="Tiêu đề"
                      name="title"
                      defaultValue={lesson.title}
                      onChange={(e) =>
                        handleInputChange(e, "title", lessonIndex)
                      }
                      crossOrigin={undefined}
                      placeholder=""
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      color="purple"
                      defaultValue={lesson.description}
                      label="Mô tả"
                      onChange={(e) =>
                        handleInputChange(e, "description", lessonIndex)
                      }
                      placeholder=""
                    />
                  </div>
                  <div className="border-b border-gray-900/10 mb-4">
                    <div className="text-2xl font-semibold leading-7 text-gray-900 mb-2">
                      <h2>Quiz</h2>
                    </div>
                    {lesson.quizs.map((quiz, quizIndex) => (
                      <div key={quizIndex}>
                        <div className="flex items-center justify-between space-x-2 text-xl font-semibold leading-7 text-gray-900 mb-2">
                          <div className="flex items-center space-x-2">
                            <h2>Quiz {quizIndex + 1}</h2>
                            <button
                              type="button"
                              onClick={() => {
                                handleAddQuestion(lessonIndex, quizIndex);
                              }}
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Thêm câu hỏi
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteQuiz(lessonIndex, quizIndex);
                            }}
                            className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                          >
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              style={{ color: "red", fontSize: "30px" }}
                            />
                          </button>
                        </div>
                        <div className="mb-3">
                          <Input
                            color="purple"
                            label="Tiêu đề"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "title",
                                lessonIndex,
                                quizIndex
                              )
                            }
                            crossOrigin={undefined}
                            placeholder=""
                          />
                        </div>
                        <div className="mb-4">
                          <Textarea
                            color="purple"
                            label="Mô tả"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                "description",
                                lessonIndex,
                                quizIndex
                              )
                            }
                            placeholder=""
                          />
                        </div>
                        {quiz.questions.map((question, questionIndex) => (
                          <div key={questionIndex}>
                            <div className="flex items-center justify-between space-x-2 text-xl leading-7 text-gray-900 mb-2">
                              <h2>Câu hỏi {questionIndex + 1}</h2>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDeleteQuestion(
                                    lessonIndex,
                                    quizIndex,
                                    questionIndex
                                  );
                                }}
                                className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                              >
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  style={{ color: "red", fontSize: "30px" }}
                                />
                              </button>
                            </div>
                            <div className="mb-3">
                              <Input
                                color="purple"
                                label="Câu hỏi"
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    "question",
                                    lessonIndex,
                                    quizIndex,
                                    questionIndex
                                  )
                                }
                                crossOrigin={undefined}
                                placeholder=""
                              />
                            </div>
                            {question.answers.map((answer, answerIndex) => (
                              <div key={answerIndex}>
                                <div
                                  className={`sm: col - span - 6 flex items - center mb - 2`}
                                >
                                  <Checkbox
                                    color="purple"
                                    crossOrigin={undefined}
                                    onClick={(e) =>
                                      handleCheckBox(
                                        e,
                                        lessonIndex,
                                        quizIndex,
                                        questionIndex,
                                        answerIndex
                                      )
                                    }
                                  />
                                  <Input
                                    color="purple"
                                    label={`Đáp án`}
                                    defaultValue={answer}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        "answers",
                                        lessonIndex,
                                        quizIndex,
                                        questionIndex,
                                        answerIndex
                                      )
                                    }
                                    crossOrigin={undefined}
                                    placeholder={answer}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleDeleteAnswer(
                                        lessonIndex,
                                        quizIndex,
                                        questionIndex,
                                        answerIndex
                                      );
                                    }}
                                    className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 "
                                  >
                                    <FontAwesomeIcon
                                      icon={faCircleXmark}
                                      style={{ color: "red", fontSize: "30px" }}
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-end mb-3">
                              <button
                                type="button"
                                onClick={() => {
                                  handleAddAnswer(
                                    lessonIndex,
                                    quizIndex,
                                    questionIndex
                                  );
                                }}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Thêm đáp án
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleAddQuiz(lessonIndex);
                      }}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Thêm quiz
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 text-xl font-semibold leading-7 text-gray-900 mb-2">
                    <h2>Video</h2>
                    <button
                      type="button"
                      onClick={() => {
                        handleAddVideo(lessonIndex);
                      }}
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Thêm video
                    </button>
                  </div>
                  {lesson.videos.map((video, videoIndex) => (
                    <div key={videoIndex}>
                      <div className="flex items-center space-x-2 text-xl leading-7 text-gray-900 mb-2">
                        <h2>
                          Video {video.title} {videoIndex + 1}
                        </h2>
                      </div>
                      <div className="grid grid-rows-2 grid-flow-col gap-x-6 mb-6">
                        <div className="col-span-12">
                          <div className="mt-2">
                            <Input
                              color="purple"
                              label="Tên video"
                              defaultValue={video.title}
                              crossOrigin={undefined}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  "title",
                                  lessonIndex,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  videoIndex
                                )
                              }
                              placeholder=""
                            />
                          </div>
                        </div>

                        <InputURL
                          onChange={(e, duration) => {
                            updateVideoDurationField(
                              duration,
                              lessonIndex,
                              videoIndex
                            );
                            handleInputChange(
                              e,
                              "urlVideo",
                              lessonIndex,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              videoIndex
                            );
                          }}
                        />

                        <div className="row-span-2 flex items-center">
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteVideo(lessonIndex, videoIndex);
                            }}
                            className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900"
                          >
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              style={{ color: "red", fontSize: "30px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleAddLesson();
                  }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Thêm Bài học
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="flex space-x-2 justify-end mt-6">
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
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tạo mới
          </button>
        </div>{" "}
      </div>
    </>
  );
};

export default CrudCoursePage;
