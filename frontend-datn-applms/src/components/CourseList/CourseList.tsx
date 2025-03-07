import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { urlUpload } from "../../constant/config";
import { useGetCoursesQuery } from "../../service/api";
import { Course } from "../../types/Course";

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1030,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
interface BoxCourseProps {
  title: string;
  thumbnail: string | undefined;
  _id: string;
}
interface CoursesProps {
  dataCourses: Course[];
}
const HotCourses: React.FC<CoursesProps> = ({ dataCourses }) => {
  const [courses, setCoures] = useState<Course[]>([])
  useEffect(() => {
    if (dataCourses) {
      const couresActive = dataCourses.filter(c => c.isActive == true && c.isDelete == false);
      setCoures(couresActive.slice(-12));
    }
  }, [dataCourses])

  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          textAlign: "left",
          marginY: 2,
          fontSize: "36px",
          display: "flex",
          fontWeight: "bold",
          alignItems: "center",
          justifyContent: "space-between",
          '@media (max-width: 600px)': {
            fontSize: "24px",
          }
        }}
      >
        Khoá học nổi bật
        <Link to={`coursedetail`}>
          <Button
            variant="outlined"
            sx={{
              transition: "opacity 0.3s ease-in-out",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              textDecoration: "underline",
              "&:hover": {},
              '@media (max-width: 600px)': {
                fontSize: "12px",
              }
            }}
          >
            Xem lộ trình
          </Button>
        </Link>
      </Typography>
      <Slider {...settings}>
        {courses.map((course) => (
          <BoxCourse key={course._id} title={course.title} thumbnail={course.thumbnail} _id={course._id} />
        ))}
      </Slider>
    </>
  );
};
const BoxCourse: React.FC<BoxCourseProps> = ({ title, thumbnail, _id }) => {
  return (
    <Card
      sx={{
        position: "relative",
        margin: "0px 10px",
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
          image={`${urlUpload}/images/${thumbnail}`}
          title="Course Image"
          className="course-image"
          sx={{ transition: "filter 0.3s ease-in-out", minHeight: '140px', maxHeight: '140px' }}
        ></CardMedia>
        <CardActions
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            background: "transparent",
          }}
          className="overlay"
        >
          <Link to={`/course-detail?id=${_id}`}>
            <Button
              sx={{
                transition: "opacity 0.3s ease-in-out",
                background: "#fff",
                color: "#000",
                padding: "10px 30px",
                borderRadius: "50px",
                minWidth: "200px",
                fontWeight: "bold",
                fontSize: "14px",
                "&:hover": {
                  opacity: '0.8',
                  background: "#fff"
                },
              }}
              variant="contained"
            >
              Chi tiết môn học
            </Button>
          </Link>
        </CardActions>
      </div>
      <CardContent>
        <Typography
          sx={{
            fontSize: "16px",
            height: "18px",
            overflow: "hidden",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <FontAwesomeIcon icon={faUsers} /> 100
        </Typography>
      </CardContent>
    </Card>
  );
};

const GridCourse: React.FC<CoursesProps> = ({ dataCourses }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 960) {
        setCoursesPerPage(6);
      } else if (width >= 720) {
        setCoursesPerPage(4);
      } else {
        setCoursesPerPage(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (dataCourses) {
      const filteredCourses = dataCourses.filter(c => c.isActive && !c.isDelete);
      setCourses(filteredCourses);
    }
  }, [dataCourses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          textAlign: "left",
          marginY: 2,
          fontSize: "36px",
          display: "flex",
          fontWeight: "bold",
          alignItems: "center",
          justifyContent: "space-between",
          '@media (max-width: 600px)': {
            fontSize: "24px",
          }
        }}
      >
        Tất cả các khóa học
        <Link to={`coursedetail`}>
          <Button
            variant="outlined"
            sx={{
              transition: "opacity 0.3s ease-in-out",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              textDecoration: "underline",
              "&:hover": {},
              '@media (max-width: 600px)': {
                fontSize: "12px",
              }
            }}
          >
            Xem lộ trình
          </Button>
        </Link>
      </Typography>
      {/* Nội dung hiển thị các khóa học */}
      <div className="w-full h-[700px] lg:h-[750px] xl:h-[950px]">
        <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
          {currentCourses.map(c => (
            // Hiển thị thông tin của từng khóa học
            <Link key={c._id} to={`course-detail?id=${c._id}`}>
              <div className="rounded overflow-hidden shadow-lg w-full py-2">
                <div className="py-4 px-8">
                  <h4 className="text-lg mb-3 font-semibold h-12 overflow-hidden">{c.title}</h4>
                  <p className="mb-2 text-sm text-gray-600 h-[60px] overflow-hidden">{c.description}</p>
                  <img src={`${urlUpload}/images/${c.thumbnail}`} className="h-32 lg:h-36 xl:h-64 w-full object-cover" />
                  <hr className="mt-4" />
                  <span className="text-xs">{c.lessons.length}</span>
                  &nbsp;<span className="text-xs text-gray-500">Bài học</span> - <span className="text-xs">{moment(c.createdAt).format("DD - MM - YYYY  hh:mm A")}</span>
                </div>
              </div>
            </Link>

          ))}
        </div>

      </div>
      {/* Phân trang */}
      <div className="flex justify-center mt-3">
        <div className="inline-flex items-center justify-center gap-3">
          {/* Nút trang trước */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1} // Vô hiệu hóa nút nếu đang ở trang đầu tiên
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <span className="sr-only">Previous Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Hiển thị số trang */}
          <p className="text-xs text-gray-900">
            <span className="font-semibold">{currentPage}</span> / {Math.ceil(courses.length / coursesPerPage)}
          </p>

          {/* Nút trang tiếp theo */}
          <button
            onClick={nextPage}
            disabled={indexOfLastCourse >= courses.length}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <span className="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>


    </>
  );
};

const CourseList: React.FC = () => {
  const { data: allCourse } = useGetCoursesQuery();
  return allCourse && allCourse.data && (
    <>
      <Box sx={{ padding: "32px 0" }}>
        <HotCourses dataCourses={allCourse.data} />
        <Divider sx={{ border: "none" }} />
      </Box>
      <Box sx={{ padding: "32px 0" }}>
        <GridCourse dataCourses={allCourse.data} />
        <Divider sx={{ border: "none" }} />
      </Box>
    </>
  );
};

export default CourseList;
