import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TablePagination,
  Typography,
  Grid,
  TextField,
  Paper,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Edit, Delete, Add as AddIcon } from "@mui/icons-material";
import LeaveStock from "../StaffLeave/LeaveStock";

const LeaveGroup = ({ isMobile, isDarkMode, inputStyle }) => {
  const [formData, setFormData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openLeaveStock, setOpenLeaveStock] = useState(false);
  const [selectedLeaveGroup, setSelectedLeaveGroup] = useState(null);

  const fields = [
    { key: "groupName", label: "Group Name" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
  ];

  const fullData = [
    { groupName: "Teaching Staff", status: "Active" },
    { groupName: "Admin Staff", status: "Inactive" },
    { groupName: "Support Staff", status: "Active" }
  ];

  const tableData = fullData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert(`Saved ${JSON.stringify(formData)} for Leave Group`);
    setFormData({});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenLeaveStock = (group) => {
    setSelectedLeaveGroup(group);
    setOpenLeaveStock(true);
  };

  const handleCloseLeaveStock = () => {
    setOpenLeaveStock(false);
    setSelectedLeaveGroup(null);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Leave Group
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.key}>
              {field.type === "select" ? (
                <TextField
                  select
                  fullWidth
                  label={field.label}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  sx={inputStyle}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleInputChange}
                  sx={inputStyle}
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Leave Group List</Typography>
          {isMobile && (
            <TablePagination
              component="div"
              count={fullData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5]}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
          )}
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.key}>{field.label}</TableCell>
                ))}
                <TableCell>Stock Status</TableCell>
                <TableCell>Fill Stock</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item, index) => (
                <TableRow key={index}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>{item[field.key]}</TableCell>
                  ))}
                  <TableCell>Not Filled</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenLeaveStock(item)}
                    >
                      Add
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton size={isMobile ? "small" : "medium"}>
                      <Edit sx={{ color: isDarkMode ? "white" : "#a3a2a2" }} />
                    </IconButton>
                    <IconButton size={isMobile ? "small" : "medium"}>
                      <Delete sx={{ color: isDarkMode ? "white" : "#7a190c" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {!isMobile && (
          <TablePagination
            component="div"
            count={fullData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
      </Paper>

      <Dialog open={openLeaveStock} onClose={handleCloseLeaveStock} fullWidth maxWidth="md">
        <DialogTitle>Leave Stock for {selectedLeaveGroup?.groupName}</DialogTitle>
        <DialogContent>
          <LeaveStock leaveGroup={selectedLeaveGroup} onClose={handleCloseLeaveStock} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeaveStock}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveGroup;
