import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { emailValidator, phoneValidator } from "../../../helper/validators";
import { useUpdateUserMutation } from "../../../service/userAPI";
import { FormData, UserInfoProps } from "../../MyAccount/MyAccount";
import { getItem } from "../../../helper/storage";
import { UserInfo } from "../../../types/User";

export const EditUserForm: React.FC<UserInfoProps> = ({ user }) => {
  const userInfo = getItem("userInfo") as UserInfo;

  //   if(userInfo.role == "admin"){

  //   }
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // } = useForm<FormData>({defaultValues: async () => await fetch('/api') });
  } = useForm<FormData>();

  // const dispatch = useDispatch()
  const onSubmitData = async (data: FormData) => {
    try {
      const result = await updateUser({ id: user?._id, body: data }).unwrap();
      console.log(result);
      if (result.statusCode !== 200) {
        toast.error("Cập nhật thông tin thất bại!");
      } else {
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (e) {
      //   console.log("Lỗi api: ", e);
      toast.error("Cập nhật thông tin thất bại!");
    }
  };
  return (
    <Card>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <h1 className="text-sm text-center my-3 font-semibold">
          THÔNG TIN CẬP NHẬT
        </h1>
      </Box>
      <Divider />
      <CardContent>
        <form className="mx-auto" onSubmit={handleSubmit(onSubmitData)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ email
              </label>
              <input
                {...register("email", emailValidator)}
                defaultValue={user?.email}
                type="text"
                id="email"
                className={`shadow-sm bg-gray-50 border ${
                  errors.email
                    ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light`}
                placeholder="Nhập tên email của bạn"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vai trò
              </label>
              {userInfo.role === "admin" ? (
                <select
                  {...register("role")}
                  id="role"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={user?.role}
                >
                  <option value="learner" selected={user?.role === "learner"}>
                    Học viên
                  </option>
                  <option
                    value="instructor"
                    selected={user?.role === "instructor"}
                  >
                    Giảng viên
                  </option>
                  <option value="subadmin" selected={user?.role === "subadmin"}>
                    Nhân viên quản trị
                  </option>
                  <option value="admin" selected={user?.role === "admin"}>
                    Quản trị viên
                  </option>
                </select>
              ) : (
                <select
                  {...register("role")}
                  id="role"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={user?.role}
                  disabled
                >
                  <option value="learner" selected={user?.role === "learner"}>
                    Học viên
                  </option>
                  <option
                    value="instructor"
                    selected={user?.role === "instructor"}
                  >
                    Giảng viên
                  </option>
                  <option value="subadmin" selected={user?.role === "subadmin"}>
                    Nhân viên quản trị
                  </option>
                  <option value="admin" selected={user?.role === "admin"}>
                    Quản trị viên
                  </option>
                </select>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mã{" "}
                {user?.role === "learner"
                  ? "sinh viên"
                  : user?.role === "instructor"
                  ? "giảng viên"
                  : "quản trị viên"}
              </label>
              <input
                {...register('code')}
                defaultValue={user?.code}
                type="text"
                id="code"
                className={`shadow-sm bg-gray-50 border ${
                  errors.code
                    ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light`}
              />
              {errors.code && (
                <span className="text-red-500 text-sm">
                  {errors.code.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Họ và tên{" "}
                {user?.role === "learner"
                  ? "sinh viên"
                  : user?.role === "instructor"
                  ? "giảng viên"
                  : "quản trị viên"}
              </label>
              <input
                {...register("fullname")}
                defaultValue={user?.fullname}
                type="text"
                id="fullName"
                className={`shadow-sm bg-gray-50 border ${
                  errors.fullname
                    ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light`}
              />
              {errors.fullname && (
                <span className="text-red-500 text-sm">
                  {errors.fullname.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại{" "}
                {user?.role === "learner"
                  ? "sinh viên"
                  : user?.role === "instructor"
                  ? "giảng viên"
                  : "quản trị viên"}
              </label>
              <input
                {...register("phone", phoneValidator)}
                defaultValue={user?.phone}
                type="text"
                id="phone"
                className={`shadow-sm bg-gray-50 border ${
                  errors.phone
                    ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ{" "}
                {user?.role === "learner"
                  ? "sinh viên"
                  : user?.role === "instructor"
                  ? "giảng viên"
                  : "quản trị viên"}
              </label>
              <input
                {...register("address")}
                defaultValue={user?.address}
                type="text"
                id="address"
                className={`shadow-sm bg-gray-50 border ${
                  errors.address
                    ? "border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:shadow-sm-light`}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <CardActions className="flex justify-end">
            <input type="submit" style={{ display: "none" }} id="saveChanges" />
            <label htmlFor="saveChanges">
              <Button variant="contained" component="span">
                Lưu thay đổi
              </Button>
            </label>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};
