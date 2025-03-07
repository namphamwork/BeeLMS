import React from "react";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CustomArrowProps } from "react-slick";



const NextArrow: React.FC<CustomArrowProps> = ({onClick}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        zIndex: 2,
        minWidth: 30,
        width: 35,
        backgroundColor: "#fff",
        borderRadius: "50px",
        color: "#ccc",
        boxShadow: "0 3px 6px rgba(0,0,0,.16)",
        "&:hover": {
          backgroundColor: "#fff !important",
        },
      }}
    >
      <ChevronRightIcon
        sx={{
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#fff !important",
          },
        }}
      />
    </Button>
  );
};

export default NextArrow;
