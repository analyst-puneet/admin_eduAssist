import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  styled
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

// Mock Data
const mockStaffData = [
  { id: 9000, name: "Joe Black", role: "Super Admin" },
  { id: 9002, name: "Shivam Verma", role: "Teacher" },
  { id: 9006, name: "Brandon Heart", role: "Librarian" },
  { id: 9003, name: "William Abbot", role: "Admin" },
  { id: 90006, name: "Jason Sharlton", role: "Teacher" },
  { id: 9004, name: "James Deckar", role: "Accountant" }
];

const roles = ["Super Admin", "Teacher", "Librarian", "Admin", "Accountant"];
const attendanceStatuses = [
  "Present",
  "Late",
  "Absent",
  "Half Day",
  "Holiday",
  "Half Day Second Shift"
];

// Custom Styled Components for Table and Table Cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: theme.spacing(1.5),
  borderBottom: "2px solid #f1f1f1",
  textAlign: "center",
  "&:last-child": {
    borderRight: "none"
  },
  "&:first-child": {
    borderLeft: "none"
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected
  }
}));

const MarkAttendance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(dayjs());
  const [filteredStaff, setFilteredStaff] = useState(mockStaffData);
  const [attendance, setAttendance] = useState({});
  const [bulkStatus, setBulkStatus] = useState(null);

  const handleSearch = () => {
    setFilteredStaff(
      selectedRole === ""
        ? mockStaffData
        : mockStaffData.filter((staff) => staff.role === selectedRole)
    );
  };

  const handleAttendanceChange = (id, field, value) => {
    setBulkStatus(null);
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleBulkStatus = (status) => {
    setBulkStatus(status);
    const updates = {};
    filteredStaff.forEach((staff) => {
      updates[staff.id] = { ...attendance[staff.id], status };
    });
    setAttendance((prev) => ({ ...prev, ...updates }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Staff Attendance
        </Typography>

        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Filter Staff
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth size="small">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="">All Roles</MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <DatePicker
                  label="Attendance Date"
                  value={attendanceDate}
                  onChange={(newDate) => setAttendanceDate(newDate)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  sx={{ height: "40px" }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Bulk Actions
            </Typography>
            <RadioGroup row value={bulkStatus}>
              {attendanceStatuses.map((status) => (
                <FormControlLabel
                  key={status}
                  value={status}
                  control={<Radio size="small" onClick={() => handleBulkStatus(status)} />}
                  label={status}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Staff List */}
        <Typography variant="subtitle1" gutterBottom>
          Staff List ({filteredStaff.length})
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ overflowX: "auto", width: "100%" }}>
          <Table stickyHeader size="small" sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Staff ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Entry Time</StyledTableCell>
                <StyledTableCell>Exit Time</StyledTableCell>
                <StyledTableCell>Note</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.map((staff, index) => (
                <StyledTableRow key={staff.id} hover>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{staff.id}</StyledTableCell>
                  <StyledTableCell>{staff.name}</StyledTableCell>
                  <StyledTableCell>{staff.role}</StyledTableCell>
                  <StyledTableCell>
                    <RadioGroup
                      row
                      value={bulkStatus !== null ? bulkStatus : attendance[staff.id]?.status || ""}
                      onChange={(e) => handleAttendanceChange(staff.id, "status", e.target.value)}
                    >
                      {attendanceStatuses.map((status) => (
                        <FormControlLabel
                          key={status}
                          value={status}
                          control={<Radio size="small" />}
                          label={status}
                        />
                      ))}
                    </RadioGroup>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      size="small"
                      type="time"
                      value={attendance[staff.id]?.entry || ""}
                      onChange={(e) => handleAttendanceChange(staff.id, "entry", e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      size="small"
                      type="time"
                      value={attendance[staff.id]?.exit || ""}
                      onChange={(e) => handleAttendanceChange(staff.id, "exit", e.target.value)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      size="small"
                      placeholder="Remarks"
                      value={attendance[staff.id]?.note || ""}
                      onChange={(e) => handleAttendanceChange(staff.id, "note", e.target.value)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Buttons */}
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/staff-attendance")}
            sx={{
              backgroundColor: "#f57c00",
              color: "#fff",
              px: 4,
              "&:hover": { backgroundColor: "#ef6c00" }
            }}
          >
            Back
          </Button>

          <Button variant="contained" color="primary" size="large" sx={{ px: 4 }}>
            Save Attendance
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default MarkAttendance;
