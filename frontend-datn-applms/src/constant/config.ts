export const PATH = {
  course: {
    listcourse: "/list-course",
    editcourse: "/list-course/:id",
    addcourse: "/list-course/add",
    courseDetail: "/course-detail",
  },
  classroom: {
    listclassroom: "/list-classroom",
    addClassroom: "/list-classroom/add",
    myclassdetail: "/dashboard/myclassroom/:classroomId",
    lab: "/dashboard/myclassroom/:classroomId/lab/:labId",
    assignment: "/dashboard/myclassroom/:classroomId/assignment/:assignmentId",
  },
  user: {
    cruduser: "/cruduser",
    edituser: "/cruduser/:id",
    myAccount: "/myaccount",
  },
  mark: {
    mark: "/mark",
    markDetail: "/mark/:id",
  },
  attendance: {
    attendance: "/attendance",
    attendanceDetail: "/attendance/:id",
  },
  post:{
    index:"/post",
    learningpost:"/post/learning",
    operationalpost:"/post/operational",
    jobpost:"/post/job",
  },
  index: "/",
  dashboard: "/dashboard",
  chat: "/chat",
  learn: "/learn/:id",
  listcategory: "/listcategory",
  lab: "lab/:id",
  test:"/empty"
};

export const PATH_DEFAULT = {
  login: "/login",
  register: "/register",
  notfound: "/notfound",
};

export const urlUpload = import.meta.env.VITE_FILE_UPLOADS_URL;
export const urlImage = import.meta.env.VITE_ASSET_URL;
