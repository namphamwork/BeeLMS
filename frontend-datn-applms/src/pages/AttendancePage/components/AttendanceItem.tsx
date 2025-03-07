import { Stack } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { useGetClassroomQuery } from "../../../service/api";
import { Classroom } from "../../../types/Classroom";
import { AttendanceTableItem } from "../AttendancePage";
import { columns, options } from "./configTable";

interface AttendanceItemProps {
  item: Classroom;
  userId: string;
}

export const AttendanceItem: React.FC<AttendanceItemProps> = ({
  item,
  userId,
}) => {
  const [attendanceTable, setAttendanceTable] = useState<AttendanceTableItem>();
  const { data: getClassroom, isSuccess } = useGetClassroomQuery({
    _id: item._id,
  });

  useEffect(() => {
    if (
      getClassroom &&
      isSuccess &&
      getClassroom.statusCode == 200 &&
      getClassroom.data
    ) {
      const table = {
        days: getClassroom.data.attendances,
        hours: getClassroom.data.hours,
        instructor: getClassroom.data.instructor,
        course: getClassroom.data.course.title,
        classroom: getClassroom.data.title,
      };
      setAttendanceTable(table);
    }
  }, [getClassroom, isSuccess]);

  const attendancesData =
    attendanceTable && attendanceTable.days ? attendanceTable.days : [];

  const headerCard = () => {
    return (
      <h1 className="my-2 text-brown-900 font-bold">
        {attendanceTable && attendanceTable.course} -{" "}
        {attendanceTable && attendanceTable.classroom}
      </h1>
    );
  };

  return (
    getClassroom &&
    attendanceTable && (
      // <Card>
      <Stack direction={"column"} sx={{marginBottom:5}}>
        <MUIDataTable
          title={attendanceTable && headerCard()}
          data={attendancesData}
          columns={columns(attendanceTable, userId)}
          options={options}
        />
      </Stack>
    )
  );
};
