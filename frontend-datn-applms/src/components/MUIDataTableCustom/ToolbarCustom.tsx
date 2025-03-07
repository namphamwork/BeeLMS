import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const ToolbarCustom: React.FC = () => {
  return (
    <Tooltip title={"Thêm"}>
      <IconButton>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};
