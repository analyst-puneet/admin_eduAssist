import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Button,
  Typography,
  Stack
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  FileDownload as ExcelIcon
} from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../../../main";

const ListView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const API_URL = `${BASE_URL}/api/user_details`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Full API response:", response);

        let usersData = [];

        if (Array.isArray(response.data)) {
          usersData = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          usersData = response.data.data;
        } else {
          throw new Error("API response doesn't contain valid users data");
        }

        console.log("Processed users data:", usersData);

        // Map API data to table format according to API response fields
        const mappedUsers = usersData.map((user) => ({
          userId: user.user_id || "",
          empId: user.employee_code || "",
          name: user.full_name || [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" "),
          roles: [user.designation_id || user.employee_type || ""],
          department: user.department_id || "",
          designation: user.designation_id || "",
          contact: user.cantact_no_1 || "",
          gender: user.gender || "",
          bloodGroup: user.blood_group || "",
          status: user.status === "true" ? "Active" : "Inactive"
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error("API Error Details:", {
          error: err,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredRows = users.filter((user) =>
    Object.entries(user).some(([key, value]) => {
      if (key === "roles" && Array.isArray(value)) {
        return value.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">No users found</Alert>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      {/* Header and export buttons */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Staff List</Typography>

        <Stack direction="row" spacing={1}>
          <IconButton color="primary">
            <PdfIcon />
          </IconButton>
          <IconButton color="success">
            <ExcelIcon />
          </IconButton>
          <IconButton color="secondary">
            <PrintIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Search Box */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Table */}
      <Paper elevation={3}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>User ID</strong></TableCell>
                <TableCell><strong>Employee Code</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell><strong>Blood Group</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((user) => (
                <TableRow key={user.userId} hover>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.empId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.roles.join(", ")}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.bloodGroup}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton color="primary" title="View">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="secondary" title="Edit">
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => `Showing ${from}-${to} of ${count} users`}
        />
      </Paper>
    </Box>
  );
};

export default ListView;