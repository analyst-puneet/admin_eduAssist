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
  MenuItem,
  Checkbox
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormControlLabel from "@mui/material/FormControlLabel";

const Breadcrumbs = () => {
  return (
    <Box display="flex" alignItems="center" mb={3}>
      <Typography variant="h6" fontWeight="bold" mr={1}>
        Leave
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
        Leave
      </Typography>
    </Box>
  );
};

const LeaveIndex = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === "dark";

  const leaveData = [
    {
      id: 1,
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "04/22/2025 - 04/26/2025",
      days: 5,
      applyDate: "04/22/2025",
      status: "Pending"
    },
    {
      id: 2,
      staff: "Joe Black",
      type: "Medical Leave",
      leaveDate: "03/10/2025 - 03/15/2025",
      days: 6,
      applyDate: "03/10/2025",
      status: "Approved"
    },
    {
      id: 3,
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "02/18/2025 - 02/21/2025",
      days: 4,
      applyDate: "02/12/2025",
      status: "Pending"
    },
    {
      id: 4,
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "12/21/2024 - 12/24/2024",
      days: 4,
      applyDate: "12/20/2024",
      status: "Pending"
    },
    {
      id: 5,
      staff: "Joe Black",
      type: "Medical Leave",
      leaveDate: "11/01/2024 - 11/05/2024",
      days: 5,
      applyDate: "11/01/2024",
      status: "Approved"
    },
    {
      id: 6,
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "10/24/2024 - 10/26/2024",
      days: 3,
      applyDate: "10/24/2024",
      status: "Disapproved"
    },
    {
      id: 7,
      staff: "Joe Black",
      type: "Casual Leave",
      leaveDate: "09/10/2024 - 09/12/2024",
      days: 3,
      applyDate: "09/10/2024",
      status: "Pending"
    },
    {
      id: 8,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selected, setSelected] = useState([]);

  const filteredData = leaveData.filter(
    (row) =>
      row.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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

  return (
    <Box p={4}>
      <Breadcrumbs />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leaves</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/human_resources/staff-leave/apply")}
        >
          Apply Leave
        </Button>
      </Box>

      <Box
        mb={2}
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
          }
        }}
      >
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              // indeterminate={selected.length > 0 && selected.length < paginatedData.length}
              checked={paginatedData.length > 0 && selected.length === paginatedData.length}
              onChange={handleSelectAllClick}
            />
          }
          label="Select All"
        />

        <Box display="flex" gap={1}>
          <Button variant="contained" color="success">
            Approved
          </Button>
          <Button variant="contained" color="error">
            Disapproved
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
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
            {paginatedData.map((row) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{row.staff}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.leaveDate}</TableCell>
                  <TableCell>{row.days}</TableCell>
                  <TableCell>{row.applyDate}</TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                      <MoreVertIcon sx={{ color: isDarkMode ? "white" : "grey.700" }} />
                    </IconButton>
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(event) => {
                        event.stopPropagation(); // VERY IMPORTANT to stop row click
                        handleClick(event, row.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 1,
            minWidth: 50,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
          }
        }}
        MenuListProps={{
          sx: { py: 0 }
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            padding: "8px 16px"
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleView}
          sx={{
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            padding: "8px 16px"
          }}
        >
          View
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LeaveIndex;
