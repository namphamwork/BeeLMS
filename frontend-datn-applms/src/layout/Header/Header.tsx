import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { urlUpload } from "../../constant/config";

import { Divider } from "@mui/material";
import { getItem } from "../../helper/storage";
import { logOut } from "../../service/authSlice";
import { User } from "../../types/User";
import { useGetUserInfoQuery } from "../../service/userAPI";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const VITE_ASSET_URL = import.meta.env.VITE_ASSET_URL;

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  function handleLogout(): void {
    dispatch(logOut());
  }

  const [userInfo, setUserInfo] = useState<User>();
  const { data: getUserInfo } = useGetUserInfoQuery();
  useEffect(() => {
    if (getUserInfo && getUserInfo.data) {
      setUserInfo(getUserInfo.data);
    }
  }, [getUserInfo]);
  const user = getItem("userInfo") as User;

  const renderRoleTxt = () => {
    if (user?.role == "learner") {
      return <span>Sinh viên</span>;
    }
    if (user?.role == "instructor") {
      return <span>Giảng viên</span>;
    }
    if (user?.role == "admin") {
      return <span>Quản trị viên</span>;
    }
    if (user?.role == "subadmin") {
      return <span>Nhân viên quản trị</span>;
    }
  };
  return (
    <>
      <nav className="bg-white h-16 flex flex-initial items-center w-full fixed top-0 z-[200] shadow">
        <div className="md:w-72 flex justify-between items-center w-full h-full">
          <span>
            <Link to={""}>
              <img
                src={`${VITE_ASSET_URL}/BeeLms.jpg`}
                className="w-44 md:w-44 lg:w-48 xl:w-52"
                alt="Logo"
              />
            </Link>
          </span>

          <div className="p-2.5">
            <button
              className="block md:hidden shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              onClick={onToggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:flex justify-between flex-1 px-3 hidden">
          <div className="relative hidden lg:block">
            <input
              className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4"
              id="search"
              type="search"
              placeholder="Từ khóa tìm kiếm"
              autoComplete="off"
            />

            <button
              type="button"
              className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <div className="hidden flex-1 items-center justify-between gap-8 sm:justify-end sm:flex">
            <div className="flex gap-4">

              <Link
                to="#"
                className="block shrink-0 rounded-lg p-2.5 bg-white  text-gray-600 shadow-sm hover:text-gray-700 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </Link>

              <Link
                to="#"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </Link>
            </div>

            <div className="relative" onClick={() => setOpen(!open)}>
              <div className="group flex items-center">
                <img
                  alt="avatar Notfound"
                  src={
                    userInfo && userInfo?.avatar == "avatar.png"
                      ? `${VITE_ASSET_URL}/avatar.png`
                      : urlUpload + "/images/" + userInfo?.avatar
                  }
                  className="h-10 w-10 rounded-full object-cover"
                />

                <p className="ms-2 hidden text-left text-xs sm:block">
                  <strong className="block font-medium">
                    {userInfo && userInfo?.fullname !== ""
                      ? userInfo?.fullname
                      : userInfo?.username}
                  </strong>
                  <span className="text-gray-500"> {renderRoleTxt()}</span>
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {open && (
                <div
                  className="absolute right-0 z-10 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <Link
                    to={`/myAccount`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>Thông tin tài khoản</span>
                  </Link>
                  {user?.role == "instructor" && (
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Quản trị
                    </Link>
                  )}
                  <Divider />
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          id="dropdownDefaultButton"
          className=" font-medium rounded-lg text-sm p-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:hidden"
          type="button"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
        </button>
      </nav>
      <div
        className={`fixed w-full bg-white z-[90] shadow-xl ${
          isDropdownOpen ? "dropdown-header-open" : "dropdown-header-close"
        }`}
      >
        <div className="relative block md:hidden p-2">
          <label className="sr-only" htmlFor="search">
            {" "}
            Search{" "}
          </label>
          <input
            className="h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
            id="search"
            type="search"
            placeholder="Từ khóa tìm kiếm"
          />

          <button
            type="button"
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
