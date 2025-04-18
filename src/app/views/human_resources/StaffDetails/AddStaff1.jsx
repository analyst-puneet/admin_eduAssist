import React, { useState, useEffect } from "react";
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
  Paper,
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "app/views/material-kit/buttons/BackButton";

export default function Addstaff1({ formData, setFormData }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Initialize state from formData
  const [selectedImage, setSelectedImage] = useState(formData.selectedImage || null);
  const [role, setRole] = useState(formData.role || "");
  const [address, setAddress] = useState(formData.address || "");
  const [permanentAddress, setPermanentAddress] = useState(formData.permanentAddress || "");
  const [sameAsAddress, setSameAsAddress] = useState(formData.sameAsAddress || false);
  const [joiningDate, setJoiningDate] = useState(formData.joiningDate || "");
  const [basicInfo, setBasicInfo] = useState(
    formData.basicInfo || {
      staffId: "",
      designation: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      emergencyContact: "",
      email: "",
      fatherName: "",
      motherName: "",
      maritalStatus: ""
    }
  );
  const [experiences, setExperiences] = useState(
    formData.experiences || [{ company: "", position: "", from: "", to: "", description: "" }]
  );
  const [documents, setDocuments] = useState(
    formData.documents || {
      panCard: "",
      aadhaarCard: "",
      passport: "",
      drivingLicense: ""
    }
  );

  // Update formData whenever any field changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedImage,
      role,
      address,
      permanentAddress,
      sameAsAddress,
      joiningDate,
      basicInfo,
      experiences,
      documents
    }));
  }, [
    selectedImage,
    role,
    address,
    permanentAddress,
    sameAsAddress,
    joiningDate,
    basicInfo,
    experiences,
    documents
  ]);

  // Set current date as default for date of joining
  useEffect(() => {
    if (!joiningDate) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setJoiningDate(formattedDate);
    }
  }, []);

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

  const [openPreview, setOpenPreview] = useState(false);
  const handlePreviewOpen = () => setOpenPreview(true);
  const handlePreviewClose = () => setOpenPreview(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (sameAsAddress) {
      setPermanentAddress(e.target.value);
    }
  };

  const handlePermanentAddressChange = (e) => {
    setPermanentAddress(e.target.value);
    if (sameAsAddress) {
      setSameAsAddress(false);
    }
  };

  const handleSameAsAddressChange = (e) => {
    const checked = e.target.checked;
    setSameAsAddress(checked);
    if (checked) {
      setPermanentAddress(address);
    }
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", from: "", to: "", description: "" }
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleDocumentChange = (field, value) => {
    setDocuments({
      ...documents,
      [field]: value
    });
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
      {/* Basic Information Section */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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

        <Grid container spacing={1.5}>
          {/* Row 1 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Staff ID"
              fullWidth
              required
              sx={inputStyle}
              value={basicInfo.staffId}
              onChange={(e) => handleBasicInfoChange("staffId", e.target.value)}
            />
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
              <Select
                value={basicInfo.designation}
                label="Designation"
                onChange={(e) => handleBasicInfoChange("designation", e.target.value)}
              >
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
            <TextField
              label="First Name"
              fullWidth
              required
              sx={inputStyle}
              value={basicInfo.firstName}
              onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              sx={inputStyle}
              value={basicInfo.lastName}
              onChange={(e) => handleBasicInfoChange("lastName", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth required sx={inputStyle}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={basicInfo.gender}
                label="Gender"
                onChange={(e) => handleBasicInfoChange("gender", e.target.value)}
              >
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
              value={basicInfo.dob}
              onChange={(e) => handleBasicInfoChange("dob", e.target.value)}
            />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              fullWidth
              required
              sx={inputStyle}
              value={basicInfo.phone}
              onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Emergency Contact"
              fullWidth
              required
              sx={inputStyle}
              value={basicInfo.emergencyContact}
              onChange={(e) => handleBasicInfoChange("emergencyContact", e.target.value)}
            />
          </Grid>
          {/* Row 3 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email (Login Username)"
              fullWidth
              required
              sx={inputStyle}
              value={basicInfo.email}
              onChange={(e) => handleBasicInfoChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Father Name"
              fullWidth
              sx={inputStyle}
              value={basicInfo.fatherName}
              onChange={(e) => handleBasicInfoChange("fatherName", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Mother Name"
              fullWidth
              sx={inputStyle}
              value={basicInfo.motherName}
              onChange={(e) => handleBasicInfoChange("motherName", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={inputStyle}>
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={basicInfo.maritalStatus}
                label="Marital Status"
                onChange={(e) => handleBasicInfoChange("maritalStatus", e.target.value)}
              >
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
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              sx={inputStyle}
            />
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
              label="Current Address"
              fullWidth
              multiline
              rows={2}
              value={address}
              onChange={handleAddressChange}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Permanent Address"
                fullWidth
                multiline
                rows={2}
                value={permanentAddress}
                onChange={handlePermanentAddressChange}
                sx={{
                  ...inputStyle,
                  "& .MuiInputBase-root": {
                    height: "auto",
                    minHeight: "80px"
                  }
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsAddress}
                    onChange={handleSameAsAddressChange}
                    size="small"
                  />
                }
                label="Same as Current Address"
                sx={{ mt: 0.5, fontSize: "0.875rem" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Experience Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? theme.palette.common.white : "inherit",
            mb: 2
          }}
        >
          Work Experience
        </Typography>
        {experiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name"
                  fullWidth
                  required
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Position"
                  fullWidth
                  required
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="From Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={exp.from}
                  onChange={(e) => handleExperienceChange(index, "from", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="To Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={exp.to}
                  onChange={(e) => handleExperienceChange(index, "to", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  fullWidth
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  sx={inputStyle}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => removeExperience(index)}
                disabled={experiences.length <= 1}
              >
                Remove
              </Button>
            </Box>
            {index < experiences.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
        <Button variant="outlined" onClick={addExperience} sx={{ mt: 1 }}>
          Add Another Experience
        </Button>
      </Box>

      {/* Documents Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? theme.palette.common.white : "inherit",
            mb: 2
          }}
        >
          Documents
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="PAN Card Number"
              fullWidth
              required
              value={documents.panCard}
              onChange={(e) => handleDocumentChange("panCard", e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Aadhaar Card Number"
              fullWidth
              required
              value={documents.aadhaarCard}
              onChange={(e) => handleDocumentChange("aadhaarCard", e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passport Number"
              fullWidth
              value={documents.passport}
              onChange={(e) => handleDocumentChange("passport", e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Driving License Number"
              fullWidth
              value={documents.drivingLicense}
              onChange={(e) => handleDocumentChange("drivingLicense", e.target.value)}
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
              Note: Please upload scanned copies of these documents in the next step.
            </Typography>
          </Grid>
        </Grid>
      </Box>

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
