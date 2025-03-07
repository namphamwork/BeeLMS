import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { SxProps } from "@mui/material/styles";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import dayjs from "dayjs";
import * as React from "react";
import { Link } from "react-router-dom";
import { Classroom } from "../../../types/Classroom";

const statusMap = (isActive: boolean, isDelete: boolean) => {
  if (!isActive && !isDelete) {
    return { label: "Chưa hoạt động", color: "yellow" };
  } else if (isActive && !isDelete) {
    return { label: "Đã hoạt động", color: "green" };
  } else if (isDelete) {
    return { label: "Đã xóa", color: "red" };
  }
  return { label: "Unknown", color: "blue" };
};

export interface LastestClassesProps {
  classrooms: Classroom[];
  sx?: SxProps;
}

export const LastestClasses: React.FC<LastestClassesProps> = ({
  classrooms = [],
  sx,
}) => {
  return (
    <Card sx={sx}>
      <CardHeader title="Lớp học mới nhất" />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "700"}}>Mã lớp</TableCell>
              <TableCell sx={{fontWeight: "700"}}>Tên lớp</TableCell>
              <TableCell sx={{fontWeight: "700"}} sortDirection="desc">Ngày cập nhật</TableCell>
              <TableCell sx={{fontWeight: "700"}}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms &&
              classrooms.slice(-8).map((classroom) => {
                const { label, color } = statusMap(
                  classroom.isActive,
                  classroom.isDelete
                );

                return (
                  <TableRow hover key={classroom._id}>
                    <TableCell>{classroom.code}</TableCell>
                    <TableCell>{classroom.title}</TableCell>
                    <TableCell>
                      {dayjs(classroom.createdAt).format("MMM D, YYYY")}
                    </TableCell>
                    <TableCell>
                    <span className={`bg-${color}-100 text-${color}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-${color}-900 dark:text-${color}-300`}>{label}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          <Link to="/list-classroom">Xem tất cả</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
