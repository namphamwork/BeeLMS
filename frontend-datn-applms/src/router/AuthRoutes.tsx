import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../helper/storage";
import { useGetUserInfoQuery } from "../service/userAPI";
import { User } from "../types/User";

const AuthRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useGetUserInfoQuery();
  const userInfo =  getItem("userInfo") as User;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Delay 3 giây

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userInfo) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoutes;
