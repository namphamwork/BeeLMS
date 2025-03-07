import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import React from "react";

import { Classroom } from "../../../types/Classroom";
import { ClassItem } from "./ClassItem";
interface ClassWidgetProps {
  data: Classroom[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const ClassWidget: React.FC<ClassWidgetProps> = ({
  data = [],
  isLoading,
  isSuccess,
  isError,
}) => {
  const renderItem = () => {
    return data.map((item) => <ClassItem key={item._id} item={item} />);
  };
  return (
    <>
      {isSuccess && renderItem()}
      {isLoading && <CircularProgress />}
      {isError && (
          <Alert severity="warning">
            <AlertTitle>Chưa có dữ liệu</AlertTitle>
            <strong>Vui lòng Thử lại sau!</strong>
          </Alert>
        )}
    </>
  );
};
export default ClassWidget;
