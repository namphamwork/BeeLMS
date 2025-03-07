import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../../service/authAPI";
import { useUpdateUserMutation } from "../../../service/userAPI";
import { FormData, UserInfoProps } from "../MyAccount";
import { toast } from "react-toastify";
import { hashSync } from "bcrypt-ts";
import {
  confirmPasswordValidator,
  passwordValidator,
} from "../../../helper/validators";

export const ChangePasswordForm: React.FC<UserInfoProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<FormData>();
  const [checkPassword] = useLoginUserMutation();
  const [changePassword] = useUpdateUserMutation();
  const onSubmit = async (data: FormData) => {
    try {
      const result = await checkPassword({
        username: user?.username,
        password: data.passwordCurrent,
      }).unwrap();
      if (result.statusCode !== 200) {
        setError("passwordCurrent", {
          type: "manual",
          message: "Mật khẩu cũ không hợp lệ",
        });
      } else {
        const hashedPassword = hashSync(data.password, 10);
        const resultChange = await changePassword({
          id: user?._id,
          body: { ...user, password: hashedPassword },
        }).unwrap();
        if (resultChange.statusCode !== 200) {
          toast.error("Đổi mật khẩu thất bại. Thử lại");
        } else {
          toast.success("Đổi mật khẩu thành công");
        }
      }
    } catch (e) {
      console.log(e);
      return toast.error("Lỗi API:" + e);
    }
  };

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label
          htmlFor="passwordCurrent"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mật khẩu cũ
        </label>
        <input
          {...register("passwordCurrent", passwordValidator)}
          type="password"
          id="passwordCurrent"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Mật khẩu cũ của bạn"
          // required
        />
        {errors.passwordCurrent && (
          <span className="text-red-500">{errors.passwordCurrent.message}</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mật khẩu mới
          </label>
          <input
            placeholder="Mật khẩu mới "
            {...register("password", passwordValidator)}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nhập lại mật khẩu mới
          </label>
          <input
            placeholder="Nhập lại phải trùng khớp với mật khẩu mới"
            {...register("confirmPassword", {
              ...confirmPasswordValidator,
              validate: confirmPasswordValidator.validate.bind(null, {
                getValues,
              }),
            })}
            type="password"
            id="confirmPassword"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Đổi mật khẩu
      </button>
    </form>
  );
};
