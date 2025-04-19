import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import BackButton from "app/views/material-kit/buttons/BackButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const leaveOptions = ["Casual Leave", "Medical Leave", "Earned Leave"];

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    applyDate: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    document: null,
    isOutOfStation: false,
    destinationAddress: "",
    mobileNumber: ""
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

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

  const handleBackClick = () => {
    navigate("/human_resources/staff-leave");
  };

  const handleChange = (e) => {
    const { name, value, files, checked, type } = e.target;
    if (name === "document") {
      setFormData({ ...formData, document: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // API call yahan add karo
  };

  return (
    <Box p={4}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Add Details
          </Typography>
        </Grid>
        <Grid item>
          <BackButton onClick={handleBackClick} />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 2 }}>
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
              />
            </Grid>

            {/* Out of Station Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isOutOfStation}
                    onChange={handleChange}
                    name="isOutOfStation"
                    color="primary"
                  />
                }
                label="Out of Station"
              />
            </Grid>

            {/* Conditional Fields - Only show if Out of Station is checked */}
            {formData.isOutOfStation && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Destination Address"
                    name="destinationAddress"
                    fullWidth
                    value={formData.destinationAddress}
                    onChange={handleChange}
                    sx={inputStyle}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mobile Number"
                    name="mobileNumber"
                    fullWidth
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    sx={inputStyle}
                    inputProps={{
                      pattern: "[0-9]{10}",
                      title: "Please enter a 10-digit mobile number"
                    }}
                  />
                </Grid>
              </>
            )}

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
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? "white" : "grey.500"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? "white" : "grey.700"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isDarkMode ? "white" : "primary.main"
                  }
                }}
              />
            </Grid>

            {/* Attach Document */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* File Upload Button */}
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    py: 1.5,
                    borderStyle: "dashed",
                    "&:hover": {
                      borderStyle: "dashed",
                      backgroundColor: "action.hover"
                    }
                  }}
                  startIcon={<AttachFileIcon />}
                >
                  {formData.document ? "Change Document" : "Upload Document"}
                  <input
                    type="file"
                    hidden
                    name="document"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Specify accepted file types
                  />
                </Button>

                {/* File Preview Section */}
                {formData.document && (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "background.paper"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {formData.document.type.includes("image/") ? (
                        <img
                          src={URL.createObjectURL(formData.document)}
                          alt="Preview"
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 1
                          }}
                        />
                      ) : (
                        <DescriptionIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                      )}

                      <Box>
                        <Typography variant="body1" noWrap>
                          {formData.document.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {(formData.document.size / 1024).toFixed(2)} KB
                        </Typography>
                      </Box>
                    </Box>

                    <IconButton
                      onClick={() => setFormData({ ...formData, document: null })}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                )}
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "none" }}
              >
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
