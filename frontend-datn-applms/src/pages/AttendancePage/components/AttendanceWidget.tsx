import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import React from "react";
import { Classroom } from "../../../types/Classroom";
import { AttendanceItem } from "./AttendanceItem";
// import { MarkTableItem } from "../MarkPage";
// import { MarkItem } from "./MarkItem";
type AttendanceWidgetProps = {
  data: Classroom[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  userId: string;
};
export const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({
  data = [],
  isLoading,
  isError,
  isSuccess,
  userId,
}) => {
  const renderItem = () => {
    return (
      data.length > 0 &&
      data.map((item, index) => (
        <AttendanceItem key={index} item={item} userId={userId} />
      ))
    );
  };

  return (
    // <Paper>
    <>
      {isSuccess && renderItem()}
      {isLoading && <CircularProgress />}
      {isError && (
        <Alert severity="error">
          <AlertTitle>Xảy ra lỗi!</AlertTitle>
          Hiện tại chưa có dữ liệu hoặc tải dữ liệu gặp lỗi.{" "}
          <strong>Vui lòng Thử lại sau!</strong>
        </Alert>
      )}
    </>
    //</Paper>
  );
};
