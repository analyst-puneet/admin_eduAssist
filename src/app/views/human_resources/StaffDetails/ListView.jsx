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
  Button
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const ListView = () => {
  // State for data, loading, and error
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log("API Response:", response.data); // Debug log

        // Extract users data from API response
        const usersData = Array.isArray(response.data)
          ? response.data
          : response.data?.users || response.data?.data?.users || [];

        if (usersData.length === 0) {
          throw new Error("No users found in API response");
        }

        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredRows = users.filter((user) =>
    Object.entries(user).some(([key, value]) => {
      if (key === "roles" && Array.isArray(value)) {
        return value.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate paginated rows
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
      {/* Search Box */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.500"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey.700"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main"
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Staff ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Department</strong>
              </TableCell>
              <TableCell>
                <strong>Designation</strong>
              </TableCell>
              <TableCell>
                <strong>Mobile</strong>
              </TableCell>
              <TableCell>
                <strong>PAN Number</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((user) => (
              <TableRow key={user.empId}>
                <TableCell>{user.empId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.designation}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.PanNumber}</TableCell>
                <TableCell>
                  <IconButton color="success">
                    <CheckCircleIcon />
                  </IconButton>
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
    </Box>
  );
};

export default ListView;
