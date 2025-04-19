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
  Toolbar
} from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  FileCopy as CopyIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  GridOn as ExcelIcon,
  Search as SearchIcon,
  Edit as EditIcon // ✅ Edit Icon added
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
  const [groupName, setGroupName] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [searchQuery, setSearchQuery] = useState("");

  // Static table data
  const tableRows = [
    { id: 1, groupName: "Regular Teacher", status: "ACTIVE" },
    { id: 2, groupName: "Adhoc Teacher", status: "ACTIVE" },
    { id: 3, groupName: "Regular Non Teaching", status: "INACTIVE" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setGroupName("");
    setStatus("ACTIVE");
  };

  const filteredRows = tableRows.filter((row) =>
    row.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Breadcrumbs />

      {/* Form Card */}
      <Paper sx={{ p: 3, mb: 3, width: "100%" }}>
        <Typography variant="h5" mb={2}>
          LEAVE GROUP
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
                  "& .MuiInputLabel-root": { fontSize: "0.875rem" }
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
                    "& .MuiSelect-select": { paddingTop: "12px", paddingBottom: "12px" }
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

      {/* Table Section */}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.divider}`,
            p: 2
          }}
        >
          <Typography variant="h6">LEAVE-TYPE TRANSACTION</Typography>
        </Toolbar>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box>
            <IconButton>
              <CopyIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <ExcelIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <PdfIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <PrintIcon fontSize="small" />
            </IconButton>
          </Box>

          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />
            }}
            sx={{ width: 250 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell>
                  <strong>S.NO</strong>
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
              {filteredRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.groupName}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color:
                          row.status === "ACTIVE"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                        fontWeight: 500,
                        textTransform: "uppercase"
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <EditIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
