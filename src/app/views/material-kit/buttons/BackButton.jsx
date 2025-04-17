// components/BackButton.jsx
import React from "react";
import Button from "@mui/material/Button";

const BackButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        height: "35px",
        minWidth: "70px",
        alignSelf: "center"
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
