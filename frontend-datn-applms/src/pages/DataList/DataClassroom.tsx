import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmModal } from "../../components/Modal/Confirm";
import {
  useDeleteClassroomMutation,
  useGetClassroomsQuery,
  useUpdateStatusActiveClassroomMutation,
  useUpdateStatusDeleteClassroomMutation,
} from "../../service/api";
import { Classroom } from "../../types/Classroom";
import { columns, options } from "./configTableClassroom";
import { useAddChatRoomMutation } from "../../service/chatAPI";

const DataClassroom: React.FC = () => {
  const { data: allclass, error, isLoading, refetch } = useGetClassroomsQuery();
  const [classroomStates, setClassroomStates] = useState<Classroom[]>([]);
  const [updateClassRoomStatusActive] =
    useUpdateStatusActiveClassroomMutation();
  const [updateClassRoomStatusDelete] =
    useUpdateStatusDeleteClassroomMutation();

  const [addChatRoom,] = useAddChatRoomMutation();
  const [deleteClassroom] = useDeleteClassroomMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (allclass) {
      setClassroomStates(allclass.data || []);
    }
  }, [allclass]);

  const handleChange = async (classId: string) => {
    await addChatRoom({ classroomId: classId }).unwrap();
    const updatedClassroom = classroomStates.map((classroom) => {
      if (classroom._id === classId) {
        const updatedClassroom = { ...classroom };
        updatedClassroom.isActive = !updatedClassroom.isActive;

        updateClassRoomStatusActive({
          id: updatedClassroom._id,
          isActive: updatedClassroom.isActive,
        }).unwrap();

        return updatedClassroom;
      }
      return classroom;
    });

    setClassroomStates(updatedClassroom);
    refetch();
  };

  const handleSwitchChange = async (classId: string) => {
    setSelectedClassroomId(classId);
    setShowSwitchModal(true);
  };

  const handleConfirmSwitchChange = async () => {
    if (selectedClassroomId) {
      handleChange(selectedClassroomId);
      setShowSwitchModal(false);
    }
  };

  const handleEditClick = (classId: string) => {
    setSelectedClassroomId(classId);
    setShowDeleteModal(true);
  };

  const handleDeleteClick = async () => {
    if (selectedClassroomId) {
      try {
        const selectedClassroom = classroomStates.find(
          (classroom) => classroom._id === selectedClassroomId
        );
        if (selectedClassroom) {
          if (selectedClassroom.isActive) {
            // Nếu lớp học đã được kích hoạt, cập nhật trạng thái isDeleted thành true
            await updateClassRoomStatusDelete({
              id: selectedClassroomId,
              isDelete: true,
            }).unwrap();
            const updatedClassrooms = classroomStates.map((classroom) => {
              if (classroom._id === selectedClassroomId) {
                return { ...classroom, isDeleted: true };
              }
              return classroom;
            });
            setClassroomStates(updatedClassrooms);
            setShowDeleteModal(false);
            toast.success("Cập nhật trạng thái lớp học thành công!");
          } else {
            // Nếu lớp học chưa được kích hoạt, xóa lớp học khỏi cơ sở dữ liệu
            await deleteClassroom(selectedClassroomId).unwrap();
            const updatedClassrooms = classroomStates.filter(
              (classroom) => classroom._id !== selectedClassroomId
            );
            setClassroomStates(updatedClassrooms);
            setShowDeleteModal(false);
            toast.success("Xóa lớp học thành công!");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
    return <h1 className="text-2xl font-bold">{title}</h1>;
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
      <MUIDataTable
        title={headerCard("Danh sách lớp học")}
        data={classroomStates}
        columns={columns(classroomStates, handleSwitchChange, handleEditClick)}
        options={options}
      />

      <ConfirmModal
        title="Xác nhận xoá"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 flex items-center text-red-500 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        }
        colorButton="bg-red-500 border-red-500 hover:bg-red-600"
        description="Bạn có chắc muốn xoá lớp học này không?"
        onSuccess={handleDeleteClick}
        onCancel={() => setShowDeleteModal(false)}
        isShow={showDeleteModal}
      />

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
        description="Bạn có chắc muốn cập nhật trạng thái của lớp học này không?"
        onSuccess={handleConfirmSwitchChange}
        onCancel={() => setShowSwitchModal(false)}
        onBackdrop={() => setShowSwitchModal(false)}
        isShow={showSwitchModal}
      />
    </div>
  );
};

export default DataClassroom;
