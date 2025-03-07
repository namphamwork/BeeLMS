import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetClassroomQuery } from "../../service/api";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import { Classroom } from "../../types/Classroom";
import moment from "moment";

import { User } from "../../types/User";
import { useParams } from "react-router-dom";
import Widgets from "./Widgets";
import { ChooseState } from "../../components/ChooseState";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
interface Attendance {
  _id: string;
  learners: { _id: string }[];
  date: Date;
}

const AttendanceDetailPage: React.FC = () => {
  const { id } = useParams();
  //   const { data: classroom } = useGetMyClassRoomQuery(_idClassroom);
  const _idParams = id as string;
  const { data: classroom } = useGetClassroomQuery({ _id: _idParams });
  // console.log({classroom});
  const [learners, setLearners] = useState<User[]>([]);
  const attendanceDates = classroom?.data?.attendances || [];

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedAttendance, setSelectedAttendance] = useState(
    {} as Attendance
  );
  const handleListItemClick = (value: Attendance) => {
    setSelectedDate(value.date);
    setSelectedAttendance(value);
  };

  useEffect(() => {
    if (classroom && classroom?.data?.learners?.length > 0) {
      setLearners(classroom?.data.learners);
    }
  }, [classroom, selectedAttendance]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {selectedDate && selectedAttendance ? (
        <div className="col-span-3 p-2 bg-white border border-gray-300 rounded-lg shadow mb-3 overflow-auto">
          <Widgets
            _idClassroom={id}
            learners={learners}
            selectedDate={selectedDate}
            selectedAttendance={selectedAttendance}
          />
        </div>
      ) : (
        <div className="col-span-3 bg-white border border-gray-300 rounded-lg shadow mb-3 flex justify-center item-center ">
          <ChooseState
            title={"Chọn ngày điểm danh"}
            subTitle={"Vui lòng chọn ngày điểm danh ở bên phải để cập nhật!"}
          />
        </div>
      )}

      <div className="col-span-1 w-full max-h-fit p-2 bg-white border border-gray-300 rounded-lg shadow mb-3">
        <Stack
          direction={"row"}
          sx={{
            textAlign: "center",
            paddingTop: 2,
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalendarMonthOutlinedIcon />
          <Typography sx={{ fontWeight: 700, fontSize: "13pt" }}>
            NGÀY ĐIỂM DANH
          </Typography>
        </Stack>
        <Box sx={{ width: "100%", bgcolor: "background.green" }}>
          <List component="nav" aria-label="secondary mailbox folder">
            {attendanceDates ? (
              attendanceDates.map((e, index) => (
                <ListItemButton
                  key={index}
                  selected={moment(e.date).isSame(selectedDate, "day")}
                  onClick={() => handleListItemClick(e)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 16px",
                    borderRadius: "16px",
                  }}
                >
                  <div>
                    <Typography variant="body1" sx={{ lineHeight: "2.5" }}>
                      {moment(e.date).format("DD/MM/YYYY - dddd")}
                    </Typography>
                  </div>
                  {moment(e.date).isSame(selectedDate, "day") && (
                    <Avatar
                      sx={{
                        bgcolor: moment(e.date).isSame(selectedDate, "day")
                          ? "primary.main"
                          : "background.paper",
                        color: moment(e.date).isSame(selectedDate, "day")
                          ? "primary.contrastText"
                          : "text.primary",
                      }}
                    >
                      <CheckOutlinedIcon />
                    </Avatar>
                  )}
                </ListItemButton>
              ))
            ) : (
              <ListItemText primary="Hiện tại chưa có dữ liệu" />
            )}
          </List>
        </Box>
      </div>
    </div>
  );
};

export default AttendanceDetailPage;
