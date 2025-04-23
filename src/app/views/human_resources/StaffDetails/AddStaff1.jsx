import React, { useState, useEffect, useRef } from "react";
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
import { SlCalender } from "react-icons/sl";
import { saveFileToDB, getAllFilesFromDB } from "app/utils/indexedDBUtils";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const objectUrlsRef = useRef([]);
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
      currentFullAddress: "",
      currentPinCode: "",
      currentCountry: "",
      currentState: "",
      currentDistrict: "",
      currentCity: "",
      permanentFullAddress: "",
      permanentPinCode: "",
      permanentCountry: "",
      permanentState: "",
      permanentDistrict: "",
      permanentCity: ""
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

  const [validationMessages, setValidationMessages] = useState({
    phone: "",
    email: ""
  });

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    if (phone.length !== 10) return "Phone number must be 10 digits";
    if (!/^\d+$/.test(phone)) return "Phone number must contain only digits";
    return "";
  };

  // Update email validation
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    return "";
  };

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
    const phoneValid = !validatePhone(basicInfo.phone);
    const emailValid = !validateEmail(basicInfo.email);

    const newErrors = {
      staffId: !basicInfo.staffId,
      role: !role,
      designation: !basicInfo.designation,
      firstName: !basicInfo.firstName,
      gender: !basicInfo.gender,
      dob: !basicInfo.dob,
      phone: !phoneValid,
      email: !emailValid,
      emergencyContact: !basicInfo.emergencyContact,
      fatherName: !basicInfo.fatherName,
      motherName: !basicInfo.motherName,
      maritalStatus: !basicInfo.maritalStatus,

      // Current Address Fields
      currentFullAddress: !addressInfo.currentFullAddress,
      currentPinCode: !addressInfo.currentPinCode,

      // Permanent Address Fields (only validate if not same as current address)
      permanentFullAddress: sameAsAddress ? false : !addressInfo.permanentFullAddress,
      permanentPinCode: sameAsAddress ? false : !addressInfo.permanentPinCode,

      // Document Fields
      panCard: !documents.panCard,
      aadhaarCard: !documents.aadhaarCard,

      // Experience Fields
      experiences: experiences.map((exp) => ({
        company: !exp.company,
        position: !exp.position,
        from: !exp.from,
        to: !exp.to,
        description: !exp.description
      }))
    };

    if (show) {
      setErrors(newErrors);
      setValidationMessages({
        phone: validatePhone(basicInfo.phone),
        email: validateEmail(basicInfo.email)
      });
    }

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
      !newErrors.fatherName &&
      !newErrors.motherName &&
      !newErrors.maritalStatus &&
      !newErrors.currentFullAddress &&
      !newErrors.currentPinCode &&
      !newErrors.permanentFullAddress &&
      !newErrors.permanentPinCode &&
      !newErrors.panCard &&
      !newErrors.aadhaarCard &&
      newErrors.experiences.every(
        (exp) => !exp.company && !exp.position && !exp.from && !exp.to && !exp.description
      ) &&
      phoneValid &&
      emailValid;

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
    }
  };

  // Soft error styling
  const errorStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.light // हल्का लाल बॉर्डर
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.error.light, // हल्का लाल टेक्स्ट
      position: "absolute",
      bottom: "-20px",
      left: 0,
      margin: 0,
      fontSize: "0.75rem"
    }
  };

  // For select components
  const selectErrorStyle = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? theme.palette.grey[500] : theme.palette.grey[400]
    },
    "& .MuiInputLabel-root": {
      color: isDarkMode ? theme.palette.grey[400] : theme.palette.grey[600]
    }
  };

  useEffect(() => {
    const loadImageFromIndexedDB = async () => {
      // Fresh start detection: if formData doesn't have selectedImage
      const isNewForm = !formData.selectedImage;

      if (isNewForm) {
        // Don't preload image for new form
        return;
      }

      try {
        const files = await getAllFilesFromDB();
        const file = files["staff-photo"];

        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImage(imageUrl);

          // setFormData to keep selectedImage always in sync
          setFormData((prev) => ({
            ...prev,
            selectedImage: {
              key: "staff-photo",
              name: file.name
            }
          }));
        }
      } catch (err) {
        console.error("Failed to load image from IndexedDB:", err);
      }
    };

    loadImageFromIndexedDB();

    return () => {
      // Cleanup object URLs when component unmounts
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
        objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== selectedImage);
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      await saveFileToDB("staff-photo", file);

      setFormData((prev) => ({
        ...prev,
        selectedImage: {
          key: "staff-photo",
          name: file.name
        }
      }));
    }
  };

  const handleRemoveImage = async () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== selectedImage);
      setSelectedImage(null);

      try {
        await deleteFileFromDB("staff-photo");
        setFormData((prev) => ({
          ...prev,
          selectedImage: null
        }));
      } catch (err) {
        console.error("Failed to delete image from IndexedDB:", err);
      }
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
        permanentFullAddress: prev.currentFullAddress,
        permanentPinCode: prev.currentPinCode,
        permanentCountry: prev.currentCountry,
        permanentState: prev.currentState,
        permanentDistrict: prev.currentDistrict,
        permanentCity: prev.currentCity
      }));
      setErrors((prev) => ({
        ...prev,
        permanentFullAddress: false,
        permanentPinCode: false
      }));
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

    // Validate phone and email
    if (field === "phone") {
      const message = validatePhone(value);
      setValidationMessages((prev) => ({ ...prev, phone: message }));
      setErrors((prev) => ({ ...prev, phone: !!message }));
    }

    if (field === "email") {
      const message = validateEmail(value);
      setValidationMessages((prev) => ({ ...prev, email: message }));
      setErrors((prev) => ({ ...prev, email: !!message }));
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
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              fontSize: "0.875rem",
              backgroundColor: theme.palette.primary.main,
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark
              }
            }}
            onClick={() => navigate("/human_resources/staff-details/import-staff")}
          >
            Import Staff
          </Button>
        </Box>

        <Grid container spacing={1.5}>
          {/* Row 1 - Staff ID, Role, Designation */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Staff ID"
              fullWidth
              required
              sx={errors.staffId ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={basicInfo.staffId}
              onChange={(e) => handleBasicInfoChange("staffId", e.target.value)}
              onBlur={() => handleFieldBlur("staffId")}
              error={errors.staffId}
              helperText={errors.staffId ? "Staff ID is required" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.role ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
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
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "14px",
                    fontSize: "0.75rem"
                  }}
                >
                  Role is required
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.designation ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
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
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "14px",
                    fontSize: "0.75rem"
                  }}
                >
                  Designation is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Row 2 - First Name, Last Name, Gender */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              fullWidth
              required
              sx={errors.firstName ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={basicInfo.firstName}
              onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
              onBlur={() => handleFieldBlur("firstName")}
              error={errors.firstName}
              helperText={errors.firstName ? "First name is required" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              fullWidth
              sx={{ ...inputStyle, mb: 3 }}
              value={basicInfo.lastName}
              onChange={(e) => handleBasicInfoChange("lastName", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.gender ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
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
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "14px",
                    fontSize: "0.75rem"
                  }}
                >
                  Gender is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Row 3 - Date of Birth, Phone, Emergency Contact */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={basicInfo.dob}
              onChange={(e) => handleBasicInfoChange("dob", e.target.value)}
              onBlur={() => handleFieldBlur("dob")}
              error={errors.dob}
              helperText={errors.dob ? "Date of birth is required" : " "}
              sx={errors.dob ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              InputProps={{
                // This removes the default browser calendar icon
                inputProps: {
                  style: {
                    // Hide the default calendar dropdown arrow in Chrome/Safari
                    "::-webkit-calendar-picker-indicator": {
                      display: "none",
                      "-webkit-appearance": "none"
                    },
                    // Hide in Firefox
                    "::-moz-calendar-picker-indicator": {
                      display: "none"
                    }
                  }
                },
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Programmatically open the date picker
                      const input = e.currentTarget
                        .closest(".MuiTextField-root")
                        .querySelector('input[type="date"]');
                      input.showPicker();
                    }}
                    sx={{ padding: "8px", color: theme.palette.text.secondary }}
                  >
                    <SlCalender />
                  </IconButton>
                )
              }}
              onClick={(e) => {
                // Open date picker when clicking anywhere in the field
                const input = e.currentTarget.querySelector('input[type="date"]');
                input.showPicker();
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              fullWidth
              required
              value={basicInfo.phone}
              onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
              onBlur={() => {
                handleFieldBlur("phone");
                const message = validatePhone(basicInfo.phone);
                setValidationMessages((prev) => ({ ...prev, phone: message }));
                setErrors((prev) => ({ ...prev, phone: !!message }));
              }}
              error={errors.phone}
              helperText={validationMessages.phone || " "}
              inputProps={{ maxLength: 10 }}
              sx={errors.phone ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Emergency Contact"
              fullWidth
              required
              sx={errors.emergencyContact ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={basicInfo.emergencyContact}
              onChange={(e) => handleBasicInfoChange("emergencyContact", e.target.value)}
              onBlur={() => handleFieldBlur("emergencyContact")}
              error={errors.emergencyContact}
              helperText={errors.emergencyContact ? "Emergency contact is required" : " "}
            />
          </Grid>

          {/* Row 4 - Email, Marital Status */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email (Login Username)"
              fullWidth
              required
              value={basicInfo.email}
              onChange={(e) => handleBasicInfoChange("email", e.target.value)}
              onBlur={() => {
                handleFieldBlur("email");
                const message = validateEmail(basicInfo.email);
                setValidationMessages((prev) => ({ ...prev, email: message }));
                setErrors((prev) => ({ ...prev, email: !!message }));
              }}
              error={errors.email}
              helperText={validationMessages.email || " "}
              sx={errors.email ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.maritalStatus ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              error={errors.maritalStatus}
            >
              <InputLabel>Marital Status</InputLabel>
              <Select
                value={basicInfo.maritalStatus}
                label="Marital Status"
                onChange={(e) => handleBasicInfoChange("maritalStatus", e.target.value)}
                onBlur={() => handleFieldBlur("maritalStatus")}
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
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "14px",
                    fontSize: "0.75rem"
                  }}
                >
                  Marital status is required
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Row 5 - Father's Name, Mother's Name */}
          <Grid container spacing={2}>
            {/* Father's Name */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                {/* Title Dropdown */}
                <FormControl sx={{ mr: 1, minWidth: 100 }}>
                  <Select
                    value={basicInfo.fatherTitle || "Shri"}
                    onChange={(e) => handleBasicInfoChange("fatherTitle", e.target.value)}
                    sx={{
                      height: "40px",
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      },
                      marginLeft: "11.5px",
                      ...inputStyle
                    }}
                  >
                    <MenuItem value="Shri">Shri</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                  </Select>
                </FormControl>

                {/* Name Field */}
                <TextField
                  label="Father's Name"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      height: "40px"
                    },
                    "& .MuiInputLabel-root": {
                      transform: basicInfo.fatherName
                        ? "translate(14px, -9px) scale(0.75)"
                        : "translate(14px, 10px) scale(1)",
                      "&.Mui-focused": {
                        transform: "translate(14px, -9px) scale(0.75)"
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                      {
                        transform: "translate(14px, -9px) scale(0.75)"
                      },
                    "& input": {
                      padding: "10px 14px"
                    },
                    ...inputStyle
                  }}
                  value={basicInfo.fatherName}
                  onChange={(e) => handleBasicInfoChange("fatherName", e.target.value)}
                  error={errors.fatherName}
                  helperText={errors.fatherName ? "Father's name is required" : " "}
                />
              </Box>
            </Grid>

            {/* Mother's Name */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                {/* Title Dropdown */}
                <FormControl sx={{ mr: 1, minWidth: 100 }}>
                  <Select
                    value={basicInfo.motherTitle || "Shrimati"}
                    onChange={(e) => handleBasicInfoChange("motherTitle", e.target.value)}
                    sx={{
                      height: "40px",
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "8px",
                        paddingBottom: "8px"
                      },
                      ...inputStyle
                    }}
                  >
                    <MenuItem value="Shrimati">Shrimati</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                  </Select>
                </FormControl>

                {/* Name Field */}
                <TextField
                  label="Mother's Name"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    flex: 1,
                    "& .MuiInputBase-root": {
                      height: "40px"
                    },
                    "& .MuiInputLabel-root": {
                      transform: basicInfo.motherName
                        ? "translate(14px, -9px) scale(0.75)"
                        : "translate(14px, 10px) scale(1)",
                      "&.Mui-focused": {
                        transform: "translate(14px, -9px) scale(0.75)"
                      }
                    },
                    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                      {
                        transform: "translate(14px, -9px) scale(0.75)"
                      },
                    "& input": {
                      padding: "10px 14px"
                    },
                    ...inputStyle
                  }}
                  value={basicInfo.motherName}
                  onChange={(e) => handleBasicInfoChange("motherName", e.target.value)}
                  error={errors.motherName}
                  helperText={errors.motherName ? "Mother's name is required" : " "}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 6 - Date of Joining, Photo Upload */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Joining"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                sx={{
                  ml: { sm: 1.5 },
                  "& .MuiInputLabel-root": {
                    transform: "translate(14px, -9px) scale(0.75)"
                  },
                  ...inputStyle
                }}
                InputProps={{
                  inputProps: {
                    style: {
                      "::-webkit-calendar-picker-indicator": {
                        display: "none",
                        "-webkit-appearance": "none"
                      },
                      "::-moz-calendar-picker-indicator": {
                        display: "none"
                      }
                    }
                  },
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const input = e.currentTarget
                          .closest(".MuiTextField-root")
                          .querySelector('input[type="date"]');
                        input.showPicker();
                      }}
                      sx={{ padding: "8px", color: theme.palette.text.secondary }}
                    >
                      <SlCalender />
                    </IconButton>
                  ),
                  sx: {
                    height: 40,
                    fontSize: "0.875rem"
                  }
                }}
                onClick={(e) => {
                  const input = e.currentTarget.querySelector('input[type="date"]');
                  input.showPicker();
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, height: "100%" }}>
                <Box
                  component="label"
                  htmlFor="file-upload"
                  sx={{
                    flexGrow: 1,
                    border: "1px dashed",
                    borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.primary,
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    "&:hover": {
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  <AddPhotoAlternateIcon
                    sx={{
                      color: isDarkMode ? theme.palette.grey[400] : theme.palette.grey[600],
                      mr: 1,
                      fontSize: 20
                    }}
                  />
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      flex: 1,
                      fontSize: "0.875rem",
                      lineHeight: 1.5
                    }}
                  >
                    {selectedImage ? "Photo selected" : "Upload Photo"}
                  </Typography>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Box>
                {selectedImage && (
                  <Box
                    onClick={handlePreviewOpen}
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400],
                      flexShrink: 0,
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Address Information Section */}
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

        {/* Current Address Section */}
        <Box
          sx={{ mb: 4, p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: "8px" }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
            Current Address
          </Typography>

          <Grid container spacing={1.5}>
            {/* Full Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Address"
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                required
                value={addressInfo.currentFullAddress}
                onChange={(e) => handleAddressChange("currentFullAddress", e.target.value)}
                onBlur={() => handleFieldBlur("currentFullAddress")}
                error={errors.currentFullAddress}
                helperText={errors.currentFullAddress ? "Full address is required" : " "}
                sx={{
                  ...(errors.currentFullAddress ? { ...errorStyle, mb: 3 } : { ...inputStyle }),
                  "& .MuiInputBase-root": {
                    minHeight: "100px",
                    alignItems: "flex-start" // Align text to top
                  },
                  "& textarea": {
                    resize: "vertical" // Allow vertical resizing
                    // minHeight: "10px"
                  }
                }}
              />
            </Grid>

            {/* PIN Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="PIN Code"
                fullWidth
                required
                value={addressInfo.currentPinCode}
                onChange={(e) => {
                  handleAddressChange("currentPinCode", e.target.value);
                  if (!e.target.value) {
                    setAddressInfo((prev) => ({
                      ...prev,
                      currentCountry: "",
                      currentState: "",
                      currentDistrict: "",
                      currentCity: ""
                    }));
                  }
                }}
                onBlur={async () => {
                  handleFieldBlur("currentPinCode");
                  if (addressInfo.currentPinCode && addressInfo.currentPinCode.length === 6) {
                    try {
                      const response = await fetch(
                        `https://api.postalpincode.in/pincode/${addressInfo.currentPinCode}`
                      );
                      const data = await response.json();
                      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.[0]) {
                        const postOffice = data[0].PostOffice[0];
                        setAddressInfo((prev) => ({
                          ...prev,
                          currentCountry: postOffice.Country,
                          currentState: postOffice.State,
                          currentDistrict: postOffice.District,
                          currentCity: postOffice.Name
                        }));
                      }
                    } catch (error) {
                      console.error("Error fetching PIN code details:", error);
                      setAddressInfo((prev) => ({
                        ...prev,
                        currentCountry: "",
                        currentState: "",
                        currentDistrict: "",
                        currentCity: ""
                      }));
                    }
                  } else if (!addressInfo.currentPinCode) {
                    setAddressInfo((prev) => ({
                      ...prev,
                      currentCountry: "",
                      currentState: "",
                      currentDistrict: "",
                      currentCity: ""
                    }));
                  }
                }}
                error={errors.currentPinCode}
                helperText={errors.currentPinCode ? "Valid 6-digit PIN code is required" : " "}
                sx={errors.currentPinCode ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                inputProps={{ maxLength: 6 }}
              />
            </Grid>

            {/* Auto-filled fields */}
            {/* City/Town */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="City/Town"
                fullWidth
                value={addressInfo.currentCity || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* District */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="District"
                fullWidth
                value={addressInfo.currentDistrict || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="State"
                fullWidth
                value={addressInfo.currentState || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* Counttry */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Country"
                fullWidth
                value={addressInfo.currentCountry || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Permanent Address Section */}
        <Box sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: "8px" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Permanent Address
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsAddress}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSameAsAddress(checked);
                    if (checked) {
                      setAddressInfo((prev) => ({
                        ...prev,
                        permanentFullAddress: prev.currentFullAddress,
                        permanentPinCode: prev.currentPinCode,
                        permanentCountry: prev.currentCountry,
                        permanentState: prev.currentState,
                        permanentDistrict: prev.currentDistrict,
                        permanentCity: prev.currentCity
                      }));
                      setErrors((prev) => ({
                        ...prev,
                        permanentFullAddress: false,
                        permanentPinCode: false
                      }));
                    }
                  }}
                  size="small"
                />
              }
              label="Same as Current Address"
              sx={{ fontSize: "0.875rem" }}
            />
          </Box>

          <Grid container spacing={1.5}>
            {/* Full Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Address"
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                required
                value={
                  sameAsAddress ? addressInfo.currentFullAddress : addressInfo.permanentFullAddress
                }
                onChange={(e) => handleAddressChange("permanentFullAddress", e.target.value)}
                onBlur={() => handleFieldBlur("permanentFullAddress")}
                error={errors.permanentFullAddress}
                helperText={errors.permanentFullAddress ? "Full address is required" : " "}
                sx={{
                  ...(errors.permanentFullAddress ? { ...errorStyle, mb: 3 } : { ...inputStyle }),
                  "& .MuiInputBase-root": {
                    minHeight: "100px",
                    alignItems: "flex-start"
                  },
                  "& textarea": {
                    resize: "vertical"
                    // minHeight: "100px"
                  }
                }}
                disabled={sameAsAddress}
              />
            </Grid>

            {/* PIN Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="PIN Code"
                fullWidth
                required
                value={sameAsAddress ? addressInfo.currentPinCode : addressInfo.permanentPinCode}
                onChange={(e) => {
                  handleAddressChange("permanentPinCode", e.target.value);
                  if (!e.target.value) {
                    setAddressInfo((prev) => ({
                      ...prev,
                      permanentCountry: "",
                      permanentState: "",
                      permanentDistrict: "",
                      permanentCity: ""
                    }));
                  }
                }}
                onBlur={async () => {
                  handleFieldBlur("permanentPinCode");
                  if (
                    !sameAsAddress &&
                    addressInfo.permanentPinCode &&
                    addressInfo.permanentPinCode.length === 6
                  ) {
                    try {
                      const response = await fetch(
                        `https://api.postalpincode.in/pincode/${addressInfo.permanentPinCode}`
                      );
                      const data = await response.json();
                      if (data[0]?.Status === "Success" && data[0]?.PostOffice?.[0]) {
                        const postOffice = data[0].PostOffice[0];
                        setAddressInfo((prev) => ({
                          ...prev,
                          permanentCountry: postOffice.Country,
                          permanentState: postOffice.State,
                          permanentDistrict: postOffice.District,
                          permanentCity: postOffice.Name
                        }));
                      }
                    } catch (error) {
                      console.error("Error fetching PIN code details:", error);
                      setAddressInfo((prev) => ({
                        ...prev,
                        permanentCountry: "",
                        permanentState: "",
                        permanentDistrict: "",
                        permanentCity: ""
                      }));
                    }
                  } else if (!sameAsAddress && !addressInfo.permanentPinCode) {
                    setAddressInfo((prev) => ({
                      ...prev,
                      permanentCountry: "",
                      permanentState: "",
                      permanentDistrict: "",
                      permanentCity: ""
                    }));
                  }
                }}
                error={errors.permanentPinCode}
                helperText={errors.permanentPinCode ? "Valid 6-digit PIN code is required" : " "}
                sx={errors.permanentPinCode ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                inputProps={{ maxLength: 6 }}
                disabled={sameAsAddress}
              />
            </Grid>

            {/* Auto-filled fields */}
            {/* City/State */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="City/Town"
                fullWidth
                value={sameAsAddress ? addressInfo.currentCity : addressInfo.permanentCity || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* District */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="District"
                fullWidth
                value={
                  sameAsAddress ? addressInfo.currentDistrict : addressInfo.permanentDistrict || ""
                }
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="State"
                fullWidth
                value={sameAsAddress ? addressInfo.currentState : addressInfo.permanentState || ""}
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>

            {/* Country */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Country"
                fullWidth
                value={
                  sameAsAddress ? addressInfo.currentCountry : addressInfo.permanentCountry || ""
                }
                InputProps={{ readOnly: true }}
                sx={{ ...inputStyle }}
              />
            </Grid>
          </Grid>
        </Box>
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
                  sx={
                    errors.experiences[index]?.company
                      ? { ...errorStyle, mb: 3 }
                      : { ...inputStyle }
                  }
                  error={errors.experiences[index]?.company}
                  helperText={errors.experiences[index]?.company ? "Company name is required" : " "}
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
                  sx={
                    errors.experiences[index]?.position
                      ? { ...errorStyle, mb: 3 }
                      : { ...inputStyle }
                  }
                  error={errors.experiences[index]?.position}
                  helperText={errors.experiences[index]?.position ? "Position is required" : " "}
                />
              </Grid>

              <Grid item xs={12} sm={3} key={`from-${index}`}>
                <TextField
                  label="From Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={exp.from}
                  onChange={(e) => handleExperienceChange(index, "from", e.target.value)}
                  sx={
                    errors.experiences[index]?.from ? { ...errorStyle, mb: 3 } : { ...inputStyle }
                  }
                  InputProps={{
                    inputProps: {
                      style: {
                        // For Chrome/Safari
                        "::-webkit-calendar-picker-indicator": {
                          display: "none",
                          "-webkit-appearance": "none"
                        },
                        // For Firefox
                        "::-moz-calendar-picker-indicator": {
                          display: "none"
                        },
                        // For Edge
                        "::-ms-clear": {
                          display: "none"
                        }
                      }
                    },
                    endAdornment: (
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const input = e.currentTarget
                            .closest(".MuiTextField-root")
                            .querySelector('input[type="date"]');
                          input.showPicker();
                        }}
                        sx={{ padding: "8px", color: theme.palette.text.secondary }}
                      >
                        <SlCalender />
                      </IconButton>
                    )
                  }}
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    input.showPicker();
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={3} key={`to-${index}`}>
                <TextField
                  label="To Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={exp.to}
                  onChange={(e) => handleExperienceChange(index, "to", e.target.value)}
                  sx={errors.experiences[index]?.to ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                  InputProps={{
                    // This completely removes the default calendar icon
                    inputProps: {
                      style: {
                        // For Chrome/Safari
                        "::-webkit-calendar-picker-indicator": {
                          display: "none",
                          "-webkit-appearance": "none"
                        },
                        // For Firefox
                        "::-moz-calendar-picker-indicator": {
                          display: "none"
                        },
                        // For Edge
                        "::-ms-clear": {
                          display: "none"
                        }
                      }
                    },
                    endAdornment: (
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const input = e.currentTarget
                            .closest(".MuiTextField-root")
                            .querySelector('input[type="date"]');
                          input.showPicker();
                        }}
                        sx={{ padding: "8px", color: theme.palette.text.secondary }}
                      >
                        <SlCalender />
                      </IconButton>
                    )
                  }}
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input[type="date"]');
                    input.showPicker();
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  fullWidth
                  required
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
                  sx={
                    errors.experiences[index]?.description
                      ? { ...errorStyle, mb: 3 }
                      : { ...inputStyle }
                  }
                  error={errors.experiences[index]?.description}
                  helperText={
                    errors.experiences[index]?.description ? "Description is required" : " "
                  }
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
        <Button variant="outlined" onClick={addExperience}>
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
              sx={errors.panCard ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              error={errors.panCard}
              helperText={errors.panCard ? "PAN card number is required" : " "}
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
              sx={errors.aadhaarCard ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              error={errors.aadhaarCard}
              helperText={errors.aadhaarCard ? "Aadhaar card number is required" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passport Number"
              fullWidth
              value={documents.passport}
              onChange={(e) => handleDocumentChange("passport", e.target.value)}
              sx={{ ...inputStyle }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Driving License Number"
              fullWidth
              value={documents.drivingLicense}
              onChange={(e) => handleDocumentChange("drivingLicense", e.target.value)}
              sx={{ ...inputStyle }}
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
