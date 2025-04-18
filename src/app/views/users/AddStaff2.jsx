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
  useTheme,
  Divider,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddStaff2() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Ultra-compact input styling (same as AddStaff1)
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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "rgba(255,255,255,0.23)" : "rgba(0,0,0,0.23)",
      borderRadius: "6px"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main,
      borderWidth: "1.5px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1.5px",
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`
    },
    margin: "0.25rem 0"
  };

  const handleBackClick = () => {
    navigate("/users");
  };

  return (
    <Box
      component={Paper}
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.background.paper,
        borderRadius: "12px"
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? theme.palette.common.white : "inherit"
          }}
        >
          Payroll & Bank Details
        </Typography>

        <Button
          variant="contained"
          onClick={handleBackClick}
          sx={{
            height: "36px",
            borderRadius: "6px",
            px: 2,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.8125rem",
            backgroundColor: isDarkMode ? theme.palette.grey[700] : theme.palette.primary.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: isDarkMode ? theme.palette.grey[600] : theme.palette.primary.dark,
              transform: "translateY(-1px)"
            },
            transition: "all 0.2s ease",
            boxShadow: "none"
          }}
        >
          BACK
        </Button>
      </Box>

      {/* Payroll Section */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Payroll Information
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <TextField label="EPF No." fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Basic Salary" fullWidth type="number" sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={inputStyle}>
              <InputLabel>Contract Type</InputLabel>
              <Select defaultValue="" label="Contract Type">
                <MenuItem value="Full-Time" sx={{ fontSize: "0.875rem" }}>
                  Full-Time
                </MenuItem>
                <MenuItem value="Part-Time" sx={{ fontSize: "0.875rem" }}>
                  Part-Time
                </MenuItem>
                <MenuItem value="Temporary" sx={{ fontSize: "0.875rem" }}>
                  Temporary
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Work Shift" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Work Location" fullWidth sx={inputStyle} />
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]
        }}
      />

      {/* Leaves Section */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Leave Allocation
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Medical Leave"
              placeholder="Days"
              fullWidth
              type="number"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Casual Leave"
              placeholder="Days"
              fullWidth
              type="number"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Maternity Leave"
              placeholder="Days"
              fullWidth
              type="number"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Sick Leave"
              placeholder="Days"
              fullWidth
              type="number"
              sx={inputStyle}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]
        }}
      />

      {/* Bank Account Details */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Bank Account Information
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <TextField label="Account Holder Name" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Account Number" fullWidth type="number" sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Bank Name" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="IFSC Code" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Branch Name" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={inputStyle}>
              <InputLabel>Account Type</InputLabel>
              <Select defaultValue="" label="Account Type">
                <MenuItem value="Savings" sx={{ fontSize: "0.875rem" }}>
                  Savings
                </MenuItem>
                <MenuItem value="Current" sx={{ fontSize: "0.875rem" }}>
                  Current
                </MenuItem>
                <MenuItem value="Salary" sx={{ fontSize: "0.875rem" }}>
                  Salary
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
