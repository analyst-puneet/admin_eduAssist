import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
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
  TextField,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Breadcrumbs = () => {
  return (
    <Box display="flex" alignItems="center" mb={3}>
      <Typography variant="h6" fontWeight="bold" mr={1}>
        Leave Type
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
        Leave Type
      </Typography>
    </Box>
  );
};

const LeaveType = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === "dark";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEdit = () => {
    console.log("Edit clicked for:", selectedRow);
    handleMenuClose();
  };

  const handleView = () => {
    console.log("View clicked for:", selectedRow);
    handleMenuClose();
  };

  // 🔹 Dummy Data
  const data = [
    {
      code: "LT001",
      name: "Casual Leave",
      balance: "Yes",
      sequence: "1",
      status: "Active"
    },
    {
      code: "LT002",
      name: "Sick Leave",
      balance: "No",
      sequence: "2",
      status: "Inactive"
    },
    {
      code: "LT003",
      name: "Paid Leave",
      balance: "Yes",
      sequence: "3",
      status: "Active"
    }
  ];

  // 🔍 Search Filter
  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Breadcrumbs />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leave Types</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/leave-master/type/create")}
        >
          Add Leave Type
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            borderColor: isDarkMode ? "white" : "grey.500",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? "white" : "grey.500"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? "white" : "grey.700"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? "white" : "primary.main"
            },
        
            }
          }
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Code</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Balance</strong>
              </TableCell>
              <TableCell>
                <strong>Sequence</strong>
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
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.balance}
                      color={row.balance === "Yes" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.sequence}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </Box>
  );
};

export default LeaveType;
