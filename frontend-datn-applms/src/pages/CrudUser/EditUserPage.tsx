import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../service/userAPI";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { UploadAvatar } from "../MyAccount/components/uploadAvatar";
import { EditUserForm } from "./components/infoUser";

const EditUserPage: React.FC = () => {
  const { id: _id } = useParams();
  const location = useLocation();
  console.log({ location });
  const {
    data: getUser,
    isLoading,
    isSuccess,
  } = useGetUserQuery(_id as string);

  if (isLoading) {
    console.log("Đang tải");
    return <CircularProgress />;
  }
  if (isSuccess && getUser && getUser.data)
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Paper>
            <UploadAvatar user={getUser.data} />
          </Paper>
        </Grid>
        <Grid item xs={10} sm={8} md={8}>
          <Paper>
            <EditUserForm user={getUser.data}/>
          </Paper>
        </Grid>
      </Grid>
    );
};
export default EditUserPage;
