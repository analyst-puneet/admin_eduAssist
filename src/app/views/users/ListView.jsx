import { useState } from "react";
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
  InputAdornment
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";

const ListView = () => {
  // Table data
  const rows = [
    {
      id: "9000",
      name: "Joe Black",
      role: "Super Admin",
      department: "Admin",
      designation: "Technical Head",
      mobile: "6545645645",
      pan: "ALWPG5809L"
    },
    {
      id: "9002",
      name: "Shwam Verma",
      role: "Teacher",
      department: "Academic",
      designation: "Faculty",
      mobile: "9552654564",
      pan: "RLWEG5809L"
    },
    {
      id: "9006",
      name: "Brandon Heart",
      role: "Librarian",
      department: "Library",
      designation: "Librarian",
      mobile: "34564654",
      pan: "ALWPG5825H"
    },
    {
      id: "9003",
      name: "William Abbot",
      role: "Admin",
      department: "Admin",
      designation: "Principal",
      mobile: "56465465",
      pan: "ERTPG5809L"
    },
    {
      id: "90006",
      name: "Jason Sharfton",
      role: "Teacher",
      department: "Academic",
      designation: "Faculty",
      mobile: "4654665454",
      pan: "UJYEG5809L"
    },
    {
      id: "9004",
      name: "James Deckar",
      role: "Accountant",
      department: "Finance",
      designation: "Accountant",
      mobile: "79786546463",
      pan: "OLUDPG5809"
    },
    {
      id: "9005",
      name: "Maria Ford",
      role: "Receptionist",
      department: "Academic",
      designation: "Receptionist",
      mobile: "8521479630",
      pan: "QTWPG5809L"
    },
    {
      id: "54545454",
      name: "Albert Thomas",
      role: "Teacher",
      department: "Maths",
      designation: "Faculty",
      mobile: "9522369875",
      pan: "AMB14EB"
    }
  ];

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  return (
    <Box mt={2}>
      {/* Search Box */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <strong>Mobile Number</strong>
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
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.pan}</TableCell>
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
        labelDisplayedRows={({ from, to, count }) => `Records: ${from}-${to} of ${count}`}
      />
    </Box>
  );
};

export default ListView;
