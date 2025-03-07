// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CourseResponse,
  CourseUpdateRequest,
  CoursesResponse,
} from "../types/Course";
import {
  Curriculum,
  CurriculumPost,
  CurriculumPostResponse,
  FileUploadResponse,
  FileUploadsResponse,
} from "../types/Curiculum";
import type { UsersResponse } from "../types/User";
import { CheckVideo, VideoCheck, resultVideo } from "../types/Video";
import axiosBaseQuery, { BASE_URL } from "./axiosQuery";

// import { Curriculum } from "../types/Curiculum";
import { CourseType } from "../pages/CrudCoursePage/CrudCoursePageNew";
import { Attendance } from "../types/Attendance";
import {
  CheckRoom,
  CheckRoomResponse,
  ClassroomPost,
  ClassroomPostResponse,
  ClassroomResponse,
  ClassroomsResponse,
  Marks,
  RoomsResponse,
} from "../types/Classroom";

import { GetMarksResponse, UpdateMarksResponse } from "../types/Mark";
import {  LabUpdateRequest, addResultLabRespone, getLabResponse, labResult, resultLab } from "../types/Lab";
import { LessonUpdateRequest, LessonsResponse, QuizResponse, QuizResultRequest, QuizResultResponse, QuizUpdateRequest } from "../types/Lesson";
import {  addResultAssignmentRespone, assignmentResult, getAssignmentResponse, getResultResponse, resultAssignment } from "../types/Assignment";

// Define a service using a base URL and expected endpoints
export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [
    "User",
    "Course",
    "Lesson",
    "Quiz",
    "Classroom",
    "Room",
    "CheckRoom",
    "VideoCheck",
    "QuizResult",
    "GetMarks",
    "LabResult",
    "AssignmentResult",
  ],
  endpoints: (builder) => ({
    getCourses: builder.query<CoursesResponse, void>({
      query: () => ({ url: "/courses", method: "GET" }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query<CourseResponse, string>({
      query: (id) => ({ url: `/courses/${id}`, method: "GET" }),
      providesTags: (id) => [{ type: "Course", _id: id }],
    }),
    addCourse: builder.mutation<CourseResponse, CourseType>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        data: body,
      }),
      //  invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation<
      CourseResponse,
      { id: string; body: CourseUpdateRequest }
    >({
      query: (data) => ({
        url: `/courses/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCurrilums: builder.mutation<
      FileUploadsResponse,
      { id: any; body: Curriculum[] }
    >({
      query: (data) => ({
        url: `/curriculums/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateLesson: builder.mutation<
      LessonsResponse,
      { id: string; body: LessonUpdateRequest }
    >({
      query: (data) => ({
        url: `/lessons/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateLab: builder.mutation<
      LessonsResponse,
      { id: string; body: LabUpdateRequest }
    >({
      query: (data) => ({
        url: `/labs/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateAssignments: builder.mutation<
      LessonsResponse,
      { id: string; body: LabUpdateRequest }
    >({
      query: (data) => ({
        url: `/assignments/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateQuiz: builder.mutation<
      LessonsResponse,
      { id: string; body: QuizUpdateRequest }
    >({
      query: (data) => ({
        url: `/quizs/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    addCurriculums: builder.mutation<CurriculumPostResponse, CurriculumPost>({
      query: (body) => ({
        url: "/curriculums",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Course"],
    }),
    addClassroom: builder.mutation<ClassroomPostResponse, ClassroomPost>({
      query: (body) => ({
        url: "/classrooms",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Classroom"],
    }),
    uploadFile: builder.mutation<FileUploadsResponse, FormData>({
      query: (body) => ({
        url: "/files/curriculums",
        method: "POST",
        data: body,
      }),
    }),
    uploadThumbnail: builder.mutation<FileUploadResponse, FormData>({
      query: (body) => ({
        url: "/files/image",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),
    getLessons: builder.query<LessonsResponse, void>({
      query: () => ({ url: "/lessons", method: "GET" }),
      providesTags: (result) =>
        result ? [{ type: "Lesson", _id: result }] : [],
    }),
    getQuiz: builder.query<QuizResponse, string>({
      query: (id) => ({ url: `/quizs/${id}`, method: "GET" }),
      providesTags: (id) => [{ type: "Quiz", _id: id }],
    }),
    getClassrooms: builder.query<ClassroomsResponse, void>({
      query: () => ({ url: "/classrooms", method: "GET" }),
      providesTags: ["Classroom"],
    }),
    getClassroom: builder.query<ClassroomResponse, { _id: string }>({
      query: (data) => ({
        url: `/classrooms/${data._id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Classroom", _id: id }],
    }),

    updateClassroom: builder.mutation<
      ClassroomResponse,
      { id: string; body: ClassroomPost }
    >({
      query: (data) => ({
        url: `/classrooms/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: (id) => {
        return [{ type: "Classroom", _id: id }];
      },
    }),
    updateStatusActiveClassroom: builder.mutation<
      ClassroomResponse,
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/classrooms/${id}`,
        method: "PUT",
        data: { isActive: isActive },
      }),
      invalidatesTags: (id) => {
        return [{ type: "Classroom", _id: id }];
      },
    }),
    updateStatusDeleteClassroom: builder.mutation<
      ClassroomResponse,
      { id: string; isDelete: boolean }
    >({
      query: ({ id, isDelete }) => ({
        url: `/classrooms/${id}`,
        method: "PUT",
        data: { isDelete: isDelete },
      }),
      invalidatesTags: (id) => {
        return [{ type: "Classroom", _id: id }];
      },
    }),

    deleteClassroom: builder.mutation<ClassroomResponse, string>({
      query: (id) => ({
        url: `/classrooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Classroom", id: "LIST" }],
    }),

    getMyClassrooms: builder.query<ClassroomsResponse, void>({
      query: () => ({ url: "/classrooms/myclass", method: "GET" }),
      providesTags: (result) =>
        result
          ? result?.data.map((classroom) => ({
              type: "Classroom",
              _id: classroom._id,
            }))
          : [],
    }),
    getMyClassRoom: builder.query<ClassroomResponse, string>({
      query: (id) => ({ url: `/classrooms/${id}`, method: "GET" }),
      providesTags: (id) => [{ type: "Classroom", _id: id }],
    }),
    saveAttendance: builder.mutation<
      ClassroomResponse,
      { _id: string; body: Omit<Attendance, "date"> }
    >({
      query(data) {
        return {
          url: `/classrooms/attendances/${data._id}`,
          method: "PUT",
          data: data.body,
        };
      },
      invalidatesTags: ["Classroom"],
    }),
    getAllLearns: builder.query<UsersResponse, void>({
      query: () => ({ url: "/users/leanrs", method: "GET" }),
      providesTags: (result) =>
        result ? result?.data.map(({ _id }) => ({ type: "User", _id })) : [],
    }),
    getAllInstructors: builder.query<UsersResponse, void>({
      query: () => ({ url: "/users/instructors", method: "GET" }),
      providesTags: (result) =>
        result ? result?.data.map(({ _id }) => ({ type: "User", _id })) : [],
    }),
    getAllRooms: builder.query<RoomsResponse, void>({
      query: () => ({ url: "/rooms", method: "GET" }),
      providesTags: (result) =>
        result ? result?.data.map(({ _id }) => ({ type: "Room", _id })) : [],
    }),
    getCheckRoom: builder.mutation<CheckRoomResponse, CheckRoom>({
      query: (body) => ({
        url: "/classrooms/checkroom",
        method: "POST",
        data: body,
      }),
    }),
    checkLearners: builder.mutation<UsersResponse, CheckRoom>({
      query: (body) => ({
        url: "/users/learnersEmptyClass",
        method: "POST",
        data: body,
      }),
    }),
    checkInstructors: builder.mutation<UsersResponse, CheckRoom>({
      query: (body) => ({
        url: "/users/instructorsEmptyClass",
        method: "POST",
        data: body,
      }),
    }),
    getMarkByIdClass: builder.query<GetMarksResponse, string>({
      query: (body) => ({
        url: `/classrooms/marks/${body}`,
        method: "GET",
        // data: body,
      }),
      providesTags: ["GetMarks"],
    }),
    updateMarksByIdClassroom: builder.mutation<
      UpdateMarksResponse,
      { id: string; body: Marks[] }
    >({
      query: (data) => ({
        url: `/classrooms/marks/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["GetMarks"],
    }),
    getTableForMark: builder.query<any, string>({
      query: (body) => ({
        url: `/classrooms/table-marks/${body}`,
        method: "GET",
        // data: body,
      }),
    }),
    getVideoCheck: builder.query<VideoCheck, CheckVideo>({
      query: (body) => ({
        url: "/result-videos/check",
        method: "POST",
        data: body,
      }),
      providesTags: ["VideoCheck"],
    }),
    postResultVideo: builder.mutation<VideoCheck, resultVideo>({
      query: (body) => ({
        url: "/result-videos/save",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["VideoCheck"],
    }),
    addResultQuiz: builder.mutation<QuizResultResponse, QuizResultRequest>({
      query: (data) => ({
        url: "/result-quizs/save",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["QuizResult"],
    }),
    getLab: builder.query<getLabResponse, string>({
      query: (body) => ({
        url: `/labs/${body}`,
        method: "GET",
        // data: body,
      }),
    }),
    getAssignment: builder.query<getAssignmentResponse, string>({
      query: (body) => ({
        url: `/assignments/${body}`,
        method: "GET",
        // data: body,
      }),
    }),
    addResultLab: builder.mutation<addResultLabRespone, resultLab>({
      query:(body)=> ({
        url:"/result-labs/save",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["LabResult"],
    }),
    uploadFileLab: builder.mutation<FileUploadResponse, FormData>({
      query: (body) => ({
        url: "/files/lab",
        method: "POST",
        data: body,
      }),
    }),
    addResultAssignment: builder.mutation<addResultAssignmentRespone, resultAssignment>({
      query:(body)=> ({
        url:"/result-assignments/save",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["AssignmentResult"],
    }),
    uploadFileAssignment: builder.mutation<FileUploadResponse, FormData>({
      query: (body) => ({
        url: "/files/assignment",
        method: "POST",
        data: body,
      }),
    }),
    getResultLab: builder.query<getResultResponse, labResult>({
      query: (body) =>({
        url: "/result-labs/check",
        method: "POST",
        data: body,
      }),
      providesTags: ["LabResult"],
    }),
    getResultAssignment: builder.query<getResultResponse, assignmentResult>({
      query: (body) =>({
        url: "/result-assignments/check",
        method: "POST",
        data: body,
      }),
      providesTags: ["AssignmentResult"],
    }),
  }),
});

export const {
  useUpdateMarksByIdClassroomMutation,
  useGetTableForMarkQuery,
  useGetMarkByIdClassQuery,
  useGetMyClassRoomQuery,
  useGetCourseQuery,
  useGetClassroomQuery,
  useSaveAttendanceMutation,
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useUpdateLabMutation,
  useUpdateAssignmentsMutation,
  useUpdateQuizMutation,
  useUpdateLessonMutation,
  useUpdateCurrilumsMutation,
  useAddCurriculumsMutation,
  useUpdateClassroomMutation,
  useUpdateStatusActiveClassroomMutation,
  useUpdateStatusDeleteClassroomMutation,
  useDeleteClassroomMutation,
  useAddClassroomMutation,
  useUploadFileMutation,
  useUploadThumbnailMutation,
  useGetLessonsQuery,
  useGetQuizQuery,
  useGetMyClassroomsQuery,
  useGetClassroomsQuery,
  useGetAllLearnsQuery,
  useGetAllInstructorsQuery,
  useGetAllRoomsQuery,
  useGetCheckRoomMutation,
  useCheckLearnersMutation,
  useCheckInstructorsMutation,
  useGetVideoCheckQuery,
  usePostResultVideoMutation,
  useAddResultQuizMutation,
  useGetLabQuery,
  useGetAssignmentQuery,
  useAddResultLabMutation,
  useUploadFileLabMutation,
  useAddResultAssignmentMutation,
  useUploadFileAssignmentMutation,
  useGetResultAssignmentQuery,
  useGetResultLabQuery,
} = lmsApi;
