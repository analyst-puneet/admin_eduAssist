import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StaffAttendance = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/staff/mark-attendance");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Button variant="contained" color="primary" size="large" onClick={handleClick}>
        Mark Attendance
      </Button>
    </Box>
  );
};

export default StaffAttendance;
