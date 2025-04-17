import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StaffAttendance = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("last7days");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = () => {
    navigate("/staff/mark-attendance");
  };

  // Dummy data (yeh baad me dynamic hoga after attendance marking)
  const attendanceData = [
    {
      date: "2025-04-15",
      totalStaffs: 10,
      present: 8,
      late: 1,
      absent: 1,
      halfDay: 0,
      holiday: 0,
      halfDaySecondShift: 0
    },
    {
      date: "2025-04-14",
      totalStaffs: 10,
      present: 7,
      late: 2,
      absent: 1,
      halfDay: 0,
      holiday: 0,
      halfDaySecondShift: 0
    }
    // ... more rows
  ];

  return (
    <Box p={4}>
      {/* Top Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleChange} label="Filter">
            <MenuItem value="last7days">Last 7 Days</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="last3Months">Last 3 Months</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleClick}>
          Mark Attendance
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Total Staffs</strong>
              </TableCell>
              <TableCell>
                <strong>Present</strong>
              </TableCell>
              <TableCell>
                <strong>Late</strong>
              </TableCell>
              <TableCell>
                <strong>Absent</strong>
              </TableCell>
              <TableCell>
                <strong>Half Day</strong>
              </TableCell>
              <TableCell>
                <strong>Holiday</strong>
              </TableCell>
              <TableCell>
                <strong>Half Day (2nd Shift)</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.totalStaffs}</TableCell>
                <TableCell>{row.present}</TableCell>
                <TableCell>{row.late}</TableCell>
                <TableCell>{row.absent}</TableCell>
                <TableCell>{row.halfDay}</TableCell>
                <TableCell>{row.holiday}</TableCell>
                <TableCell>{row.halfDaySecondShift}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" color="primary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffAttendance;
