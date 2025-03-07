import React from "react";
import { getItem } from "../../helper/storage";
import { User } from "../../types/User";
import AdminPage from "./AdminPage";
import ClientPage from "./ClientPage";
const HomePage: React.FC = () => {
  const user = getItem("userInfo") as User;
  
  return user && user.role && (
    <>
      {(user.role == 'admin' || user.role == 'subadmin') ? (<AdminPage />) : (<ClientPage />)}
    </>
  )
      
};

export default HomePage;
