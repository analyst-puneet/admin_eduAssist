import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../../../main"; // Tumhara BASE_URL import
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

const Religion = ({ isMobile, isDarkMode, inputStyle }) => {
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

  // API endpoints
  const API_URL = `${BASE_URL}/api/master/religion`;
  const CREATE_URL = `${API_URL}/create`;
  const UPDATE_URL = `${API_URL}/update`;
  const DELETE_URL = `${API_URL}/delete`;

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const fetchReligionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        withCredentials: true
      });
      setFullData(response.data);
    } catch (error) {
      console.error("Error fetching religion data:", error);
      showNotification("Failed to fetch religion data", "error");
    } finally {
      setLoading(false);
      fetchedOnce.current = true;
    }
  };

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchReligionData();
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Religion Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editMode) {
        await axios.post(`${UPDATE_URL}/${currentEditId}`, formData, {
          withCredentials: true
        });
        showNotification("Religion updated successfully!");
      } else {
        await axios.post(CREATE_URL, formData, {
          withCredentials: true
        });
        showNotification("Religion added successfully!");
      }
      fetchReligionData();
      resetForm();
    } catch (error) {
      showNotification(error.response?.data?.message || "An error occurred", "error");
      console.error("Error saving religion:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (religion) => {
    setFormData({
      name: religion.name,
      status: religion.status.toString()
    });
    setEditMode(true);
    setCurrentEditId(religion._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this religion?")) return;

    setLoading(true);
    try {
      await axios.delete(`${DELETE_URL}/${id}`, {
        withCredentials: true
      });
      showNotification("Religion deleted successfully!");
      fetchReligionData();
    } catch (error) {
      showNotification("Failed to delete religion", "error");
      console.error("Error deleting religion:", error);
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
          {editMode ? "Edit Religion" : "Add New Religion"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Religion Name"
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
            <Button
              variant="contained"
              onClick={handleSave}
            >
              {editMode ? "Update Religion" : "Save"}
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
          <Typography variant="h6">Religion List</Typography>
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
          <Alert severity="info">No religions found. Add a new religion to get started.</Alert>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  <TableCell>Religion Name</TableCell>
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
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Religion;
