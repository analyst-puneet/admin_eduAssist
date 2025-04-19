import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  IconButton
} from "@mui/material";
import {
  Delete as DeleteIcon,
  InsertDriveFile as InsertDriveFileIcon,
  AddCircleOutline as AddCircleOutlineIcon
} from "@mui/icons-material";

export default function AddStaff4({
  formData,
  setFormData,
  onValidationChange,
  triggerValidation
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [educationLevel, setEducationLevel] = useState(formData.educationLevel || "");
  const [sections, setSections] = useState(formData.sections || []);
  const [fileNames, setFileNames] = useState(formData.fileNames || {});
  const [ugYears, setUgYears] = useState(formData.ugYears || 3);
  const [subjects, setSubjects] = useState(
    formData.subjects || [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" }
    ]
  );

  // Validation states
  const [errors, setErrors] = useState({
    tenthSchool: false,
    tenthBoard: false,
    tenthPercentage: false,
    tenthMarksheet: false,
    twelfthSchool: false,
    twelfthBoard: false,
    twelfthPercentage: false,
    twelfthMarksheet: false,
    subjects: Array(5).fill(false)
  });

  const [showErrors, setShowErrors] = useState(false);

  // Validate form and notify parent
  const validateForm = (show = false) => {
    const newErrors = {
      tenthSchool: !formData.tenthSchool,
      tenthBoard: !formData.tenthBoard,
      tenthPercentage: !formData.tenthPercentage,
      tenthMarksheet: !fileNames.tenthMarksheet,
      twelfthSchool: !formData.twelfthSchool,
      twelfthBoard: !formData.twelfthBoard,
      twelfthPercentage: !formData.twelfthPercentage,
      twelfthMarksheet: !fileNames.twelfthMarksheet,
      subjects: subjects.map((subject) => !subject.name)
    };

    if (show) setErrors(newErrors);

    const isFormValid =
      !newErrors.tenthSchool &&
      !newErrors.tenthBoard &&
      !newErrors.tenthPercentage &&
      !newErrors.tenthMarksheet &&
      !newErrors.twelfthSchool &&
      !newErrors.twelfthBoard &&
      !newErrors.twelfthPercentage &&
      !newErrors.twelfthMarksheet &&
      !newErrors.subjects.some((error) => error);

    if (onValidationChange) {
      onValidationChange(isFormValid);
    }

    return isFormValid;
  };

  // Update formData whenever any field changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      educationLevel,
      sections,
      fileNames,
      ugYears,
      subjects
    }));
    validateForm();
  }, [educationLevel, sections, fileNames, ugYears, subjects]);

  useEffect(() => {
    if (triggerValidation) {
      setShowErrors(true);
      validateForm(true);
    }
  }, [triggerValidation]);

  // Input styling with error state
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
    margin: "0.25rem 0"
  };

  const errorStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "error.main",
      borderWidth: "2px"
    }
  };

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name
      }));
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: false }));
      }
    }
  };

  const handleRemoveFile = (fieldName) => {
    setFileNames((prev) => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
    setErrors((prev) => ({ ...prev, [fieldName]: true }));
  };

  const FileInput = ({ label, fieldName, accept = "*", required = false }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="label"
        sx={{
          border: `1px dashed ${
            errors[fieldName]
              ? theme.palette.error.main
              : isDarkMode
              ? theme.palette.grey[600]
              : theme.palette.grey[400]
          }`,
          borderRadius: "6px",
          p: 1,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          bgcolor: errors[fieldName]
            ? theme.palette.error.light + "20"
            : isDarkMode
            ? theme.palette.grey[800]
            : theme.palette.background.paper,
          "&:hover": {
            borderColor: theme.palette.primary.main
          }
        }}
      >
        <InsertDriveFileIcon fontSize="small" />
        <Typography variant="body2" noWrap>
          {fileNames[fieldName] || label}
        </Typography>
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(fieldName, e)}
          hidden
        />
      </Box>
      {fileNames[fieldName] && (
        <IconButton size="small" onClick={() => handleRemoveFile(fieldName)} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = value;
    setSubjects(updatedSubjects);
    if (value && errors.subjects[index]) {
      setErrors((prev) => {
        const newSubjects = [...prev.subjects];
        newSubjects[index] = false;
        return { ...prev, subjects: newSubjects };
      });
    }
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { id: subjects.length + 1, name: "" }]);
    setErrors((prev) => ({
      ...prev,
      subjects: [...prev.subjects, false]
    }));
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleAddEducationSection = () => {
    if (educationLevel && !sections.includes(educationLevel)) {
      setSections([...sections, educationLevel]);
    }
  };

  const handleRemoveSection = (section) => {
    setSections(sections.filter((item) => item !== section));
    if (section === "UG") setUgYears(3);
  };

  const handleAddMoreUGYear = () => {
    setUgYears((prev) => prev + 1);
  };

  // Handle basic field changes
  const handleBasicFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validate field on blur
  const handleFieldBlur = (field) => {
    if (field in formData) {
      setErrors((prev) => ({ ...prev, [field]: !formData[field] }));
    }
  };

  // Higher education section validation
  const validateHigherEducation = (section) => {
    switch (section) {
      case "UG":
        return (
          !formData.ugCollegeName ||
          !formData.ugCourse ||
          !formData.ugPercentage ||
          !fileNames.ugYear1
        );
      case "PG":
        return (
          !formData.pgCollegeName ||
          !formData.pgCourse ||
          !formData.pgPercentage ||
          !fileNames.pgMarksheet
        );
      case "PhD":
        return !formData.phdCollegeName || !formData.phdCourse || !formData.phdCompletionYear;
      default:
        return false;
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
      {/* 10th Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          10th Class Details
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="School Name"
              fullWidth
              required
              sx={errors.tenthSchool ? errorStyle : inputStyle}
              value={formData.tenthSchool || ""}
              onChange={(e) => handleBasicFieldChange("tenthSchool", e.target.value)}
              onBlur={() => handleFieldBlur("tenthSchool")}
              error={errors.tenthSchool}
              helperText={errors.tenthSchool ? "School name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Board"
              fullWidth
              required
              sx={errors.tenthBoard ? errorStyle : inputStyle}
              value={formData.tenthBoard || ""}
              onChange={(e) => handleBasicFieldChange("tenthBoard", e.target.value)}
              onBlur={() => handleFieldBlur("tenthBoard")}
              error={errors.tenthBoard}
              helperText={errors.tenthBoard ? "Board is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Percentage"
              type="number"
              fullWidth
              required
              sx={errors.tenthPercentage ? errorStyle : inputStyle}
              value={formData.tenthPercentage || ""}
              onChange={(e) => handleBasicFieldChange("tenthPercentage", e.target.value)}
              onBlur={() => handleFieldBlur("tenthPercentage")}
              error={errors.tenthPercentage}
              helperText={errors.tenthPercentage ? "Percentage is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FileInput
                label="10th Marksheet (Required)"
                fieldName="tenthMarksheet"
                accept=".pdf,.jpg,.png"
                required
              />
              {errors.tenthMarksheet && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                  10th marksheet is required
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 12th Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          12th Class Details
        </Typography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="School Name"
              fullWidth
              required
              sx={errors.twelfthSchool ? errorStyle : inputStyle}
              value={formData.twelfthSchool || ""}
              onChange={(e) => handleBasicFieldChange("twelfthSchool", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthSchool")}
              error={errors.twelfthSchool}
              helperText={errors.twelfthSchool ? "School name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Board"
              fullWidth
              required
              sx={errors.twelfthBoard ? errorStyle : inputStyle}
              value={formData.twelfthBoard || ""}
              onChange={(e) => handleBasicFieldChange("twelfthBoard", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthBoard")}
              error={errors.twelfthBoard}
              helperText={errors.twelfthBoard ? "Board is required" : ""}
            />
          </Grid>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={4} key={subject.id}>
              <TextField
                label={`Subject ${index + 1}`}
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
                fullWidth
                required
                sx={errors.subjects[index] ? errorStyle : inputStyle}
                error={errors.subjects[index]}
                helperText={errors.subjects[index] ? "Subject is required" : ""}
                onBlur={() => {
                  if (!subject.name) {
                    setErrors((prev) => {
                      const newSubjects = [...prev.subjects];
                      newSubjects[index] = true;
                      return { ...prev, subjects: newSubjects };
                    });
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleAddSubject}>
          Add Subject
        </Button>
        <Grid container spacing={1.5} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Percentage"
              type="number"
              fullWidth
              required
              sx={errors.twelfthPercentage ? errorStyle : inputStyle}
              value={formData.twelfthPercentage || ""}
              onChange={(e) => handleBasicFieldChange("twelfthPercentage", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthPercentage")}
              error={errors.twelfthPercentage}
              helperText={errors.twelfthPercentage ? "Percentage is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FileInput
                label="12th Marksheet (Required)"
                fieldName="twelfthMarksheet"
                accept=".pdf,.jpg,.png"
                required
              />
              {errors.twelfthMarksheet && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
                  12th marksheet is required
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Higher Education Section */}
      <Box mb={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Higher Educational Qualifications
        </Typography>
      </Box>

      {/* UG Section */}
      {sections.includes("UG") && (
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
            UG (Undergraduate)
            <IconButton sx={{ float: "right" }} onClick={() => handleRemoveSection("UG")}>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="University/College Name"
                fullWidth
                required
                sx={inputStyle}
                value={formData.ugCollegeName || ""}
                onChange={(e) => handleBasicFieldChange("ugCollegeName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course"
                fullWidth
                required
                sx={inputStyle}
                value={formData.ugCourse || ""}
                onChange={(e) => handleBasicFieldChange("ugCourse", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Percentage of Final Year"
                fullWidth
                type="number"
                required
                sx={inputStyle}
                value={formData.ugPercentage || ""}
                onChange={(e) => handleBasicFieldChange("ugPercentage", e.target.value)}
              />
            </Grid>
            {[...Array(ugYears)].map((_, i) => (
              <Grid item xs={12} sm={6} key={`ugYear${i + 1}`}>
                <FileInput
                  label={`UG Marksheet (Year ${i + 1})`}
                  fieldName={`ugYear${i + 1}`}
                  required={i === ugYears - 1} // Only require final year marksheet
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddMoreUGYear}
              >
                Add More Marksheet
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* PG Section */}
      {sections.includes("PG") && (
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
            PG (Post-Graduation)
            <IconButton sx={{ float: "right" }} onClick={() => handleRemoveSection("PG")}>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="University/College Name"
                fullWidth
                required
                sx={inputStyle}
                value={formData.pgCollegeName || ""}
                onChange={(e) => handleBasicFieldChange("pgCollegeName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course"
                fullWidth
                required
                sx={inputStyle}
                value={formData.pgCourse || ""}
                onChange={(e) => handleBasicFieldChange("pgCourse", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Percentage"
                type="number"
                fullWidth
                required
                sx={inputStyle}
                value={formData.pgPercentage || ""}
                onChange={(e) => handleBasicFieldChange("pgPercentage", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput label="PG Marksheet (Required)" fieldName="pgMarksheet" required />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* PhD Section */}
      {sections.includes("PhD") && (
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
            PhD
            <IconButton sx={{ float: "right" }} onClick={() => handleRemoveSection("PhD")}>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="University/College Name"
                fullWidth
                required
                sx={inputStyle}
                value={formData.phdCollegeName || ""}
                onChange={(e) => handleBasicFieldChange("phdCollegeName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course"
                fullWidth
                required
                sx={inputStyle}
                value={formData.phdCourse || ""}
                onChange={(e) => handleBasicFieldChange("phdCourse", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Thesis Title (Optional)"
                fullWidth
                sx={inputStyle}
                value={formData.phdThesisTitle || ""}
                onChange={(e) => handleBasicFieldChange("phdThesisTitle", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Completion Year"
                type="number"
                fullWidth
                required
                sx={inputStyle}
                value={formData.phdCompletionYear || ""}
                onChange={(e) => handleBasicFieldChange("phdCompletionYear", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput label="PhD Thesis (PDF)" fieldName="phdThesis" accept=".pdf" />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Dropdown for Adding Higher Ed Section */}
      <Box mt={3} display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="education-level-label">Select Level</InputLabel>
          <Select
            labelId="education-level-label"
            value={educationLevel}
            label="Select Level"
            onChange={handleEducationLevelChange}
            sx={inputStyle}
          >
            <MenuItem value="UG">Undergraduate (UG)</MenuItem>
            <MenuItem value="PG">Postgraduate (PG)</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleAddEducationSection}
          disabled={!educationLevel || sections.includes(educationLevel)}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}
