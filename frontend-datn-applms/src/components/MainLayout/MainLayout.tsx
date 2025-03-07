import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getItem } from "../../helper/storage";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import Sidebar1 from "../../layout/Sidebar/Sidebar1";
import Sidebar2 from "../../layout/Sidebar/Sidebar2";
import SidebarAdmin from "../../layout/SidebarAdmin/SidebarAdmin";
import { User } from "../../types/User";
import { BreadcrumbComponent } from "../Breadcrumbs/Breadcrumbs";

const MainLayout: React.FC = () => {
  const userInfo = getItem("userInfo") as User;
  const role = userInfo?.role as string;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={toggleSidebar} />

      <main className="flex flex-1 mb-1 pt-16">
        <Sidebar1 sidebarVisible={sidebarVisible} />
        {role == "admin" || role=="subadmin" ? <SidebarAdmin role={role} /> : <Sidebar2 />}
        <div className="flex-1 px-4 overflow-hidden">
          <div className="w-full min-h-screen">
            <BreadcrumbComponent />
            <Outlet></Outlet>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
