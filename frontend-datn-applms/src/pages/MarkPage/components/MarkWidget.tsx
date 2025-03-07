import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Classroom } from "../../../types/Classroom";
import { MarkItem } from "./MarkItem";
import SkeletonMarkTable from "./SkeletonMark";
type MarkWidgetProps = {
  data: Classroom[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  userId: string;
};
const MarkWidget: React.FC<MarkWidgetProps> = ({
  data = [],
  isLoading,
  isError,
  isSuccess,
  userId,
}) => {
  const renderItem = () => {
    return (
      data.length > 0 &&
      data.map((item) => (
        <MarkItem key={item._id} item={item} userId={userId} />
      ))
    );
  };

  return (
    <>
      {/* Xử lý trường hợp load dữ liệu xong */}
      {isSuccess && !isLoading && renderItem()}

      {/* Xử lý trường hợp: Đang loading */}
      {isLoading && !isSuccess && <SkeletonMarkTable />}

      {/* Xử lý trường hợp: Đã load xong, gặp lỗi */}
      {isError && !isLoading && !isSuccess && (
        <Alert severity="error">
          <AlertTitle>Xảy ra lỗi!</AlertTitle>
          Hiện tại chưa có dữ liệu hoặc tải dữ liệu gặp lỗi.{" "}
          <strong>Vui lòng Thử lại sau!</strong>
        </Alert>
      )}
    </>
  );
};
export default MarkWidget;
