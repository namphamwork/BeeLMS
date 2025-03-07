import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { TabsContext } from "@material-tailwind/react/components/Tabs/TabsContext";
import {
  Box,
  Grid,
  Paper,
  Tab
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetUserInfoQuery
} from "../../service/userAPI";
import { User } from "../../types/User";
import { ChangePasswordForm } from "./components/changePassword";
import { ProfileForm } from "./components/profile";
import { UploadAvatar } from "./components/uploadAvatar";
export interface UserInfoProps {
  user: User;
}

export type FormData = {
  username:string;
  email: string;
  password: string;
  passwordCurrent: string;
  confirmPassword: string;
  code: string;
  fullname: string;
  phone: string;
  address: string;
  role:string;
};


const MyAccountPage: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  const [userInfo, setUserInfo] = useState<User>();
  const { data: getUserInfo } = useGetUserInfoQuery();
  useEffect(() => {
    if (getUserInfo && getUserInfo.data) {
      setUserInfo(getUserInfo.data);
    }
  }, [getUserInfo]);
  return (
    userInfo && (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <UploadAvatar user={userInfo} />
          </Paper>
        </Grid>
        <Grid item xs={10} sm={8} md={8}>
          <Paper>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Thông tin tài khoản" value="1" />
                  <Tab label="Đổi mật khẩu" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ProfileForm user={userInfo} />
              </TabPanel>
              <TabPanel value="2">
                <ChangePasswordForm user={userInfo} />
              </TabPanel>
            </TabContext>
          </Paper>
        </Grid>
      </Grid>
    )
  );
};

export default MyAccountPage;
