import React, { useState } from "react";
import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackButton from "app/views/material-kit/buttons/BackButton";
import { useTheme } from "@mui/material/styles";

const LeaveTypeCreate = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    attachFile: "No",
    showBalance: "Yes",
    sequence: "",
    status: "Active",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBackClick = () => {
    navigate("/leave-master/type"); // or any desired route
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Add API call here
  };

  const inputStyle = {
    "& .MuiInputBase-root": {
      height: "38px",
      fontSize: "0.875rem"
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
      fontSize: "0.875rem",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)"
      }
    },
    borderColor: isDarkMode ? "white" : "grey.500",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.500"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.700"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "primary.main"
    },
    margin: "0.25rem 0"
  };

  return (
    <Box p={4}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Leave Type
          </Typography>
        </Grid>
        <Grid item>
          <BackButton onClick={handleBackClick} />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Code"
                name="code"
                fullWidth
                required
                value={formData.code}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Attach File"
                name="attachFile"
                fullWidth
                required
                value={formData.attachFile}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Show Balance"
                name="showBalance"
                fullWidth
                required
                value={formData.showBalance}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Sequence"
                name="sequence"
                fullWidth
                value={formData.sequence}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Status"
                name="status"
                fullWidth
                required
                value={formData.status}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "none" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LeaveTypeCreate;
