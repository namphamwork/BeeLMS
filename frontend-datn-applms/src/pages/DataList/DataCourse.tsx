import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ConfirmModal } from "../../components/Modal/Confirm";
import { useGetCoursesQuery, useUpdateCourseMutation } from "../../service/api";
import { Course } from "../../types/Course";
import { columns, options } from "./configTableCourse";

const DataCourse: React.FC = () => {
  const { data: allCourses, error, isLoading, refetch } = useGetCoursesQuery();
  const [courses, setCourses] = useState<Course[]>([]);
  const [updateCourseStatus] = useUpdateCourseMutation();
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchModalCourseId, setSwitchModalCourseId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (allCourses) {
      setCourses(allCourses.data || []);
    }
  }, [allCourses]);

  const handleChange = async (courseId: string) => {
    const updatedCourses = courses.map((course) => {
      if (course._id === courseId) {
        const updatedCourse = { ...course };
        updatedCourse.isActive = !updatedCourse.isActive;
        updateCourseStatus({
          id: updatedCourse._id,
          body: {
            isActive: updatedCourse.isActive,
            title: updatedCourse.title,
            description: updatedCourse.description,
          },
        });
        return updatedCourse;
      }
      return course;
    });

    setCourses(updatedCourses);
    refetch();
  };

  const handleSwitchChange = (courseId: string) => {
    setSwitchModalCourseId(courseId);
    setSwitchModalVisible(true);
  };

  const handleConfirmSwitchChange = async () => {
    if (switchModalCourseId) {
      handleChange(switchModalCourseId);
      setSwitchModalVisible(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    return <p>Error: {errorMessage}</p>;
  }

  const headerCard = (title: string) => {
    return (
      <h1 className=" text-left font-bold text-2xl">
        {title}
      </h1>
    );
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
      
      <MUIDataTable
        title={headerCard("Danh sách khóa học")}
        data={courses}
        columns={columns(courses, handleSwitchChange)}
        options={options}
      />

      {switchModalVisible && (
        <ConfirmModal
          title="Xác nhận cập nhật"
          icon={
            <svg
              className="w-16 h-16 flex items-center text-green-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          colorButton="bg-green-500 border-green-500 hover:bg-green-600"
          description="Bạn có thực sự muốn cập nhật trạng thái của khóa học? Quá trình này không thể hoàn tác."
          isShow={switchModalVisible}
          onSuccess={handleConfirmSwitchChange}
          onCancel={() => setSwitchModalVisible(false)}
          onBackdrop={() => setSwitchModalVisible(false)}
        />
      )}
    </div>
  );
};

export default DataCourse;
