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
  Divider,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "app/views/material-kit/buttons/BackButton";

export default function Addstaff1({
  formData,
  setFormData,
  onValidationChange,
  triggerValidation
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Initialize state from formData
  const [selectedImage, setSelectedImage] = useState(formData.selectedImage || null);
  const [role, setRole] = useState(formData.role || "");
  const [joiningDate, setJoiningDate] = useState(formData.joiningDate || "");
  const [sameAsAddress, setSameAsAddress] = useState(formData.sameAsAddress || false);
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
      fatherTitle: "Shri", // Default title for father
      motherName: "",
      motherTitle: "Shrimati", // Default title for mother
      maritalStatus: ""
    }
  );
  const [addressInfo, setAddressInfo] = useState(
    formData.addressInfo || {
      country: "",
      state: "",
      district: "",
      city: "",
      pinCode: "",
      currentAddress: "",
      permanentAddress: ""
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

  // States for API data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({
    staffId: false,
    role: false,
    designation: false,
    firstName: false,
    gender: false,
    dob: false,
    phone: false,
    emergencyContact: false,
    email: false,
    country: false,
    state: false,
    district: false,
    city: false,
    pinCode: false,
    currentAddress: false,
    permanentAddress: false,
    panCard: false,
    aadhaarCard: false,
    fatherName: false,
    motherName: false,
    maritalStatus: false,
    experiences: experiences.map(() => ({
      company: false,
      position: false,
      from: false,
      to: false,
      description: false // Add description error
    }))
  });

  const [showErrors, setShowErrors] = useState(false);

  // Initialize experiences errors array
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      experiences: experiences.map(() => ({
        company: false,
        position: false,
        from: false,
        to: false
      }))
    }));
  }, [experiences.length]);

  // Update formData whenever any field changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedImage,
      role,
      joiningDate,
      sameAsAddress,
      basicInfo,
      addressInfo,
      experiences,
      documents
    }));
  }, [
    selectedImage,
    role,
    joiningDate,
    sameAsAddress,
    basicInfo,
    addressInfo,
    experiences,
    documents
  ]);

  // Validate all required fields
  const validateForm = (show = false) => {
    const newErrors = {
      staffId: !basicInfo.staffId,
      role: !role,
      designation: !basicInfo.designation,
      firstName: !basicInfo.firstName,
      gender: !basicInfo.gender,
      dob: !basicInfo.dob,
      phone: !basicInfo.phone,
      emergencyContact: !basicInfo.emergencyContact,
      email: !basicInfo.email,
      fatherName: !basicInfo.fatherName,
      motherName: !basicInfo.motherName,
      maritalStatus: !basicInfo.maritalStatus,
      country: !addressInfo.country,
      state: !addressInfo.state,
      district: !addressInfo.district,
      city: !addressInfo.city,
      pinCode: !addressInfo.pinCode,
      currentAddress: !addressInfo.currentAddress,
      permanentAddress: !addressInfo.permanentAddress,
      panCard: !documents.panCard,
      aadhaarCard: !documents.aadhaarCard,
      experiences: experiences.map((exp) => ({
        company: !exp.company,
        position: !exp.position,
        from: !exp.from,
        to: !exp.to,
        description: !exp.description
      }))
    };

    if (show) setErrors(newErrors); // show errors only when asked

    const isFormValid =
      !newErrors.staffId &&
      !newErrors.role &&
      !newErrors.designation &&
      !newErrors.firstName &&
      !newErrors.gender &&
      !newErrors.dob &&
      !newErrors.phone &&
      !newErrors.emergencyContact &&
      !newErrors.email &&
      !newErrors.country &&
      !newErrors.state &&
      !newErrors.district &&
      !newErrors.city &&
      !newErrors.pinCode &&
      !newErrors.currentAddress &&
      !newErrors.permanentAddress &&
      !newErrors.panCard &&
      !newErrors.aadhaarCard &&
      newErrors.experiences.every((exp) => !exp.company && !exp.position && !exp.from && !exp.to);

    if (onValidationChange) {
      onValidationChange(isFormValid);
    }

    return isFormValid;
  };

  // Set current date as default for date of joining
  useEffect(() => {
    if (!joiningDate) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setJoiningDate(formattedDate);
    }
  }, []);

  useEffect(() => {
    if (triggerValidation) {
      setShowErrors(true);
      validateForm(true);
    }
  }, [triggerValidation]);

  // ✅ NEW - only validate if user has triggered errors
  useEffect(() => {
    if (showErrors) {
      validateForm(true); // show errors
    } else {
      validateForm(false); // silent validation
    }
  }, [basicInfo, role, addressInfo, documents, experiences]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/");
        const data = await response.json();
        if (!data.error) {
          setCountries(
            data.data.map((c) => ({
              name: c.country,
              code: c.iso2 || c.country.slice(0, 2).toUpperCase()
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        // fallback
        setCountries([
          { name: "India", code: "IN" },
          { name: "United States", code: "US" },
          { name: "United Kingdom", code: "GB" }
        ]);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!addressInfo.country) return;

      setLoadingStates(true);
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: addressInfo.country })
        });
        const data = await response.json();
        if (!data.error) {
          setStates(
            data.data.states.map((state) => ({
              name: state.name,
              id: state.name
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        // fallback
        setStates([
          { name: "Maharashtra", id: "MH" },
          { name: "Delhi", id: "DL" },
          { name: "Karnataka", id: "KA" }
        ]);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, [addressInfo.country]);

  // Fetch districts (cities) when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!addressInfo.country || !addressInfo.state) return;

      setLoadingDistricts(true);
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country: addressInfo.country,
            state: addressInfo.state
          })
        });
        const data = await response.json();
        if (!data.error) {
          setDistricts(
            data.data.map((district) => ({
              name: district,
              id: district
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        // fallback
        setDistricts([
          { name: "Mumbai", id: "MU" },
          { name: "Pune", id: "PU" },
          { name: "Nagpur", id: "NA" }
        ]);
      } finally {
        setLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [addressInfo.state]);

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

  const errorStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "error.main",
      borderWidth: "2px"
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setErrors((prev) => ({ ...prev, role: false }));
  };

  const handleBackClick = () => {
    navigate("/human_resources/staff-details");
  };

  const [openPreview, setOpenPreview] = useState(false);
  const handlePreviewOpen = () => setOpenPreview(true);
  const handlePreviewClose = () => setOpenPreview(false);

  const handleAddressChange = (field, value) => {
    setAddressInfo((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is filled
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }

    // Reset dependent fields when country or state changes
    if (field === "country") {
      setAddressInfo((prev) => ({
        ...prev,
        state: "",
        district: ""
      }));
      setStates([]);
      setDistricts([]);
    } else if (field === "state") {
      setAddressInfo((prev) => ({
        ...prev,
        district: ""
      }));
      setDistricts([]);
    }
  };

  const handleSameAsAddressChange = (e) => {
    const checked = e.target.checked;
    setSameAsAddress(checked);
    if (checked) {
      setAddressInfo((prev) => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
      setErrors((prev) => ({ ...prev, permanentAddress: false }));
    }
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear error when field is filled
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);

    // Clear error when field is filled
    if (value && errors.experiences[index]?.[field]) {
      setErrors((prev) => {
        const newExperiences = [...prev.experiences];
        newExperiences[index] = { ...newExperiences[index], [field]: false };
        return { ...prev, experiences: newExperiences };
      });
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", from: "", to: "", description: "" }
    ]);

    // Add new experience error object
    setErrors((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: false, position: false, from: false, to: false }
      ]
    }));
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);

    // Remove corresponding error object
    setErrors((prev) => {
      const newExperiences = [...prev.experiences];
      newExperiences.splice(index, 1);
      return { ...prev, experiences: newExperiences };
    });
  };

  const handleDocumentChange = (field, value) => {
    setDocuments({
      ...documents,
      [field]: value
    });

    // Clear error when field is filled
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validate field on blur
  const handleFieldBlur = (field) => {
    if (field === "fatherName" || field === "motherName" || field === "maritalStatus") {
      setErrors((prev) => ({ ...prev, [field]: !basicInfo[field] }));
    } else if (field === "role") {
      setErrors((prev) => ({ ...prev, role: !role }));
    } else if (field in basicInfo) {
      setErrors((prev) => ({ ...prev, [field]: !basicInfo[field] }));
    } else if (field in documents) {
      setErrors((prev) => ({ ...prev, [field]: !documents[field] }));
    } else if (field in addressInfo) {
      setErrors((prev) => ({ ...prev, [field]: !addressInfo[field] }));
    }
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
              sx={errors.staffId ? errorStyle : inputStyle}
              value={basicInfo.staffId}
              onChange={(e) => handleBasicInfoChange("staffId", e.target.value)}
              onBlur={() => handleFieldBlur("staffId")}
              error={errors.staffId}
              helperText={errors.staffId ? "Staff ID is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.role ? errorStyle : inputStyle}
              error={errors.role}
            >
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={handleRoleChange}
                onBlur={() => handleFieldBlur("role")}
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
              {errors.role && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Role is required
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.designation ? errorStyle : inputStyle}
              error={errors.designation}
            >
              <InputLabel>Designation</InputLabel>
              <Select
                value={basicInfo.designation}
                label="Designation"
                onChange={(e) => handleBasicInfoChange("designation", e.target.value)}
                onBlur={() => handleFieldBlur("designation")}
              >
                <MenuItem value="Professor" sx={{ fontSize: "0.875rem" }}>
                  Professor
                </MenuItem>
                <MenuItem value="Lecturer" sx={{ fontSize: "0.875rem" }}>
                  Lecturer
                </MenuItem>
              </Select>
              {errors.designation && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Designation is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Row 2 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              required
              sx={errors.firstName ? errorStyle : inputStyle}
              value={basicInfo.firstName}
              onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
              onBlur={() => handleFieldBlur("firstName")}
              error={errors.firstName}
              helperText={errors.firstName ? "First name is required" : ""}
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
            <FormControl
              fullWidth
              required
              sx={errors.gender ? errorStyle : inputStyle}
              error={errors.gender}
            >
              <InputLabel>Gender</InputLabel>
              <Select
                value={basicInfo.gender}
                label="Gender"
                onChange={(e) => handleBasicInfoChange("gender", e.target.value)}
                onBlur={() => handleFieldBlur("gender")}
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
              {errors.gender && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Gender is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={errors.dob ? errorStyle : inputStyle}
              value={basicInfo.dob}
              onChange={(e) => handleBasicInfoChange("dob", e.target.value)}
              onBlur={() => handleFieldBlur("dob")}
              error={errors.dob}
              helperText={errors.dob ? "Date of birth is required" : ""}
            />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              fullWidth
              required
              sx={errors.phone ? errorStyle : inputStyle}
              value={basicInfo.phone}
              onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
              onBlur={() => handleFieldBlur("phone")}
              error={errors.phone}
              helperText={errors.phone ? "Phone number is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Emergency Contact"
              fullWidth
              required
              sx={errors.emergencyContact ? errorStyle : inputStyle}
              value={basicInfo.emergencyContact}
              onChange={(e) => handleBasicInfoChange("emergencyContact", e.target.value)}
              onBlur={() => handleFieldBlur("emergencyContact")}
              error={errors.emergencyContact}
              helperText={errors.emergencyContact ? "Emergency contact is required" : ""}
            />
          </Grid>
          {/* Row 3 */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email (Login Username)"
              fullWidth
              required
              sx={errors.email ? errorStyle : inputStyle}
              value={basicInfo.email}
              onChange={(e) => handleBasicInfoChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              error={errors.email}
              helperText={errors.email ? "Email is required" : ""}
            />
          </Grid>

          {/* Father Name Field */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Dropdown for Title (Mr./Shri) */}
              <FormControl sx={{ width: "80px" }}>
                <Select
                  value={basicInfo.fatherTitle || ""}
                  onChange={(e) => handleBasicInfoChange("fatherTitle", e.target.value)}
                  sx={{ height: "38px", fontSize: "0.875rem" }}
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Shri">Shri</MenuItem>
                </Select>
              </FormControl>

              {/* Father's Name Input */}
              <TextField
                label="Father's Name"
                fullWidth
                required
                sx={errors.fatherName ? errorStyle : inputStyle}
                value={basicInfo.fatherName}
                onChange={(e) => handleBasicInfoChange("fatherName", e.target.value)}
                onBlur={() => handleFieldBlur("fatherName")}
                error={errors.fatherName}
                helperText={errors.fatherName ? "Father's name is required" : ""}
              />
            </Box>
          </Grid>

          {/* Mother Name Field */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* Dropdown for Title (Mrs./Shrimati) */}
              <FormControl sx={{ width: "100px" }}>
                <Select
                  value={basicInfo.motherTitle || ""}
                  onChange={(e) => handleBasicInfoChange("motherTitle", e.target.value)}
                  sx={{ height: "38px", fontSize: "0.875rem" }}
                >
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                  <MenuItem value="Shrimati">Shrimati</MenuItem>
                </Select>
              </FormControl>

              {/* Mother's Name Input */}
              <TextField
                label="Mother's Name"
                fullWidth
                required
                sx={errors.motherName ? errorStyle : inputStyle}
                value={basicInfo.motherName}
                onChange={(e) => handleBasicInfoChange("motherName", e.target.value)}
                onBlur={() => handleFieldBlur("motherName")}
                error={errors.motherName}
                helperText={errors.motherName ? "Mother's name is required" : ""}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required // Add required prop
              sx={errors.maritalStatus ? errorStyle : inputStyle} // Add error styling
              error={errors.maritalStatus} // Add error state
            >
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={basicInfo.maritalStatus}
                label="Marital Status"
                onChange={(e) => handleBasicInfoChange("maritalStatus", e.target.value)}
                onBlur={() => handleFieldBlur("maritalStatus")} // Add blur handler
              >
                <MenuItem value="" sx={{ fontSize: "0.875rem" }}>
                  Select
                </MenuItem>
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
              {errors.maritalStatus && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Marital status is required
                </Typography>
              )}
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
        </Grid>
      </Box>

      {/* Address Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? theme.palette.common.white : "inherit",
            mb: 2
          }}
        >
          Address Information
        </Typography>
        <Grid container spacing={1.5}>
          {/* Country */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.country ? errorStyle : inputStyle}
              error={errors.country}
            >
              <InputLabel>Country</InputLabel>
              <Select
                value={addressInfo.country}
                label="Country"
                onChange={(e) => handleAddressChange("country", e.target.value)}
                onBlur={() => handleFieldBlur("country")}
              >
                <MenuItem value="" sx={{ fontSize: "0.875rem" }}>
                  Select Country
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name} sx={{ fontSize: "0.875rem" }}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Country is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.state ? errorStyle : inputStyle}
              error={errors.state}
            >
              <InputLabel>State</InputLabel>
              <Select
                value={addressInfo.state}
                label="State"
                onChange={(e) => handleAddressChange("state", e.target.value)}
                onBlur={() => handleFieldBlur("state")}
                disabled={!addressInfo.country || loadingStates}
              >
                <MenuItem value="" sx={{ fontSize: "0.875rem" }}>
                  {loadingStates ? "Loading states..." : "Select State"}
                </MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.id} value={state.name} sx={{ fontSize: "0.875rem" }}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingStates && (
                <CircularProgress size={24} sx={{ position: "absolute", right: 40, top: 8 }} />
              )}
              {errors.state && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  State is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* District */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.district ? errorStyle : inputStyle}
              error={errors.district}
            >
              <InputLabel>District</InputLabel>
              <Select
                value={addressInfo.district}
                label="District"
                onChange={(e) => handleAddressChange("district", e.target.value)}
                onBlur={() => handleFieldBlur("district")}
                disabled={!addressInfo.state || loadingDistricts}
              >
                <MenuItem value="" sx={{ fontSize: "0.875rem" }}>
                  {loadingDistricts ? "Loading districts..." : "Select District"}
                </MenuItem>
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.name} sx={{ fontSize: "0.875rem" }}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingDistricts && (
                <CircularProgress size={24} sx={{ position: "absolute", right: 40, top: 8 }} />
              )}
              {errors.district && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  District is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* City/Town */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="City/Town"
              fullWidth
              required
              value={addressInfo.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              onBlur={() => handleFieldBlur("city")}
              error={errors.city}
              helperText={errors.city ? "City/Town is required" : ""}
              sx={errors.city ? errorStyle : inputStyle}
            />
          </Grid>

          {/* Pin Code */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Pin Code"
              fullWidth
              required
              value={addressInfo.pinCode}
              onChange={(e) => handleAddressChange("pinCode", e.target.value)}
              onBlur={() => handleFieldBlur("pinCode")}
              error={errors.pinCode}
              helperText={errors.pinCode ? "Pin code is required" : ""}
              sx={errors.pinCode ? errorStyle : inputStyle}
            />
          </Grid>

          {/* Current Address */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Current Address"
              fullWidth
              multiline
              rows={2}
              required
              value={addressInfo.currentAddress}
              onChange={(e) => handleAddressChange("currentAddress", e.target.value)}
              onBlur={() => handleFieldBlur("currentAddress")}
              error={errors.currentAddress}
              helperText={errors.currentAddress ? "Current address is required" : ""}
              sx={{
                ...(errors.currentAddress ? errorStyle : inputStyle),
                "& .MuiInputBase-root": {
                  height: "auto",
                  minHeight: "80px"
                }
              }}
            />
          </Grid>

          {/* Permanent Address */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Permanent Address"
                fullWidth
                multiline
                rows={2}
                required
                value={addressInfo.permanentAddress}
                onChange={(e) => handleAddressChange("permanentAddress", e.target.value)}
                onBlur={() => handleFieldBlur("permanentAddress")}
                error={errors.permanentAddress}
                helperText={errors.permanentAddress ? "Permanent address is required" : ""}
                sx={{
                  ...(errors.permanentAddress ? errorStyle : inputStyle),
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
                  onBlur={() => {
                    if (!exp.company) {
                      setErrors((prev) => {
                        const newExperiences = [...prev.experiences];
                        newExperiences[index] = { ...newExperiences[index], company: true };
                        return { ...prev, experiences: newExperiences };
                      });
                    }
                  }}
                  sx={errors.experiences[index]?.company ? errorStyle : inputStyle}
                  error={errors.experiences[index]?.company}
                  helperText={errors.experiences[index]?.company ? "Company name is required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Position"
                  fullWidth
                  required
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                  onBlur={() => {
                    if (!exp.position) {
                      setErrors((prev) => {
                        const newExperiences = [...prev.experiences];
                        newExperiences[index] = { ...newExperiences[index], position: true };
                        return { ...prev, experiences: newExperiences };
                      });
                    }
                  }}
                  sx={errors.experiences[index]?.position ? errorStyle : inputStyle}
                  error={errors.experiences[index]?.position}
                  helperText={errors.experiences[index]?.position ? "Position is required" : ""}
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
                  onBlur={() => {
                    if (!exp.from) {
                      setErrors((prev) => {
                        const newExperiences = [...prev.experiences];
                        newExperiences[index] = { ...newExperiences[index], from: true };
                        return { ...prev, experiences: newExperiences };
                      });
                    }
                  }}
                  sx={errors.experiences[index]?.from ? errorStyle : inputStyle}
                  error={errors.experiences[index]?.from}
                  helperText={errors.experiences[index]?.from ? "From date is required" : ""}
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
                  onBlur={() => {
                    if (!exp.to) {
                      setErrors((prev) => {
                        const newExperiences = [...prev.experiences];
                        newExperiences[index] = { ...newExperiences[index], to: true };
                        return { ...prev, experiences: newExperiences };
                      });
                    }
                  }}
                  sx={errors.experiences[index]?.to ? errorStyle : inputStyle}
                  error={errors.experiences[index]?.to}
                  helperText={errors.experiences[index]?.to ? "To date is required" : ""}
                />
              </Grid>
              {/* Description Field in Experience Section */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  fullWidth
                  required // Add required prop
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  onBlur={() => {
                    if (!exp.description) {
                      setErrors((prev) => {
                        const newExperiences = [...prev.experiences];
                        newExperiences[index] = { ...newExperiences[index], description: true };
                        return { ...prev, experiences: newExperiences };
                      });
                    }
                  }}
                  sx={errors.experiences[index]?.description ? errorStyle : inputStyle} // Add error styling
                  error={errors.experiences[index]?.description} // Add error state
                  helperText={
                    errors.experiences[index]?.description ? "Description is required" : ""
                  } // Add helper text
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
              onBlur={() => handleFieldBlur("panCard")}
              sx={errors.panCard ? errorStyle : inputStyle}
              error={errors.panCard}
              helperText={errors.panCard ? "PAN card number is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Aadhaar Card Number"
              fullWidth
              required
              value={documents.aadhaarCard}
              onChange={(e) => handleDocumentChange("aadhaarCard", e.target.value)}
              onBlur={() => handleFieldBlur("aadhaarCard")}
              sx={errors.aadhaarCard ? errorStyle : inputStyle}
              error={errors.aadhaarCard}
              helperText={errors.aadhaarCard ? "Aadhaar card number is required" : ""}
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
