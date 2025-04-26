import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const RoleGroup = ({ isMobile, isDarkMode, inputStyle }) => {
  const [formData, setFormData] = useState({ status: "Active" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [errors, setErrors] = useState({});
  // API endpoints
  const API_URL = "https://backend-aufx.onrender.com/api/master/role_group";
  const GET_ROLES_URL = `${API_URL}`;
  const CREATE_ROLE_URL = `${API_URL}/create`;
  const UPDATE_ROLE_URL = `${API_URL}/update`;
  const DELETE_ROLE_URL = `${API_URL}/delete`;

  const fields = [
    { key: "roleName", label: "Role Name" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
    { key: "description", label: "Description" }
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(GET_ROLES_URL);
      setFullData(response.data);
    } catch (error) {
      toast.error("Failed to fetch roles");
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.roleName) newErrors.roleName = "Role Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editMode) {
        await axios.put(`${UPDATE_ROLE_URL}/${currentEditId}`, formData);
        toast.success("Role updated successfully!");
      } else {
        await axios.post(CREATE_ROLE_URL, formData);
        toast.success("Role added successfully!");
      }
      fetchRoles();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error saving role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role) => {
    setFormData(role);
    setEditMode(true);
    setCurrentEditId(role._id);
  };

  const handleDelete = async (index) => {
    const role = tableData[index];
    if (!window.confirm(`Delete ${role.roleName}?`)) return;

    setLoading(true);
    try {
      await axios.delete(`${DELETE_ROLE_URL}/${role._id}`);
      toast.success("Role deleted successfully!");
      fetchRoles();
    } catch (error) {
      toast.error("Failed to delete role");
      console.error("Error deleting role:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ status: "Active" });
    setEditMode(false);
    setCurrentEditId(null);
    setErrors({});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableData = fullData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editMode ? "Edit Role" : "Add New Role"}
        </Typography>
        <Grid container spacing={2}>
          {/* Role Name and Status in same row */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role Name"
              name="roleName"
              value={formData.roleName || ""}
              onChange={handleInputChange}
              sx={inputStyle}
              required
              error={!!errors.roleName}
              helperText={errors.roleName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status || "Active"}
              onChange={handleInputChange}
              sx={inputStyle}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {editMode ? "Update Role" : "Save Role"}
            </Button>
            {editMode && (
              <Button variant="outlined" onClick={resetForm} sx={{ ml: 2 }} disabled={loading}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Role List</Typography>
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

        {loading && fullData.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow key={item._id || index}>
                    <TableCell>{item.roleName}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(item)} disabled={loading}>
                        <Edit sx={{ color: isDarkMode ? "white" : "#a3a2a2" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)} disabled={loading}>
                        <Delete sx={{ color: isDarkMode ? "white" : "#7a190c" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

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
    </Box>
  );
};

export default RoleGroup;
