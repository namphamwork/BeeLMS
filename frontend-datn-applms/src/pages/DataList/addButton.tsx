import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export const addBtn = (label: string, description: string) => {
  return (
    <Tooltip title={description}>
      <Link to="add">
        <Button variant="contained">{label}</Button>
      </Link>
    </Tooltip>
  );
};
