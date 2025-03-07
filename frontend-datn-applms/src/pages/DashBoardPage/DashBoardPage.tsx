import React from "react";
import Calendar from "../../components/Calendar/calenderpage";
import { useGetMyClassroomsQuery } from "../../service/api";
import { TabClassrooms } from "../../components/TabClassrooms";

const DashBoardPage: React.FC = () => {
  const { data: getClassrooms, isSuccess, isLoading, isError } = useGetMyClassroomsQuery();
  return (
    <>
      {getClassrooms?.data && isSuccess && (
        <div className="flex lg:flex-row-reverse flex-col">
          <div className="lg:w-4/12 pl-4 xl:w-3/12 bg-white border border-gray-200 rounded-lg shadow mb-3">
            <Calendar classroomprop={getClassrooms?.data} />
          </div>
          <div className="lg:w-8/12 xl:w-9/12 bg-white border border-gray-200 rounded-lg shadow mb-3 md:mr-4 p-4">
            <h2 className="text-xl font-semibold mb-4">Các Lớp Học Của Tôi</h2>
            <TabClassrooms isLoading={isLoading} isSuccess={isSuccess} isError={isError} classrooms={getClassrooms && getClassrooms.data} />
          </div>
        </div>
      )}
    </>
  );
};
export default DashBoardPage;
