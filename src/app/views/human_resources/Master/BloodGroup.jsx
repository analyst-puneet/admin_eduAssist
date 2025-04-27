import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../../../main";
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
  Alert,
  Snackbar
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const BloodGroup = ({ isMobile, isDarkMode, inputStyle }) => {
  const [formData, setFormData] = useState({ status: "true" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const fetchedOnce = useRef(false);

  // Blood Group API Endpoints
  const API_URL = `${BASE_URL}/api/master/blood_group`;
  const CREATE_URL = `${API_URL}/create`;
  const DELETE_URL = `${API_URL}/delete`;

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const fetchBloodGroups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { withCredentials: true });
      setFullData(response.data);
    } catch (error) {
      console.error("Error fetching blood groups:", error);
      showNotification("Failed to fetch blood groups", "error");
    } finally {
      setLoading(false);
      fetchedOnce.current = true;
    }
  };

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchBloodGroups();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Blood Group Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editMode) {
        // Updated URL construction with dynamic ID
        await axios.post(`${API_URL}/update/${currentEditId}`, formData, {
          withCredentials: true
        });
        showNotification("Blood Group updated successfully!");
      } else {
        await axios.post(CREATE_URL, formData, {
          withCredentials: true
        });
        showNotification("Blood Group added successfully!");
      }
      fetchBloodGroups();
      resetForm();
    } catch (error) {
      showNotification(error.response?.data?.message || "An error occurred", "error");
      console.error("Error saving blood group:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bloodGroup) => {
    setFormData({
      name: bloodGroup.name,
      status: bloodGroup.status.toString()
    });
    setEditMode(true);
    setCurrentEditId(bloodGroup._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blood group?")) return;

    setLoading(true);
    try {
      await axios.delete(`${DELETE_URL}/${id}`, {
        withCredentials: true
      });
      showNotification("Blood Group deleted successfully!");
      fetchBloodGroups();
    } catch (error) {
      showNotification("Failed to delete blood group", "error");
      console.error("Error deleting blood group:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ status: "true" });
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
          {editMode ? "Edit Blood Group" : "Add New Blood Group"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Blood Group Name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              sx={inputStyle}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status || "true"}
              onChange={handleInputChange}
              sx={inputStyle}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : editMode ? (
                "Update Blood Group"
              ) : (
                "Save"
              )}
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
          <Typography variant="h6">Blood Group List</Typography>
          {isMobile && (
            <TablePagination
              component="div"
              count={fullData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5]}
            />
          )}
        </Stack>

        {loading && !fetchedOnce.current ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : fullData.length === 0 ? (
          <Alert severity="info">
            No blood groups found. Add a new blood group to get started.
          </Alert>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Blood Group Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status === "true" ? "Active" : "Inactive"}</TableCell>
                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(item)} disabled={loading}>
                        <Edit sx={{ color: isDarkMode ? "white" : "#a3a2a2" }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item._id)} disabled={loading}>
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

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BloodGroup;
