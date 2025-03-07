import { Box } from "@mui/material";
import React from "react";
import { TabClassrooms } from "../../components/TabClassrooms";
import { getItem } from "../../helper/storage";
import { useGetMyClassroomsQuery } from "../../service/api";
import { Marks } from "../../types/Classroom";
import { TableMark } from "../../types/Mark";
import { User } from "../../types/User";

export interface MarkTableItem extends TableMark {
  mark: Marks;
  course: string;
  classroom: string;
}

const MarkPage: React.FC = () => {
  const userInfo = getItem("userInfo") as User;
  const {
    data: getClassrooms,
    isSuccess: loadedClassrooms,
    isLoading,
    isError,
  } = useGetMyClassroomsQuery();

  if (userInfo?.role == "instructor")
    return (
      <TabClassrooms
        isLoading={isLoading}
        isSuccess={loadedClassrooms}
        isError={isError}
        classrooms={getClassrooms ? getClassrooms.data : []}
      />
    );

  return (
    <div className="mb-5">
      <Box>
        <TabClassrooms
          renderTableMark={true}
          isLoading={isLoading}
          isSuccess={loadedClassrooms}
          isError={isError}
          classrooms={getClassrooms ? getClassrooms.data : []}
        />
      </Box>
    </div>
  );
};

export default MarkPage;
