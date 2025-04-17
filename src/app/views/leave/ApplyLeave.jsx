import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Paper
} from "@mui/material";

const leaveOptions = ["Casual Leave", "Medical Leave", "Earned Leave"];

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    applyDate: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    document: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // yahan API call laga dena
  };

  return (
    <Box p={4}>
      <Typography variant="h6" gutterBottom>
        Add Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Apply Date */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Apply Date"
                name="applyDate"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={formData.applyDate}
                onChange={handleChange}
              />
            </Grid>

            {/* Available Leave */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Available Leave"
                name="leaveType"
                fullWidth
                required
                value={formData.leaveType}
                onChange={handleChange}
              >
                {leaveOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Leave From Date */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Leave From Date"
                name="fromDate"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={formData.fromDate}
                onChange={handleChange}
              />
            </Grid>

            {/* Leave To Date */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Leave To Date"
                name="toDate"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={formData.toDate}
                onChange={handleChange}
              />
            </Grid>

            {/* Reason */}
            <Grid item xs={12}>
              <TextField
                label="Reason"
                name="reason"
                fullWidth
                multiline
                rows={3}
                value={formData.reason}
                onChange={handleChange}
              />
            </Grid>

            {/* Attach Document */}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                {formData.document ? formData.document.name : "Attach Document"}
                <input
                  type="file"
                  hidden
                  name="document"
                  onChange={handleChange}
                />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ApplyLeave;
