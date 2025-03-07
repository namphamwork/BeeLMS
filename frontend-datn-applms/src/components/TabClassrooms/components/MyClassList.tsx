import React, { useState } from "react";
import { Classroom } from "../../../types/Classroom";
import { ClassroomItem } from "./ClassroomItem";
import { EmptyState } from "../../EmptyState";

interface Props {
  classrooms: Classroom[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const MyClassList: React.FC<Props> = ({
  classrooms,
  isSuccess,
  isLoading,
  isError,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClassrooms = classrooms.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  //Xét điều kiện:
  // Loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Error
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }

  // Success && Empty
  if (isSuccess && classrooms.length === 0) {
    return <EmptyState />;
  }

  // Success && Full
  if (isSuccess && classrooms.length > 0) {
    return (
      <div>
        <div className="grid gap-5 row-gap-5 mb-8 grid-cols-1 xl:grid-cols-2">
          {currentClassrooms.map((classroom, index) => (
            <ClassroomItem item={classroom} index={index} key={index} />
          ))}
        </div>
        {/* Phân trang */}
        <div className="flex justify-center mt-3">
          <div className="inline-flex items-center justify-center gap-3">
            {/* Nút trang trước */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1} // Vô hiệu hóa nút nếu đang ở trang đầu tiên
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Previous Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Hiển thị số trang */}
            <p className="text-xs text-gray-900">
              {currentPage} / {Math.ceil(classrooms.length / itemsPerPage)}
            </p>

            {/* Nút trang tiếp theo */}
            <button
              onClick={nextPage}
              disabled={indexOfLastItem >= classrooms.length} // Vô hiệu hóa nút nếu đang ở trang cuối cùng
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MyClassList;
