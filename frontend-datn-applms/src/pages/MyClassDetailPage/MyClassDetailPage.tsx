import AddIcon from "@mui/icons-material/Add";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getItem } from "../../helper/storage";
import { useGetMyClassRoomQuery } from "../../service/api";
import { User } from "../../types/User";

// import Curriculum from "../../components/Curriculum/Curriculum";
const MyClassDetailPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const URL_Upload = import.meta.env.VITE_FILE_UPLOADS_URL;
  const userInfo = getItem("userInfo") as User;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      console.log(event);
    };
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  const { classroomId } = useParams();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  // Check if id is null before passing it to useGetMyClassRoomQuery
  const { data: classData } = useGetMyClassRoomQuery(classroomId as string);
  // console.log(classData);

  const classroom = classData?.data;
  if (!classroomId) {
    return <Navigate to="/notfound" />;
  }

  // console.log({ classroom });

  return (
    <>
      {classData && classData.data && classroom && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <div className="xl:flex xl:flex-row-reverse">
            <div className="w-full xl:w-4/12 xl:p-4">
              <Card
                sx={{
                  position: "relative",
                  border: "none",
                  "&:hover": {
                    "& .overlay": {
                      opacity: 1,
                    },
                    "& .course-image": {
                      filter: "blur(5px)",
                    },
                  },
                }}
              >
                <div className="image-container">
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${URL_Upload}/images/${classroom?.course.thumbnail}`}
                    title="Course Image"
                    className="course-image"
                    sx={{
                      transition: "filter 0.3s ease-in-out",
                      opacity: ".8",
                    }}
                  ></CardMedia>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 1,
                      transition: "opacity 0.3s ease-in-out",
                      background: "transparent",
                    }}
                    className="overlay"
                  >
                    <Link
                      to={`/learn/${classroom?._id}`}
                    >
                      <Button
                        sx={{
                          transition: "opacity 0.3s ease-in-out",
                          borderRadius: "50%",
                          minWidth: "60px",
                          minHeight: "60px",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        variant="contained"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="circle-play"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"
                          ></path>
                        </svg>
                      </Button>
                    </Link>
                  </CardActions>
                </div>
              </Card>
              <Card sx={{ width: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {/* <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "Bold",
                    }}
                  >
                    Miễn phí
                  </Typography> */}
                  {userInfo?.role === "learner" ? (
                    <Link
                      to={`/learn/${classroom?._id}`}>
                      <Button
                        sx={{
                          transition: "opacity 0.3s ease-in-out",
                          background: "#f05123",
                          color: "#fff",
                          padding: "10px 30px",
                          borderRadius: "50px",
                          minWidth: "200px",
                          margin: "10px 0",
                          fontWeight: "bold",
                          border: "none",
                          fontSize: "14px",
                          "&:hover": {
                            background: "#f05123",
                            color: "#fff",
                          },
                        }}
                        variant="contained"
                      >
                        Bắt đầu học
                      </Button>
                    </Link>
                  ) : null}
                  {userInfo?.role === "learner" ? (
                    <div className=" inline-flex gap-4" role="group">
                      <Link to={`/attendance`}><button
                        type="button"
                        className="*hover:bg-blue-gray-100 rounded-lg shadow-sm inline-block border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                      >
                        Điểm danh
                      </button></Link>
                      <Link to={`/mark`}>
                        <button
                          type="button"
                          className="hover:*:bg-blue-gray-100 rounded-lg shadow-sm inline-block border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Điểm
                        </button>
                      </Link>
                      <Link to="/chat">
                        <button
                          type="button"
                          className="hover:*:bg-blue-gray-100 rounded-lg shadow-sm inline-block border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Chat
                        </button>
                      </Link>
                    </div>
                  ) : null}
                  {userInfo?.role === "instructor" ? (
                    <div className="inline-flex" role="group">
                      <Link to={`/attendance/${classroom._id}`}><button
                        type="button"
                        className="inline-block rounded-s border-2 border-primary-100 px-2 xl:px-5 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                      >
                        Điểm danh
                      </button></Link>
                      <Link to={`/mark/${classroom._id}`}>
                        <button
                          type="button"
                          className="-ms-0.5 inline-block border-2 border-primary-100 px-2 xl:px-5 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Điểm
                        </button>
                      </Link>
                      <Link to="/chat">
                        <button
                          type="button"
                          className="-ms-0.5 inline-block rounded-e border-2 border-primary-100 px-2 xl:px-5 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Chat
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </CardContent>
                <CardContent className="flex justify-center">
                  <ul className="space-y-2">
                    <li className="flex">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="gauge-high"
                        className="svg-inline--fa fa-gauge-high mr-3"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"30px"}
                      >
                        <path
                          fill="currentColor"
                          d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64C238.3 64 224 78.33 224 96C224 113.7 238.3 128 256 128C273.7 128 288 113.7 288 96C288 78.33 273.7 64 256 64zM256 416C291.3 416 320 387.3 320 352C320 334.6 313.1 318.9 301.9 307.4L365.1 161.7C371.3 149.5 365.8 135.4 353.7 130C341.5 124.7 327.4 130.2 322 142.3L257.9 288C257.3 288 256.6 287.1 256 287.1C220.7 287.1 192 316.7 192 352C192 387.3 220.7 416 256 416V416zM144 112C126.3 112 112 126.3 112 144C112 161.7 126.3 176 144 176C161.7 176 176 161.7 176 144C176 126.3 161.7 112 144 112zM96 288C113.7 288 128 273.7 128 256C128 238.3 113.7 224 96 224C78.33 224 64 238.3 64 256C64 273.7 78.33 288 96 288zM416 224C398.3 224 384 238.3 384 256C384 273.7 398.3 288 416 288C433.7 288 448 273.7 448 256C448 238.3 433.7 224 416 224z"
                        ></path>
                      </svg>{" "}
                      Trình độ cơ bản
                    </li>
                    <li className="flex">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="film"
                        className="svg-inline--fa fa-film mr-3"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"30px"}
                      >
                        <path
                          fill="currentColor"
                          d="M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"
                        ></path>
                      </svg>{" "}
                      Tổng số {classroom?.course?.lessons?.length} bài học
                    </li>

                    <li className="flex">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="battery-full"
                        className="svg-inline--fa fa-battery-full mr-3"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        width={"30px"}
                      >
                        <path
                          fill="currentColor"
                          d="M448 320H96V192H448V320zM0 176C0 131.8 35.82 96 80 96H464C508.2 96 544 131.8 544 176V192C561.7 192 576 206.3 576 224V288C576 305.7 561.7 320 544 320V336C544 380.2 508.2 416 464 416H80C35.82 416 0 380.2 0 336V176zM80 160C71.16 160 64 167.2 64 176V336C64 344.8 71.16 352 80 352H464C472.8 352 480 344.8 480 336V176C480 167.2 472.8 160 464 160H80z"
                        ></path>
                      </svg>{" "}
                      Học mọi lúc, mọi nơi
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="w-full xl:w-8/12">
              <div>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginTop: '5px'
                  }}
                >
                  [{classroom?.code}] {classroom?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: '10px'
                  }}
                >
                  Giáo viên: {classroom?.instructor.fullname}
                </Typography>
                <div className="flex">
                  <div className=" w-1/2">
                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Số học viên: </span>{classroom?.learners.length}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Ca học: </span>{classroom?.hours}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Ngày học: </span>{classroom?.dayOfWeek.split("").join(" ")}
                    </Typography>
                  </div>
                  <div className="w-1/2">
                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Ngày bắt đầu: </span>{formatDate(classroom.dateStart!)}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Ngày kết thúc: </span>{formatDate(classroom.dateEnd!)}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "5px" }}>
                      <span className="font-semibold">Phòng học: </span>{classroom?.room?.title}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      margin: "10px 0",
                    }}
                  >
                    {`Tên khóa học: ${classroom?.course?.title}`}
                  </Typography>
                </div>
              </div>
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Lab: {classroom.course.labs.length} bài
                </Typography>
                {classroom?.course?.labs &&
                  classroom?.course?.labs.map((lab) => (
                    <div className="flex justify-between pl-6 mb-2" key={lab._id}>
                      <div className="w-[80%]">
                        <Typography
                          variant="h6"
                          sx={{
                            margin: "",
                          }}
                        >{lab.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            margin: "10px",
                          }}
                        >
                          Mô tả: {lab.description}
                        </Typography>
                      </div>
                      <Link to={`lab/${lab._id}`}>
                        <div className="flex">

                        </div>
                        {userInfo?.role === "learner" && (
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              Nộp bài
                            </button>

                          </div>
                        )}
                        {userInfo?.role === "instructor" && (
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              Xem Lab
                            </button>

                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
              </div>
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Assignment: {classroom.course.assignments.length} bài
                </Typography>
                {classroom?.course?.assignments &&
                  classroom?.course?.assignments.map((assignment) => (
                    <div className="flex justify-between pl-6 mb-2" key={assignment._id}>
                      <div className="w-[80%]">
                        <Typography
                          variant="h6"
                          sx={{
                            margin: "",
                          }}
                        >{assignment.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            margin: "10px",
                          }}
                        >
                          Mô tả: {assignment.description}
                        </Typography>
                      </div>
                      <Link to={`assignment/${assignment._id}`}>
                        
                        {userInfo?.role === "learner" && (
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              Nộp bài
                            </button>

                          </div>
                        )}
                        {userInfo?.role === "instructor" && (
                          <div className="flex items-center">

                            <button
                              type="button"
                              className="inline-block rounded-e border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              Xem Assignment
                            </button>

                          </div>
                        )}
                      </Link>
                    </div>
                  ))}
              </div>
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Học liệu: {classroom.course.curriculums.length} file
                </Typography>
                {classroom?.course?.curriculums &&
                  classroom?.course?.curriculums?.map((curriculum) => (
                    <div className="flex pl-6" key={curriculum._id}>
                      <a
                        href={`${URL_Upload}/curriculums/${curriculum.filename}`}
                        className="flex items-center"
                        download
                      >
                        <button className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </button>
                      </a>
                      <Typography
                        key={curriculum._id}
                        variant="body1"
                        sx={{
                          margin: "20px 20px",
                        }}
                      >
                        {curriculum.originalname}
                      </Typography>
                    </div>
                  ))}
              </div>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  margin: "20px 0",
                }}
              >
                {`Bao gồm: ${classroom?.course?.lessons?.length} bài học:`}
              </Typography>
              {classroom?.course &&
                classroom?.course.lessons.map((lesson, lessonIndex) => (
                  <Accordion
                    key={lesson._id}
                    expanded={expanded === lesson._id}
                    onChange={handleChange(lesson._id!)}
                    sx={{
                      marginBottom: "10px",
                      borderRadius: "5px",
                      padding: "0",
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ebebeb !important",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "0.2s",
                        "& .MuiAccordionSummary-indicator": {
                          transition: "0.2s",
                          order: -1,
                        },
                        '&[aria-expanded="true"] .MuiAccordionSummary-indicator':
                        {
                          transform: "rotate(45deg)",
                        },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: "90%",
                        }}
                      >
                        {expanded === lesson._id ? (
                          <RemoveIcon sx={{ color: "rgba(240,81,35,.4)" }} />
                        ) : (
                          <AddIcon sx={{ color: "rgba(240,81,35,.4)" }} />
                        )}
                        <Typography variant="h6">{`${lessonIndex + 1}. ${lesson.title
                          }`}</Typography>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "10%",
                          flex: "10%",
                        }}
                      >
                        <Typography>{`${lesson.videos.length} bài học`}</Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails sx={{}}>
                      <div style={{ width: "100%" }}>
                        {lesson.videos.map((video, videoIndex) => (
                          <div
                            key={video._id}
                            style={{
                              background: "transparent",
                              padding: "0 30px 0 48px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <Typography variant="subtitle1">
                                <PlayCircleIcon
                                  sx={{
                                    marginRight: "8px",
                                    color: "rgba(240,81,35,.4)",
                                  }}
                                ></PlayCircleIcon>
                                {`${lessonIndex + 1}.${videoIndex + 1}. ${lesson.title
                                  }`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              <div></div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MyClassDetailPage;
