import React from "react";
import CourseList from "../../components/CourseList/CourseList";
import MainSlider from "../../components/MainSlider/MainSlider";
const ClientPage: React.FC = () => {
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
      <div className="flex flex-col">
        <div className="w-full ">
          <MainSlider />
        </div>
        <div className="w-full ">
          <CourseList />
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
