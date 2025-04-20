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
  Paper,
  TextField,
  IconButton
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

dayjs.extend(isBetween);

const Breadcrumbs = () => (
  <Box display="flex" alignItems="center" mb={3}>
    <Typography variant="h6" fontWeight="bold" mr={1}>
      Attendance
    </Typography>
    <Typography color="textSecondary" mx={1}>
      |
    </Typography>
    <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
      <HomeIcon color="primary" fontSize="small" />
    </Link>
    <ChevronRightIcon color="disabled" fontSize="small" />
    <Typography
      sx={{
        color: "text.secondary",
        borderBottom: "2px solid purple",
        fontWeight: 500
      }}
    >
      Attendance
    </Typography>
  </Box>
);

const StaffAttendance = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [filter, setFilter] = useState("last7days");
  const [customDate, setCustomDate] = useState({ from: "", to: "" });

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDateChange = (e) => {
    setCustomDate({ ...customDate, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    navigate("/human_resources/staff/mark-attendance");
  };

  const handleEdit = (row) => {
    console.log("Edit row:", row);
    // navigate(`/edit/${row.date}`); // Example
  };

  const handleView = (row) => {
    console.log("View row:", row);
    // navigate(`/view/${row.date}`); // Example
  };

  const inputStyle = {
    "& .MuiInputBase-root": {
      height: "40px", // height fix
      fontSize: "0.875rem"
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
      fontSize: "0.875rem",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)"
      }
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : theme.palette.grey[500]
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : theme.palette.grey[700]
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : theme.palette.primary.main
    },
    margin: "0.25rem 0"
  };

  const attendanceData = [
    {
      date: "2025-04-18",
      totalStaffs: 10,
      present: 8,
      late: 1,
      absent: 1,
      halfDay: 0,
      holiday: 0,
      halfDaySecondShift: 0
    },
    {
      date: "2025-04-15",
      totalStaffs: 10,
      present: 7,
      late: 2,
      absent: 1,
      halfDay: 0,
      holiday: 0,
      halfDaySecondShift: 0
    }
  ];

  const getFilteredData = () => {
    const today = dayjs();
    switch (filter) {
      case "last7days":
        return attendanceData.filter((item) => dayjs(item.date).isAfter(today.subtract(7, "day")));
      case "lastWeek": {
        const startOfLastWeek = today.subtract(1, "week").startOf("week").add(1, "day");
        const endOfLastWeek = today.subtract(1, "week").endOf("week").add(1, "day");
        return attendanceData.filter((item) =>
          dayjs(item.date).isBetween(startOfLastWeek, endOfLastWeek, null, "[]")
        );
      }
      case "lastMonth":
        return attendanceData.filter((item) =>
          dayjs(item.date).isAfter(today.subtract(1, "month"))
        );
      case "last3Months":
        return attendanceData.filter((item) =>
          dayjs(item.date).isAfter(today.subtract(3, "month"))
        );
      case "custom":
        if (customDate.from && customDate.to) {
          const from = dayjs(customDate.from);
          const to = dayjs(customDate.to);
          return attendanceData.filter((item) => dayjs(item.date).isBetween(from, to, null, "[]"));
        }
        return [];
      default:
        return attendanceData;
    }
  };

  const filteredData = getFilteredData();

  return (
    <Box p={4}>
      <Breadcrumbs />

      {/* Top Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <FormControl variant="outlined" sx={{ minWidth: 200, ...inputStyle }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleChange} label="Filter">
            <MenuItem value="last7days">Last 7 Days</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="last3Months">Last 3 Months</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>

        {filter === "custom" && (
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              sx={inputStyle}
              type="date"
              label="From"
              name="from"
              value={customDate.from}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={inputStyle}
              type="date"
              label="To"
              name="to"
              value={customDate.to}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}

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
                <strong>Half Day (2nd Shift)</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.totalStaffs}</TableCell>
                  <TableCell>{row.present}</TableCell>
                  <TableCell>{row.late}</TableCell>
                  <TableCell>{row.absent}</TableCell>
                  <TableCell>{row.halfDay}</TableCell>

                  <TableCell>{row.halfDaySecondShift}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        onClick={() => handleEdit(row)}
                        size="small"
                        color="inherit" // This will automatically adapt to theme
                      >
                        <CiEdit size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleView(row)}
                        size="small"
                        color="inherit" // This will automatically adapt to theme
                      >
                        <IoEyeOutline size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffAttendance;
