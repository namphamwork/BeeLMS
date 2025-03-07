import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem } from "../helper/storage";
import { useGetUserInfoQuery } from "../service/userAPI";
import { User } from "../types/User";

const PrivateRoutes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useGetUserInfoQuery();
  const userInfo = getItem("userInfo") as User;
  const access_token = getItem("access_token");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!userInfo || !access_token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;