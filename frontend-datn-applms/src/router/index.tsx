import { EmptyState } from "../components/EmptyState";
import { PATH, PATH_DEFAULT } from "../constant/config";
import AttendanceDetailPage from "../pages/AttendanceDetailPage/AttendanceDetailPage";
import AttendancePage from "../pages/AttendancePage/AttendancePage";
import ChatPage from "../pages/ChatPage/ChatPage";
import CourseDetailPage from "../pages/CourseDetailPage/CourseDetailPage";
import CrudClassRoomPage from "../pages/CrudClassRoomPage/CrudClassRoomPage";
import CrudCoursePage from "../pages/CrudCoursePage/CrudCoursePageNew";

import EditUserPage from "../pages/CrudUser/EditUserPage";
import ListUsersPage from "../pages/CrudUser/ListUsersPage";
import DashBoardPage from "../pages/DashBoardPage/DashBoardPage";
import DataClassroom from "../pages/DataList/DataClassroom";
import DataCourse from "../pages/DataList/DataCourse";
import EditCoursePageNew from "../pages/EditCoursePage/EditCoursePageNew";
import HomePage from "../pages/HomePage";
import LabPage from "../pages/Lab/Lab";

import { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import AssignmentPage from "../pages/Assigntment/Assignment";
import LearnPageNew from "../pages/LearnPage/LearnPageNew";
import LoginPage from "../pages/LoginPage/LoginPage";
import MarkDetailPage from "../pages/MarkDetail/MarkDetail";
import MarkPage from "../pages/MarkPage/MarkPage";
import MyAccountPage from "../pages/MyAccount/MyAccount";
import MyClassDetailPage from "../pages/MyClassDetailPage/MyClassDetailPage";
import PostPage from "../pages/Post";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export const MainRouter:BreadcrumbsRoute[] = [
  {
    path: PATH.index,
    element: <HomePage />,
    breadcrumb: 'Trang chủ'
  },
  {
    path: '/dashboard',
    element: <DashBoardPage />,
    breadcrumb: "Trang điều khiển",
  },
  {
    path: PATH.classroom.listclassroom,
    element: <DataClassroom />,
    breadcrumb: "Quản trị lớp học",
  },
  {
    path: PATH.classroom.myclassdetail,
    element: <MyClassDetailPage />,
    breadcrumb: "Trang lớp học",
  },
  {
    path: PATH.classroom.lab,
    element: <LabPage />,
    breadcrumb: "Bài Lab",
  },
  {
    path: PATH.classroom.assignment,
    element: <AssignmentPage />,
    breadcrumb: "Bài Assignment",
  },
  {
    path: PATH.classroom.addClassroom,
    element: <CrudClassRoomPage />,
    breadcrumb: "Thêm Lớp học  ",
  },
  {
    path: PATH.course.listcourse,
    element: <DataCourse />,
    breadcrumb: "Quản trị khóa học",
  },
  {
    path: PATH.course.courseDetail,
    element: <CourseDetailPage />,
    breadcrumb: "Chi tiết môn học",
  },
  {
    path: PATH.course.addcourse,
    element: <CrudCoursePage />,
    breadcrumb: "Thêm khóa học",
  },
  {
    path: PATH.course.editcourse,
    element: <EditCoursePageNew />,
    breadcrumb: "Cập nhật khóa học",
  },
  {
    path: PATH.attendance.attendance,
    element: <AttendancePage />,
    breadcrumb: "Điểm danh",
  },
  {
    path: PATH.attendance.attendanceDetail,
    element: <AttendanceDetailPage />,
    breadcrumb: "Chi tiết điểm danh",
  },
  {
    path: PATH.mark.mark,
    element: <MarkPage />,
    breadcrumb: "Điểm",
  },
  {
    path: PATH.mark.markDetail,
    element: <MarkDetailPage />,
    breadcrumb: "Chi tiết điểm",
  },
  {
    path: PATH.chat,
    element: <ChatPage />,
    breadcrumb: "Chat",
  },
  {
    path: PATH.user.cruduser,
    element: <ListUsersPage />,
    breadcrumb: "Quản trị người dùng",
  },
  {
    path: PATH.user.edituser,
    element: <EditUserPage />,
    breadcrumb: "Cập nhật người dùng",
  },
  {
    path: PATH.user.myAccount,
    element: <MyAccountPage />,
  },
  {
    path: PATH.test,
    element: <EmptyState />,
    breadcrumb: "Dữ liệu trống",
  },
  {
    path: PATH.post.index,
    element: <PostPage />,
    breadcrumb: "Thông báo và tin tức",
  },
  {
    path: PATH.post.learningpost,
    element: <EmptyState />,
    breadcrumb: "Thông báo và tin tức",
  },
  {
    path: PATH.post.operationalpost,
    element: <EmptyState />,
    breadcrumb: "Thông báo và tin tức",
  },
  {
    path: PATH.post.jobpost,
    element: <EmptyState />,
    breadcrumb: "Thông báo và tin tức",
  },
  
];

export const SubRouter = [
  {
    path: PATH.learn,
    element: <LearnPageNew />,
  },
];

export const PublicRouter = [
  {
    path: PATH_DEFAULT.login,
    element: <LoginPage />,
  },
  {
    path: PATH_DEFAULT.register,
    element: <RegisterPage />,
  },
];

export default { MainRouter, SubRouter, PublicRouter };
