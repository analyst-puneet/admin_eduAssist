import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  IconButton,
  TablePagination,
  TextField
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

const LeaveIndex = () => {
  const navigate = useNavigate();
  const leaveData = [
    {
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "04/22/2025 - 04/26/2025",
      days: 5,
      applyDate: "04/22/2025",
      status: "Pending"
    },
    {
      staff: "Joe Black",
      type: "Medical Leave",
      leaveDate: "03/10/2025 - 03/15/2025",
      days: 6,
      applyDate: "03/10/2025",
      status: "Approved"
    },
    {
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "02/18/2025 - 02/21/2025",
      days: 4,
      applyDate: "02/12/2025",
      status: "Pending"
    },
    {
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "12/21/2024 - 12/24/2024",
      days: 4,
      applyDate: "12/20/2024",
      status: "Pending"
    },
    {
      staff: "Joe Black",
      type: "Medical Leave",
      leaveDate: "11/01/2024 - 11/05/2024",
      days: 5,
      applyDate: "11/01/2024",
      status: "Approved"
    },
    {
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "10/24/2024 - 10/26/2024",
      days: 3,
      applyDate: "10/24/2024",
      status: "Disapproved"
    },
    {
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "09/10/2024 - 09/12/2024",
      days: 3,
      applyDate: "09/10/2024",
      status: "Pending"
    },
    {
      staff: "Joe Black",
      type: "Medical Leave",
      leaveDate: "05/15/2024 - 05/18/2024",
      days: 4,
      applyDate: "05/15/2024",
      status: "Approved"
    }
  ];

  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return <Chip label="Approved" color="success" />;
      case "Pending":
        return <Chip label="Pending" color="warning" />;
      case "Disapproved":
        return <Chip label="Disapproved" sx={{ backgroundColor: "#e91e63", color: "white" }} />;
      default:
        return <Chip label={status} />;
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered + Paginated Data
  const filteredData = leaveData.filter(
    (row) =>
      row.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset page when search updates
  };

  return (
    <Box p={4}>
      {/* Top Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leaves</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/apply")}>
          Apply Leave
        </Button>
      </Box>

      {/* Search Field */}
      <Box mb={2}>
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Staff</strong>
              </TableCell>
              <TableCell>
                <strong>Leave Type</strong>
              </TableCell>
              <TableCell>
                <strong>Leave Date</strong>
              </TableCell>
              <TableCell>
                <strong>Days</strong>
              </TableCell>
              <TableCell>
                <strong>Apply Date</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.staff}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.leaveDate}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>{row.applyDate}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                  <IconButton size="small">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default LeaveIndex;
