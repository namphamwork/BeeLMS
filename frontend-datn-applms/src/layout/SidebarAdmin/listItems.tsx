import PeopleIcon from '@mui/icons-material/People';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import ChecklistIcon from '@mui/icons-material/Checklist';
import DashboardIcon from '@mui/icons-material/Dashboard';
export const menuItems = [
    {
      label: "Tổng quan",
      icon:<DashboardIcon/>,
      to: "/",
    },
    {
      label: "Khóa học",
      icon: <AutoStoriesIcon/>,
      to: "/list-course",
   
    },
    {
      label: "Lớp học",
      icon:<WidgetsIcon/>,
      to: "/list-classroom",
    },
    {
      label: "Người dùng",
      icon: (<PeopleIcon/> ),
      to: "/cruduser",
    },
    // {
    //   label: "Điểm",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
    //     </svg>
    //   ),
    //   to: "/grade",
    // },
    // {
    //   label: "Điểm danh",
    //   icon: <ChecklistIcon/>,
    //   to: "/course",
    // },
  ];