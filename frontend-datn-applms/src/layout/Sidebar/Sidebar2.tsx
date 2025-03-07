import React from "react";
import { Link } from "react-router-dom";

const Sidebar2: React.FC = () => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="19"
          viewBox="0 0 22 19"
          fill="none"
        >
          <path
            d="M21.1229 9.65234C21.1229 10.2852 20.5955 10.7809 19.9979 10.7809H18.8729L18.8975 16.4094C18.8975 16.5078 18.8904 16.5992 18.8799 16.6941V17.2637C18.8799 18.0406 18.2506 18.6699 17.4736 18.6699H16.9111C16.8725 18.6699 16.8338 18.6383 16.7951 18.6664C16.7459 18.6383 16.6967 18.6699 16.6475 18.6699H14.6611C13.8842 18.6699 13.2549 18.0406 13.2549 17.2637V14.1699C13.2549 13.5477 12.7521 13.0449 12.1299 13.0449H9.87988C9.25762 13.0449 8.75488 13.5477 8.75488 14.1699V17.2637C8.75488 18.0406 8.12559 18.6699 7.34863 18.6699H5.3834C5.33066 18.6699 5.27793 18.6664 5.2252 18.6629C5.18301 18.6664 5.14082 18.6699 5.09863 18.6699H4.53613C3.75953 18.6699 3.12988 18.0406 3.12988 17.2637V13.3262C3.12988 13.2945 3.13094 13.2594 3.13305 13.2277V10.7809H2.00664C1.37277 10.7809 0.879883 10.2852 0.879883 9.65234C0.879883 9.33594 0.985492 9.05469 1.2318 8.80859L10.2455 0.951734C10.4916 0.705148 10.7729 0.669922 11.0189 0.669922C11.265 0.669922 11.5463 0.740375 11.7607 0.916508L20.7361 8.80859C21.0174 9.05469 21.1615 9.33594 21.1229 9.65234Z"
            fill="#1A1A1A"
          />
        </svg>
      ),
      to: "/dashboard",
    },
    // {
    //   label: "Home",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="22"
    //       height="19"
    //       viewBox="0 0 22 19"
    //       fill="none"
    //     >
    //       <path
    //         d="M9.87988 4.04492C9.87988 4.66719 10.3826 5.16992 11.0049 5.16992C11.6271 5.16992 12.1299 4.66719 12.1299 4.04492V1.79492H14.7596C15.7123 1.79492 16.5596 2.39539 16.8795 3.29363L21.0209 14.9855C21.0912 15.1895 21.1299 15.4074 21.1299 15.6254C21.1299 16.6836 20.2686 17.5449 19.2104 17.5449H12.1299V15.2949C12.1299 14.6727 11.6271 14.1699 11.0049 14.1699C10.3826 14.1699 9.87988 14.6727 9.87988 15.2949V17.5449H2.79977C1.73945 17.5449 0.879883 16.6836 0.879883 15.6254C0.879883 15.4074 0.917148 15.1895 0.990027 14.9855L5.13027 3.29363C5.41855 2.39539 6.29746 1.79492 7.2502 1.79492H9.84824L9.87988 4.04492ZM12.1299 8.54492C12.1299 7.92266 11.6271 7.41992 11.0049 7.41992C10.3826 7.41992 9.87988 7.92266 9.87988 8.54492V10.7949C9.87988 11.4172 10.3826 11.9199 11.0049 11.9199C11.6271 11.9199 12.1299 11.4172 12.1299 10.7949V8.54492Z"
    //         fill="#404040"
    //       />
    //     </svg>
    //   ),
    //   to: "",
    //   // subItems: [
    //   //   { label: "Course List", to: "" },
    //   //   { label: "Course Detail", to: "course-detail" },
    //   // ],
    // },
   
    {
      label: "Điểm",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
        </svg>
      ),
      to: "/mark",
    },
    {
      label: "Điểm danh",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
        </svg>
      ),
      to: "/attendance",
    },
    {
      label: "Chat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      to: "/chat",
    },
    // {
    //   label: "Bảng tin",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    //   to: "/post",
    // },
  ];

  return (
    <div className="w-20 hidden sm:block shadow border-e border-gray-200 z-50">
      <div className="sticky top-[4rem] py-3">
        <ul className="space-y-1">
          {menuItems.map((menuItem, index) => (
            <li key={index} className=" rounded-2xl min-h-14 w-full">
              {/* {menuItem.subItems ? (
                <div className="group relative flex justify-center rounded py-2 flex-col items-center z-50">
                  <div className=" flex flex-col items-center w-full">
                    <div className="mx-auto pb-2">{menuItem.icon}</div>
                    <div className="text-xs mx-auto">{menuItem.label}</div>
                  </div>

                  <ul className="absolute start-full opacity-0 group-hover:opacity-100 rounded bg-white px-2 py-1.5 text-xs text-black z-50 ml-2 w-32 shadow-md">
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <li key={subIndex} className="p-2">
                        <Link to={subItem.to}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : ( */}
              <Link
                to={menuItem.to}
                className="group relative flex flex-col py-2 items-center justify-center rounded px-auto w-full"
              >
                <div className="flex flex-col items-center w-full">
                  <button className="mx-auto pb-2 ">{menuItem.icon}</button>
                  <div className="text-xs ">{menuItem.label}</div>
                </div>
              </Link>
              {/* )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar2;
