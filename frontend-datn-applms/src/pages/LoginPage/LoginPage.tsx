import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setCredentials } from "../../service/authSlice";
import { LoginResponse } from "../../types/LoginResponse";
import { useLoginUserMutation } from "../../service/authAPI";
import { VITE_ASSET_URL } from "../../layout/Header/Header";
interface LoginData {
  username?: string;
  phone?: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"username" | "phone">("username");
  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,

  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      if (
        (loginType && data.username && data.password) ||
        (loginType && data.phone && data.password)
      ) {
        const username: string =
          loginType === "username" ? data.username || "" : data.phone || "";

        const result: LoginResponse = await loginUser({
          username,
          password: data.password,
        }).unwrap();
        // console.log({result})
        if (result.statusCode == 200) {
          dispatch(
            setCredentials({
              token: result?.data.access_token,
              refreshToken: result?.data.refresh_token,
            })
          );

          toast.success("Đăng nhập thành công");
          navigate("/");
          // window.location.href = '/'
        } else {
          setError("password", { type: "incorrect" });
          setError("username", { type: "incorrect" });
          toast.error("Đăng nhập thất bại: Sai tên tài khoản hoặc mật khẩu");
        }
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      console.log("Something went wrong in onSubmit function: ", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#91ECE8]">
      <div className="min-h-screen py-8 flex items-center justify-center w-full">
        <div className="flex flex-wrap justify-center text-neutral-800 dark:text-neutral-200 px-5 lg:w-[1000px] md:w-[800px] sm:w-[800px]">
          {/* left */}
          <div
            className="hidden lg:inline-flex items-center w-full lg:w-6/12 rounded-tl-lg rounded-bl-lg md:w-0"
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
              <p>Đăng nhập vào BeeLMS</p>
            </div>
            <div className="text-[13px] mt-2 text-[#F33A58] mx-auto max-w-max text-center mb-4">
              <p>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều
                người sử dụng chung có thể sẽ bị khóa.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="h-[270px] overflow-hidden">
              <div className="w-full px-4 md:px-10 mx-auto mt-3">
                <div className="flex justify-between mt-3">
                  <p
                    className={`text-sm cursor-pointer ${loginType === "username" ? "font-bold" : ""
                      }`}
                    onClick={() => setLoginType("username")}
                  >
                    Tên Đăng Nhập
                  </p>
                  <p
                    className={`text-sm cursor-pointer ${loginType === "phone" ? "font-bold" : ""
                      }`}
                    onClick={() => setLoginType("phone")}
                  >
                    Đăng nhập với SĐT
                  </p>
                </div>
                {loginType === "username" ? (
                  <div className="rounded-full">
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
                            className="text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid"
                            placeholder="Tên đăng nhập"
                          />
                          {errors.username && (
                            <p className="text-[#F33A58] mt-1">
                              {errors.username.message}{" "}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                ) : (
                  <div className="rounded-full">
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Số điện thoại không được để trống",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className="text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid"
                            placeholder="Số điện thoại"
                          />
                          {errors.phone && (
                            <p className="text-[#F33A58] mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="w-full px-4 md:px-10 mx-auto mt-2">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Mật khẩu không được để trống",
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="password"
                        className="text-1.6 pr-[5px] w-full rounded-full pl-[20px] py-[9px] mt-2 border-gray-500 border-[1px] border-solid"
                        placeholder="Mật khẩu"
                      />
                      {errors.password && (
                        <p className="text-[#F33A58] mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="w-full mt-2">
                <div className="px-4 md:px-10">
                  <button className="bg-slate-500 text-white text-1.6 rounded-full bg-[#FC800F] py-[9px] w-full" type="submit"
                    disabled={isLoading}>
                    {isLoading ? "Đang đăng nhập" : "Đăng nhập"}
                  </button>
                  {isError && (
                    <p className="text-[#F33A58] mt-2">
                      Đăng nhập thất bại.{" "}
                      {typeof isError === "string"
                        ? isError
                        : "Vui lòng kiểm tra thông tin đăng nhập."}
                    </p>
                  )}
                </div>
              </div>
            </form>
            <div className="text-sm flex justify-center mt-2">
              <p>Bạn chưa có tài khoản? </p>
              <Link to={"/register"}>
                <span className=" text-[#F33A58] pl-1 hover:cursor-pointer">
                  Đăng ký
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

export default LoginPage;
