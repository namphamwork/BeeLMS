import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

const Curriculum: React.FC = () => {
  const courseData: Chapter[] = [
    {
      id: "1",
      title: "Giới thiệu",
      lessons: [
        {
          id: "1",
          title: "Cài đặt Dev - C++",
          duration: "15 minutes",
        },
        {
          id: "Hướng dẫn sử dụng Dev - C++",
          title: "Course Overview",
          duration: "30 minutes",
        },
      ],
    },
    {
      id: "2",
      title: "Biến và kiểu dữ liệu",
      lessons: [
        {
          id: "3",
          title: "Biến và nhập xuất dữ liệu",
          duration: "45 minutes",
        },
        { id: "4", title: "5. Biến (variable) là gì?", duration: "1 hour" },
      ],
    },
    {
      id: "3",
      title: "Cấu trúc điều khiển và vòng lặp",
      lessons: [
        {
          id: "5",
          title: "Ôn lại cú pháp khai báo biến #",
          duration: "1.5 hours",
        },
        {
          id: "6",
          title: "Ép kiểu dữ liệu và bảng mã ASCII",
          duration: "2 hours",
        },
      ],
    },
    {
      id: "4",
      title: "Cấu trúc điều khiển và vòng lặp",
      lessons: [
        {
          id: "5",
          title: "Ôn lại cú pháp khai báo biến #",
          duration: "1.5 hours",
        },
        {
          id: "6",
          title: "Ép kiểu dữ liệu và bảng mã ASCII",
          duration: "2 hours",
        },
      ],
    },
    {
      id: "5",
      title: "Cấu trúc điều khiển và vòng lặp",
      lessons: [
        {
          id: "5",
          title: "Ôn lại cú pháp khai báo biến #",
          duration: "1.5 hours",
        },
        {
          id: "6",
          title: "Ép kiểu dữ liệu và bảng mã ASCII",
          duration: "2 hours",
        },
      ],
    },
    {
      id: "6",
      title: "Cấu trúc điều khiển và vòng lặp",
      lessons: [
        {
          id: "5",
          title: "Ôn lại cú pháp khai báo biến #",
          duration: "1.5 hours",
        },
        {
          id: "6",
          title: "Ép kiểu dữ liệu và bảng mã ASCII",
          duration: "2 hours",
        },
      ],
    },
    {
      id: "7",
      title: "Cấu trúc điều khiển và vòng lặp",
      lessons: [
        {
          id: "5",
          title: "Ôn lại cú pháp khai báo biến #",
          duration: "1.5 hours",
        },
        {
          id: "6",
          title: "Ép kiểu dữ liệu và bảng mã ASCII",
          duration: "2 hours",
        },
      ],
    },
  ];

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      if(event){}
      
    };

  const totalLessons = courseData.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );
  const totalDuration = courseData.reduce(
    (acc, chapter) =>
      acc +
      chapter.lessons.reduce(
        (accLesson, lesson) =>
          accLesson + parseInt(lesson.duration.split(" ")[0], 10),
        0
      ),
    0
  );

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
        }}
      >
        Lập trình C++ cơ bản, nâng cao
      </Typography>
      <Typography
        variant="body1"
        sx={{
          margin: "20px 0",
        }}
      >
        Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt
        đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm
        căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục
        con đường trở thành một lập trình viên.
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
        }}
      >
        Nội dung khóa học
      </Typography>

      <Typography
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "8px",
          margin: "10px 0",
        }}
      >
        <Typography variant="body1">{`Tổng số chương: ${courseData.length}`}</Typography>
        <Typography variant="body1">{`Tổng số bài học: ${totalLessons}`}</Typography>
        <Typography variant="body1">{`Tổng thời gian học: ${totalDuration} phút`}</Typography>
      </Typography>
      {/* <Typography variant="body1">Mở rộng tất cả</Typography> */}

      {courseData.map((chapter, chapterIndex) => (
        <Accordion
          key={chapter.id}
          expanded={expanded === chapter.id}
          onChange={handleChange(chapter.id)}
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
              '&[aria-expanded="true"] .MuiAccordionSummary-indicator': {
                transform: "rotate(45deg)",
              },
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {expanded === chapter.id ? (
                <RemoveIcon sx={{ color: "rgba(240,81,35,.4)" }} />
              ) : (
                <AddIcon sx={{ color: "rgba(240,81,35,.4)" }} />
              )}
              <Typography variant="h6">{`${chapterIndex + 1}. ${
                chapter.title
              }`}</Typography>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <Typography >{`${chapter.lessons.length} bài học`}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            <div style={{ width: "100%" }}>
              {chapter.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lesson.id}
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
                        sx={{ marginRight: "8px", color: "rgba(240,81,35,.4)" }}
                      >
                        {" "}
                      </PlayCircleIcon>
                      {`${chapterIndex + 1}.${lessonIndex + 1}. ${
                        lesson.title
                      }`}
                    </Typography>
                  </div>
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <Typography variant="body2">
                      Thời gian: {lesson.duration}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Curriculum;
