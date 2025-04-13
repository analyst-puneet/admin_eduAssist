import React, { useState } from "react";
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
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Addstaff1() {
  const navigate = useNavigate(); // Hook for navigation
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [role, setRole] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle the Back button click
  const handleBackClick = () => {
    navigate("/users"); // Navigate back to the "/users" page
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleBackClick}>
            Back
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Staff ID */}
        <Grid item xs={12} sm={4}>
          <TextField label="Staff ID" fullWidth required sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Role */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle(isDarkMode, theme)}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="librarian">Librarian</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Designation */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle(isDarkMode, theme)}>
            <InputLabel>Designation</InputLabel>
            <Select defaultValue="" label="Designation">
              <MenuItem value="Professor">Professor</MenuItem>
              <MenuItem value="Lecturer">Lecturer</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* First Name */}
        <Grid item xs={12} sm={4}>
          <TextField label="First Name" fullWidth required sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={4}>
          <TextField label="Last Name" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Father Name */}
        <Grid item xs={12} sm={4}>
          <TextField label="Father Name" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email (Login Username)"
            fullWidth
            required
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle(isDarkMode, theme)}>
            <InputLabel>Gender</InputLabel>
            <Select defaultValue="" label="Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* DOB */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={4}>
          <TextField label="Phone" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Emergency Contact Number"
            fullWidth
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>

        {/* Marital Status */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={inputStyle(isDarkMode, theme)}>
            <InputLabel>Marital Status</InputLabel>
            <Select defaultValue="" label="Marital Status">
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Date of Joining */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Date of Joining"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>

        {/* Mother Name */}
        <Grid item xs={12} sm={4}>
          <TextField label="Mother Name" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Upload Image */}
        <Grid item xs={12} sm={4}>
          <Box
            component="label"
            htmlFor="file-upload"
            sx={{
              border: "1px dashed #ccc",
              borderRadius: "4px",
              padding: "16.5px 14px",
              width: "100%",
              textAlign: "center",
              color: "#666",
              cursor: "pointer"
            }}
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <Typography variant="body2">📷 Upload Staff Photo</Typography>
          </Box>
        </Grid>

        {/* Preview Image */}
        {selectedImage && (
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                textAlign: "center"
              }}
            >
              <img
                src={selectedImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
              <Typography variant="caption" display="block">
                Uploaded Image Preview
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Address */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={2}
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Permanent Address"
            fullWidth
            multiline
            rows={2}
            sx={inputStyle(isDarkMode, theme)}
          />
        </Grid>

        {/* Qualification */}
        <Grid item xs={12} sm={4}>
          <TextField label="Qualification" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Work Experience */}
        <Grid item xs={12} sm={4}>
          <TextField label="Work Experience" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Note */}
        <Grid item xs={12} sm={4}>
          <TextField label="Note" fullWidth sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* PAN Number */}
        <Grid item xs={12} sm={4}>
          <TextField label="PAN Number" fullWidth required sx={inputStyle(isDarkMode, theme)} />
        </Grid>

        {/* Department */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={inputStyle(isDarkMode, theme)}>
            <InputLabel>Department</InputLabel>
            <Select defaultValue="" label="Department">
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="ME">ME</MenuItem>
              <MenuItem value="CE">CE</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
