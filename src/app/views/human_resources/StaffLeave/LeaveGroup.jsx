import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Chip,
  TablePagination,
  Menu
} from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
        Leave Group
      </Typography>
    </Box>
  );
};

export default function LeaveTypeTransaction() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Static table data
  const tableRows = [
    { id: 1, groupName: "Regular Teacher", status: "ACTIVE" },
    { id: 2, groupName: "Adhoc Teacher", status: "ACTIVE" },
    { id: 3, groupName: "Regular Non Teaching", status: "INACTIVE" },
    { id: 4, groupName: "Contract Staff", status: "ACTIVE" },
    { id: 5, groupName: "Administrative Staff", status: "ACTIVE" },
    { id: 6, groupName: "Support Staff", status: "INACTIVE" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setGroupName("");
    setStatus("ACTIVE");
  };

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

  const filteredRows = tableRows.filter((row) =>
    row.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Breadcrumbs />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Leave Groups</Typography>
       
      </Box>

      {/* Form Card */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Add New Leave Group
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Group Name"
                variant="outlined"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": { height: "40px" },
                  "& .MuiInputLabel-root": { fontSize: "0.875rem" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? "white" : "grey.500"
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel id="status-label" sx={{ fontSize: "0.875rem" }}>
                  Status
                </InputLabel>
                <Select
                  labelId="status-label"
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    height: "40px",
                    "& .MuiSelect-select": { paddingTop: "12px", paddingBottom: "12px" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "grey.500"
                    }
                  }}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: "40px",
                  fontSize: "0.8125rem",
                  padding: "6px 12px"
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Search Field */}
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
            }
          }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>S.No</strong>
              </TableCell>
              <TableCell>
                <strong>Group Name</strong>
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
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.groupName}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "ACTIVE" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVertIcon sx={{ color: isDarkMode ? "white" : "grey.700" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleView}>View</MenuItem>
      </Menu>
    </Box>
  );
}
