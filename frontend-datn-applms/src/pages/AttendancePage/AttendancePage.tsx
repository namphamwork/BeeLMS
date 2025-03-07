import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useGetMyClassroomsQuery } from "../../service/api";
// import { Classroom } from "../../types/Classroom";
import { EmptyState } from "../../components/EmptyState";
import { ErrorState } from "../../components/ErrorState";
import { TabClassrooms } from "../../components/TabClassrooms";
import { getItem } from "../../helper/storage";
import { User } from "../../types/User";
interface Attendance {
  _id: string;
  date: Date;
  learners: { _id: string }[];
}
export interface AttendanceTableItem {
  days: Attendance[];
  course: string;
  classroom: string;
  instructor: User;
  hours: number;
}

const AttendancePage: React.FC = () => {
  const {
    data: getClassrooms,
    isSuccess: loadedClassrooms,
    isLoading,
    isError,
  } = useGetMyClassroomsQuery();
  const userInfo = getItem("userInfo") as User;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (loadedClassrooms && getClassrooms.data.length == 0) {
    return <EmptyState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (userInfo?.role == "instructor" && getClassrooms)
    return (
      <TabClassrooms
        isLoading={isLoading}
        isSuccess={loadedClassrooms}
        isError={isError}
        classrooms={getClassrooms ? getClassrooms.data : []}
      />
    );

  if (getClassrooms?.data.length == 0) return <EmptyState />;

  return (
    <div className="mb-5">
      <Box>
        <TabClassrooms
          isLoading={isLoading}
          isSuccess={loadedClassrooms}
          renderTable={true}
          isError={isError}
          classrooms={getClassrooms ? getClassrooms.data : []}
        />
      </Box>
    </div>
  );
};

export default AttendancePage;
