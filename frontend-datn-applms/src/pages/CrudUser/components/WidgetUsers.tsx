import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { User } from "../../../types/User";

import { toast } from "react-toastify";
import { useAddUserMutation } from "../../../service/userAPI";
import AddUserModal, { FormData } from "./addUserModal";
import { columns, options } from "./config";
interface UsersProp {
  users: User[];
  loading: boolean;
}

const WidgetUsers: React.FC<UsersProp> = ({ users = [] }) => {
  const [addUser] = useAddUserMutation();

  const usersClient = users.filter((u) => u.role !== "admin");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: FormData) => {
    try {
      const result = await addUser(data).unwrap();
      console.log({ result });
      if (result.statusCode === 201) {
        toast.success("Thêm người dùng thành công!");
      } else {
        toast.error("Thêm người dùng thất bại!");
      }
    } catch (e) {
      toast.error("Lỗi khi thêm người dùng!");
      console.log(data);
    }
  };
  const headerCard = (title: string) => {
    return <h1 className="text-2xl font-bold">{title}</h1>;
  };
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
      <AddUserModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
      <MUIDataTable
        title={headerCard("Danh sách người dùng")}
        data={usersClient}
        columns={columns()}
        options={options(handleOpen)}
      />
    </div>
  );
};

export default WidgetUsers;
