import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { useRegisterUserMutation } from "../../service/authAPI";
import { VITE_ASSET_URL } from "../../layout/Header/Header";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  repassword: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const {
    handleSubmit,
    setError,
    formState: { errors },
    register,
    control,
    watch,
  } = useForm<RegisterFormData>();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      if (!data.email) {
        setError("email", {
          type: "manual",
          message: "Địa chỉ email không được để trống",
        });
        return;
      }

      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        repassword: data.repassword,
      };

      const user = await registerUser(userData);
      console.log(user);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#91ECE8]">
      <div className="min-h-screen py-8 flex items-center justify-center w-full">
        <div className="flex flex-wrap justify-center text-neutral-800 dark:text-neutral-200 px-5 lg:w-[1000px] md:w-[800px] sm:w-[800px]">
          {/* left */}
          <div
            className="hidden lg:inline-flex items-center  w-full lg:w-6/12 rounded-tl-lg rounded-bl-lg md:w-0"
            style={{
              flex: "1",
              background: "url(./images/Learning.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          {/* right column container */}
          <div className="p-6 sm:p-6 md:p-12md:mx-8 lg:mx-0 lg:w-6/12 bg-white md:w-8/12 sm:w-10/12 rounded-lg lg:rounded-tl-none lg:rounded-bl-none shadow-lg shadow-[#BCBCBC]">
            <div className="mx-auto mt-4">
              <img
                className="w-16 h-16 mx-auto rounded-md"
                src={`${VITE_ASSET_URL}/BeeLMS.png`}
                alt="logo"
              />
            </div>
            <div className="text-[28px] font-bold text-center mt-2">
              <p>Đăng ký tài khoản BeeLMS</p>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="w-full px-4 md:px-10 mx-auto mt-3">
                <div className="rounded-full">
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Địa chỉ email không được để trống",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Địa chỉ email không hợp lệ",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid"
                          placeholder="Địa chỉ email"
                        />
                        {errors.email && (
                          <p className="text-[#F33A58] mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="w-full px-4 md:px-10 mx-auto mt-2">
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Tên đăng nhập không được để trống",
                    minLength: {
                      value: 3,
                      message: "Tên đăng nhập phải chứa ít nhất 3 ký tự",
                    },
                    maxLength: {
                      value: 20,
                      message: "Tên đăng nhập không được quá 20 ký tự",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className=" text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid"
                        placeholder="Tên đăng nhập"
                      />
                      {errors.username && (
                        <p className="text-[#F33A58] mt-1">
                          {errors.username.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="w-full px-4 md:px-10 mx-auto mt-2">
                <input
                  {...register("password", {
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 3,
                      message: "Tên đăng nhập phải chứa ít nhất 3 ký tự",
                    },
                    maxLength: {
                      value: 20,
                      message: "Tên đăng nhập không được quá 20 ký tự",
                    },
                  })}
                  type="password"
                  className={`text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid ${errors.password ? "border-red-500" : ""
                    }`}
                  placeholder="Mật khẩu"
                />
                {errors.password && (
                  <p className="text-[#F33A58] mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full px-4 md:px-10 mx-auto mt-2">
                <input
                  {...register("repassword", {
                    required: "Nhập lại mật khẩu không được để trống",
                    validate: (value) =>
                      value === watch("password") || "Mật khẩu không khớp",
                  })}
                  type="password"
                  className={`text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid ${errors.repassword ? "border-red-500" : ""
                    }`}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.repassword && (
                  <p className="text-[#F33A58] mt-1">
                    {errors.repassword.message}
                  </p>
                )}
              </div>
              <div className="w-full mx-auto mt-4 text-center">
                <div className="px-4 md:px-10">
                  <button className="text-white w-full bg-slate-500 text-1.6 rounded-full bg-[#FC800F] py-[9px]" type="submit">
                    Đăng ký
                  </button>
                </div>
              </div>
            </form>
            <div className="text-sm flex justify-center mt-2">
              <p>Bạn đã có tài khoản? </p>
              <Link to={"/login"}>
                <span className=" text-[#F33A58] pl-1 hover:cursor-pointer">
                  Đăng nhập
                </span>
              </Link>
            </div>
            <div className="text-sm text-center">
              <span className=" text-[#F33A58] pl-1 hover:cursor-pointer">
                Quên mật khẩu
              </span>
            </div>
            <div className="mt-4 text-[11px] mx-auto max-w-max text-center">
              <p>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đã đồng
                ý với
              </p>
              <span className="underline pl-1 hover:cursor-pointer">
                điều khoản sử dụng{" "}
              </span>
              <span>của chúng tôi</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
