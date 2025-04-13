import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from "@mui/material";

export default function AddStaff2() {
  return (
    <Box p={3} boxShadow={2} borderRadius={2} bgcolor="#fff">
      {/* Payroll Section */}
      <Typography variant="h6" gutterBottom>
        Add More Details
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Payroll
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="EPF No." fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Basic Salary" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Contract Type</InputLabel>
              <Select defaultValue="">
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Temporary">Temporary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Work Shift" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Work Location" fullWidth />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Leaves Section */}
      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Leaves
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Medical Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Casual Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Maternity Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Sick Leave" placeholder="Number of Leaves" fullWidth type="number" />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Bank Account Details */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Bank Account Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Account Title" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Account Number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="IFSC Code" fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Branch Name" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
