import React from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
  Input
} from "@mui/material";

export default function Addstaff1() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Staff ID" fullWidth required />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required>
            <InputLabel>Role</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Designation</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Professor">Professor</MenuItem>
              <MenuItem value="Lecturer">Lecturer</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={4}>
          <TextField label="First Name" fullWidth required />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Last Name" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Father Name" fullWidth />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Email (Login Username)" fullWidth required />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Phone" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Emergency Contact Number" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Marital Status</InputLabel>
            <Select defaultValue="">
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 5 */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Date of Joining"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Mother Name" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Input
            type="file"
            fullWidth
            inputProps={{ accept: "image/*" }}
            style={{
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "16.5px 14px",
              width: "100%"
            }}
          />
        </Grid>

        {/* Row 6 */}
        <Grid item xs={12} sm={6}>
          <TextField label="Address" fullWidth multiline rows={2} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Permanent Address" fullWidth multiline rows={2} />
        </Grid>

        {/* Row 7 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Qualification" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Work Experience" fullWidth />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Note" fullWidth />
        </Grid>

        {/* Row 8 */}
        <Grid item xs={12} sm={4}>
          <TextField label="PAN Number" fullWidth required />
        </Grid>

        {/* Row 9 - Department */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select defaultValue="">
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="ME">ME</MenuItem>
              <MenuItem value="CE">CE</MenuItem>
              {/* Add your departments */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
