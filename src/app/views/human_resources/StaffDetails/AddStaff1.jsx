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
  IconButton,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import BackButton from "../material-kit/buttons/BackButton";
import BackButton from "app/views/material-kit/buttons/BackButton";

export default function Addstaff1() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Ultra-compact input styling
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
    navigate("/human_resources/staff-details");
  };

  const handlePreviewOpen = () => {
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
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
          Basic Information
        </Typography>

        <BackButton onClick={handleBackClick} />
      </Box>

      {/* Form Fields */}
      <Grid container spacing={1.5}>
        {/* Row 1 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Staff ID" fullWidth required sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Role"
              onChange={handleRoleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200,
                    backgroundColor: isDarkMode ? theme.palette.grey[800] : undefined
                  }
                }
              }}
            >
              <MenuItem value="" sx={{ fontSize: "0.875rem" }}>
                Select
              </MenuItem>
              <MenuItem value="admin" sx={{ fontSize: "0.875rem" }}>
                Admin
              </MenuItem>
              <MenuItem value="faculty" sx={{ fontSize: "0.875rem" }}>
                Faculty
              </MenuItem>
              <MenuItem value="librarian" sx={{ fontSize: "0.875rem" }}>
                Librarian
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle}>
            <InputLabel>Designation</InputLabel>
            <Select defaultValue="" label="Designation">
              <MenuItem value="Professor" sx={{ fontSize: "0.875rem" }}>
                Professor
              </MenuItem>
              <MenuItem value="Lecturer" sx={{ fontSize: "0.875rem" }}>
                Lecturer
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={4}>
          <TextField label="First Name" fullWidth required sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Last Name" fullWidth sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Father Name" fullWidth sx={inputStyle} />
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Email (Login Username)" fullWidth required sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required sx={inputStyle}>
            <InputLabel>Gender</InputLabel>
            <Select defaultValue="" label="Gender">
              <MenuItem value="Male" sx={{ fontSize: "0.875rem" }}>
                Male
              </MenuItem>
              <MenuItem value="Female" sx={{ fontSize: "0.875rem" }}>
                Female
              </MenuItem>
              <MenuItem value="Other" sx={{ fontSize: "0.875rem" }}>
                Other
              </MenuItem>
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
            sx={inputStyle}
          />
        </Grid>

        {/* Row 4 */}
        <Grid item xs={12} sm={4}>
          <TextField label="Phone" fullWidth sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Emergency Contact" fullWidth sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel>Marital Status</InputLabel>
            <Select defaultValue="" label="Marital Status">
              <MenuItem value="Single" sx={{ fontSize: "0.875rem" }}>
                Single
              </MenuItem>
              <MenuItem value="Married" sx={{ fontSize: "0.875rem" }}>
                Married
              </MenuItem>
              <MenuItem value="Other" sx={{ fontSize: "0.875rem" }}>
                Other
              </MenuItem>
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
            sx={inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Mother Name" fullWidth sx={inputStyle} />
        </Grid>

        {/* Upload Image and Preview Section */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, height: "38px" }}>
            {/* Upload Button */}
            <Box
              component="label"
              htmlFor="file-upload"
              sx={{
                border: "1px dashed",
                borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400],
                borderRadius: "6px",
                padding: "6px 10px",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: isDarkMode
                  ? theme.palette.grey[800]
                  : theme.palette.background.paper,
                color: isDarkMode ? theme.palette.common.white : theme.palette.text.primary,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[100]
                },
                transition: "all 0.2s ease"
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  width: "100%",
                  overflow: "hidden"
                }}
              >
                <AddPhotoAlternateIcon
                  fontSize="small"
                  sx={{
                    fontSize: "18px",
                    color: isDarkMode ? theme.palette.grey[400] : theme.palette.grey[600]
                  }}
                />
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: "calc(100% - 30px)",
                    fontSize: "0.8125rem"
                  }}
                >
                  {selectedImage
                    ? document.getElementById("file-upload")?.files[0]?.name || "Photo selected"
                    : "Upload Photo"}
                </Typography>
              </Box>
            </Box>

            {/* Thumbnail Preview */}
            {selectedImage && (
              <Box
                onClick={handlePreviewOpen}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400],
                  backgroundColor: isDarkMode
                    ? theme.palette.grey[800]
                    : theme.palette.background.paper,
                  cursor: "pointer",
                  flexShrink: 0,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    transform: "scale(1.05)"
                  },
                  transition: "all 0.2s ease"
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

        {/* Address Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={2}
            sx={{
              ...inputStyle,
              "& .MuiInputBase-root": {
                height: "auto",
                minHeight: "80px"
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Permanent Address"
            fullWidth
            multiline
            rows={2}
            sx={{
              ...inputStyle,
              "& .MuiInputBase-root": {
                height: "auto",
                minHeight: "80px"
              }
            }}
          />
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12} sm={4}>
          <TextField label="Qualification" fullWidth sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Work Experience" fullWidth sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Note" fullWidth sx={inputStyle} />
        </Grid>

        {/* Final Row */}
        <Grid item xs={12} sm={4}>
          <TextField label="PAN Number" fullWidth required sx={inputStyle} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel>Department</InputLabel>
            <Select defaultValue="" label="Department">
              <MenuItem value="CSE" sx={{ fontSize: "0.875rem" }}>
                CSE
              </MenuItem>
              <MenuItem value="ECE" sx={{ fontSize: "0.875rem" }}>
                ECE
              </MenuItem>
              <MenuItem value="ME" sx={{ fontSize: "0.875rem" }}>
                ME
              </MenuItem>
              <MenuItem value="CE" sx={{ fontSize: "0.875rem" }}>
                CE
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Image Preview Dialog */}
      <Dialog open={openPreview} onClose={handlePreviewClose} maxWidth="md">
        <DialogContent>
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={handlePreviewClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.common.white,
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)"
                }
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
                margin: "0 auto",
                borderRadius: "4px"
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
