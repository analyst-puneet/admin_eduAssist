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
  useTheme,
  Dialog,
  DialogContent,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function Addstaff1() {
  const navigate = useNavigate();
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
  const [openPreview, setOpenPreview] = useState(false);
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

  const handleBackClick = () => {
    navigate("/users");
  };

  const handlePreviewOpen = () => {
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
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

        {/* Upload Image and Preview Section - Fixed Height */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              height: "56px" // Match MUI TextField height
            }}
          >
            {/* Upload Button - Fixed Height */}
            <Box
              component="label"
              htmlFor="file-upload"
              sx={{
                border: "1px dashed",
                borderColor: isDarkMode ? "white" : "grey.500",
                borderRadius: "4px",
                padding: "8px 14px",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  borderColor: isDarkMode ? "white" : theme.palette.primary.main,
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"
                }
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AddPhotoAlternateIcon fontSize="small" />
                <Typography variant="body2">Upload Photo</Typography>
              </Box>
            </Box>

            {/* Thumbnail Preview - Fixed Height */}
            {selectedImage && (
              <Box
                onClick={handlePreviewOpen}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: isDarkMode ? "white" : "grey.500",
                  cursor: "pointer",
                  flexShrink: 0,
                  "&:hover": {
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <img
                  src={selectedImage}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>

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

      {/* Preview Dialog */}
      <Dialog open={openPreview} onClose={handlePreviewClose} maxWidth="md">
        <DialogContent>
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={handlePreviewClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedImage}
              alt="Full Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
                margin: "0 auto"
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
