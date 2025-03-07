import { Alert, AlertTitle, Box, Stack } from "@mui/material";
import React from "react";
import { useGetUsersQuery } from "../../service/userAPI";
import WidgetUsers from "./components/WidgetUsers";

const ListUsersPage: React.FC = () => {
  const {
    data: getUsers,
    isSuccess: loadedU,
    isLoading: loadingU,
    isError: errorU,
  } = useGetUsersQuery();
  return (
    <div>
      <Box>
        {errorU ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          </Stack>
        ) : (
          <WidgetUsers loading={loadingU} users={loadedU && getUsers ? getUsers.data : []} />
        )}
      </Box>
    </div>
  );
};
export default ListUsersPage;
