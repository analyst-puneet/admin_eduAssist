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
  Divider,
  useTheme
} from "@mui/material";

export default function AddStaff2() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const inputStyle = (isDark, theme) => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "white" : "grey.500"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "white" : "grey.700"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "white" : theme.palette.primary.main
    }
  });

  return (
    <Box>
      {/* Payroll Section */}
      <Typography variant="h6" gutterBottom>
        Add More Details
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom sx={inputStyle(isDarkMode, theme)}>
          Payroll
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="EPF No." fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Basic Salary" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={inputStyle(isDarkMode, theme)}>
              <InputLabel id="contract-type-label">Contract Type</InputLabel>
              <Select
                labelId="contract-type-label"
                id="contract-type"
                defaultValue=""
                label="Contract Type"
                sx={inputStyle(isDarkMode, theme)}
              >
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Temporary">Temporary</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Work Shift" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Work Location" fullWidth sx={inputStyle(isDarkMode, theme)} />
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
              sx={inputStyle(isDarkMode, theme)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Casual Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
              sx={inputStyle(isDarkMode, theme)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Maternity Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
              sx={inputStyle(isDarkMode, theme)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Sick Leave"
              placeholder="Number of Leaves"
              fullWidth
              type="number"
              sx={inputStyle(isDarkMode, theme)}
            />
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
            <TextField label="Account Title" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Account Number" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Name" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="IFSC Code" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Branch Name" fullWidth sx={inputStyle(isDarkMode, theme)} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
