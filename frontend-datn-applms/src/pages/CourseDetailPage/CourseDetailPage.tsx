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
import { Navigate, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useGetCourseQuery } from "../../service/api";

const MyClassDetailPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const URL_Image = import.meta.env.VITE_FILE_UPLOADS_URL;

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
    console.log(event);
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  // Check if id is null before passing it to useGetMyClassRoomQuery
  const { data: courseData } = useGetCourseQuery(id as string);

  const course = courseData?.data;
  
  if (!id ){
    return <Navigate to="/notfound" />;
  }
  return (
    <>
      {courseData && courseData.data && course && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <div className="flex">
            <div className="w-8/12">
              <div>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {course?.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    margin: "20px 0",
                  }}
                >
                  {course?.description}
                </Typography>
                
                <div>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      margin: "20px 0",
                    }}
                  >
                    Nội dung khóa học
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      margin: "20px 0",
                    }}
                  >
                    {`Bao gồm: ${course?.lessons?.length} bài học, ${
                      course?.labs?.length
                    } bài lab`}
                  </Typography>
                </div>
              </div>
              {course &&
                course.lessons.map((lesson, lessonIndex) => (
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
                        <Typography variant="h6">{`${lessonIndex + 1}. ${
                          lesson.title
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
                                {`${lessonIndex + 1}.${videoIndex + 1}. ${
                                  lesson.title
                                }`}
                              </Typography>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
            <div className="w-4/12 p-10">
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
                    image={`${URL_Image}/images/${course?.thumbnail}`}
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
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "Bold",
                    }}
                  >
                    Miễn phí
                  </Typography>
                  
                </CardContent>
                <CardContent className="flex justify-center">
                  <ul className="space-y-3">
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
                      Tổng số {course?.lessons?.length} bài học
                    </li>
                    <li className="flex">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="clock"
                        className="svg-inline--fa fa-clock mr-3"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"30px"}
                      >
                        <path
                          fill="currentColor"
                          d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"
                        ></path>
                      </svg>{" "}
                      Thời lượng 10 giờ 29 phút
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
          </div>
        </div>
      )}
      <div>
        {/* Any content that should be outside the main container */}
      </div>
    </>
  );
};

export default MyClassDetailPage;
