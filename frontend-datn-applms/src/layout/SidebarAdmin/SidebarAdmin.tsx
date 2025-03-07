import React from "react";
import { Link } from "react-router-dom";

import { menuItems } from "./listItems";

interface PropsType {
  role: string
}

const SidebarAdmin: React.FC<PropsType> = ({role}: PropsType) => {
  
  return (
    <div className="w-20 hidden sm:block shadow border-e border-gray-200 z-50">
      <div className="sticky top-[4rem] py-3">
        <ul className="space-y-1">
          {menuItems.map((menuItem, index) => {

            if (role === "subadmin" && menuItem.label === "Người dùng") {
              return null;
            }

            return (
              <li key={index} className=" rounded-2xl min-h-14 w-full">
                <Link
                  to={menuItem.to}
                  className="group relative flex flex-col py-2 items-center justify-center rounded px-auto w-full"
                >
                  <div className="flex flex-col items-center w-full">
                    <button className="mx-auto pb-2 ">{menuItem.icon}</button>
                    <div className="text-xs ">{menuItem.label}</div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
