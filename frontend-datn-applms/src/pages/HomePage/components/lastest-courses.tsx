import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import type { SxProps } from "@mui/material/styles";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { DotsThreeVertical as DotsThreeVerticalIcon } from "@phosphor-icons/react/dist/ssr/DotsThreeVertical";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { urlUpload } from "../../../constant/config";
import { Course } from "../../../types/Course";

export interface LastestCoursesProps {
  courses?: Course[];
  sx?: SxProps;
}

export function LastestCourses({
  courses = [],
  sx,
}: LastestCoursesProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Khóa học mới nhất" />
      <Divider />
      <List>
        {courses.slice(-5).map((course) => {
          return (
            <ListItem key={course._id}>
              <ListItemAvatar>
                {course.thumbnail ? (
                  <Box
                    component="img"
                    src={`${urlUpload}/images/${course.thumbnail}`}
                    sx={{ borderRadius: 1, height: "48px", width: "72px", marginRight:"10px" }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "var(--mui-palette-neutral-200)",
                      height: "48px",
                      width: "72px",
                      marginRight:"10px",
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={course.title}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Cập nhật lúc ${dayjs(course?.updatedAt).format(
                  "MMM D, YYYY"
                )}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <DotsThreeVerticalIcon weight="bold" />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          <Link to="/list-course">Xem tất cả</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
