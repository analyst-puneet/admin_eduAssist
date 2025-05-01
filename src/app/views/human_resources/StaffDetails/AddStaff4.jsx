import React, { useState, useEffect, useRef } from "react";
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
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Delete as DeleteIcon,
  InsertDriveFile as InsertDriveFileIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  Preview as PreviewIcon
} from "@mui/icons-material";

import { saveFileToDB } from "app/utils/indexedDBUtils";
import { getAllFilesFromDB } from "app/utils/indexedDBUtils";
import { deleteFileFromDB } from "app/utils/indexedDBUtils";

import { BASE_URL } from "../../../../main";
import axios from "axios";

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
  const [files, setFiles] = useState(formData.files || {});
  const [ugYears, setUgYears] = useState(formData.ugYears || 3);
  const [previewFile, setPreviewFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  const objectUrlsRef = useRef([]);

  // Initialize form data and recreate object URLs when component mounts
  useEffect(() => {
    const initializeFiles = async () => {
      // Fresh start detection: if formData.files is empty
      const isNewForm =
        (!formData.files || Object.keys(formData.files).length === 0) &&
        (!formData.fileNames || Object.keys(formData.fileNames).length === 0);

      if (isNewForm) {
        // Don't preload files for new form
        return;
      }

      // Else: resume session → load saved files
      const storedFiles = await getAllFilesFromDB();
      if (!storedFiles || Object.keys(storedFiles).length === 0) return;

      const reconstructedFiles = {};
      const fileNamesMap = {};

      for (const [key, fileData] of Object.entries(storedFiles)) {
        if (!fileData.data) continue;

        const blob = await dataURLtoBlob(fileData.data);
        const objectUrl = URL.createObjectURL(blob);
        objectUrlsRef.current.push(objectUrl);

        reconstructedFiles[key] = {
          name: fileData.name,
          type: fileData.type,
          data: fileData.data,
          preview: objectUrl
        };
        fileNamesMap[key] = fileData.name;
      }

      setFiles(reconstructedFiles);
      setFileNames(fileNamesMap);
    };

    initializeFiles();

    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  // Validation states
  const [errors, setErrors] = useState({
    tenthBoard: false,
    tenthPercentage: false,
    tenthYear: false,
    tenthMarksheet: false,
    twelfthBoard: false,
    twelfthPercentage: false,
    twelfthYear: false,
    twelfthMarksheet: false,
    ugCollegeName: false,
    ugCourse: false,
    ugPercentage: false
  });

  const [showErrors, setShowErrors] = useState(false);

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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400]
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? theme.palette.grey[500] : theme.palette.grey[600]
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main
    }
  };

  // Error styling - matches AddStaff1
  const errorStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "error.main"
    },
    "& .MuiFormHelperText-root": {
      position: "absolute",
      bottom: "-20px",
      left: 0,
      margin: 0,
      fontSize: "0.75rem",
      color: "error.main"
    }
  };

  // Validate form and notify parent
  const validateForm = (show = false) => {
    const newErrors = {
      tenthBoard: !formData.tenthBoard,
      tenthPercentage: !formData.tenthPercentage,
      tenthYear: !formData.tenthYear,
      tenthMarksheet: !fileNames.tenthMarksheet,
      twelfthBoard: !formData.twelfthBoard,
      twelfthPercentage: !formData.twelfthPercentage,
      twelfthYear: !formData.twelfthYear,
      twelfthMarksheet: !fileNames.twelfthMarksheet,
      ugCollegeName: sections.includes("UG") && !formData.ugCollegeName,
      ugCourse: sections.includes("UG") && !formData.ugCourse,
      ugPercentage: sections.includes("UG") && !formData.ugPercentage,

      // PG Section validation
      pgCollegeName: sections.includes("PG") && !formData.pgCollegeName,
      pgCourse: sections.includes("PG") && !formData.pgCourse,
      pgPercentage: sections.includes("PG") && !formData.pgPercentage,
      pgMarksheet1: sections.includes("PG") && !fileNames.pgMarksheet1,
      pgMarksheet2: sections.includes("PG") && !fileNames.pgMarksheet2,

      // PhD Section validation
      phdInstitute: sections.includes("PhD") && !formData.phdInstitute,
      phdSubject: sections.includes("PhD") && !formData.phdSubject,
      phdThesis: sections.includes("PhD") && !formData.phdThesis,
      phdCertificate: sections.includes("PhD") && !fileNames.phdCertificate
    };

    if (show) setErrors(newErrors);

    const isFormValid = !Object.values(newErrors).some((error) => error);

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
      files,
      ugYears
    }));
    validateForm();
  }, [educationLevel, sections, fileNames, files, ugYears]);

  useEffect(() => {
    if (triggerValidation) {
      setShowErrors(true);
      validateForm(true);
    }
  }, [triggerValidation]);

  const dataURLtoBlob = (dataURL) => {
    return new Promise((resolve, reject) => {
      try {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        resolve(new Blob([u8arr], { type: mime }));
      } catch (error) {
        reject(error);
      }
    });
  };

  // Handle file upload - UPDATED to properly track all files
  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    objectUrlsRef.current.push(objectUrl);

    const reader = new FileReader();
    reader.onload = async () => {
      const newFile = {
        name: file.name,
        type: file.type,
        data: reader.result,
        preview: objectUrl
      };

      setFileNames((prev) => ({ ...prev, [fieldName]: file.name }));
      setFiles((prev) => ({ ...prev, [fieldName]: newFile }));

      // IndexedDB save
      await saveFileToDB(fieldName, newFile);
    };

    reader.readAsDataURL(file);
  };

  // Handle preview - UPDATED to handle missing preview URLs
  const handlePreviewFile = (fieldName) => {
    const file = files[fieldName];
    if (!file) return;

    // If preview URL exists, use it directly
    if (file.preview) {
      setPreviewFile({
        name: fileNames[fieldName] || file.name,
        url: file.preview,
        type: file.type
      });
      setOpenPreview(true);
      return;
    }

    // If no preview URL but has data, recreate it
    if (file.data) {
      dataURLtoBlob(file.data)
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          objectUrlsRef.current.push(objectUrl);

          // Update files state with new preview URL
          setFiles((prev) => ({
            ...prev,
            [fieldName]: {
              ...prev[fieldName],
              preview: objectUrl
            }
          }));

          setPreviewFile({
            name: fileNames[fieldName] || file.name,
            url: objectUrl,
            type: file.type
          });
          setOpenPreview(true);
        })
        .catch((error) => {
          console.error("Error creating preview:", error);
          // Show error to user if needed
        });
    }
  };

  const handleRemoveFile = async (fieldName) => {
    if (files[fieldName]?.preview) {
      URL.revokeObjectURL(files[fieldName].preview);
      objectUrlsRef.current = objectUrlsRef.current.filter(
        (url) => url !== files[fieldName].preview
      );
    }

    await deleteFileFromDB(fieldName);

    setFileNames((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });

    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const FileInput = ({ label, fieldName, accept = "*", required = false }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="label"
        sx={{
          border: `1px dashed ${
            errors[fieldName]
              ? "error.main"
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
          bgcolor: isDarkMode ? theme.palette.grey[800] : theme.palette.background.paper,
          "&:hover": {
            borderColor: theme.palette.primary.main
          }
        }}
      >
        {fileNames[fieldName] ? (
          <>
            {files[fieldName]?.type === "application/pdf" ? (
              <PdfIcon fontSize="small" color="error" />
            ) : (
              <ImageIcon fontSize="small" color="primary" />
            )}
            <Typography variant="body2" noWrap>
              {fileNames[fieldName]}
            </Typography>
          </>
        ) : (
          <>
            <InsertDriveFileIcon fontSize="small" />
            <Typography variant="body2" noWrap>
              {label}
            </Typography>
          </>
        )}
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(fieldName, e)}
          hidden
        />
      </Box>
      {fileNames[fieldName] && (
        <>
          <IconButton size="small" onClick={() => handlePreviewFile(fieldName)}>
            <PreviewIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton size="small" onClick={() => handleRemoveFile(fieldName)}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </>
      )}
    </Box>
  );

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleAddEducationSection = () => {
    if (educationLevel && !sections.includes(educationLevel)) {
      setSections([...sections, educationLevel]);
      setEducationLevel(""); // Reset dropdown after selection
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

  const fetchedOnce = useRef(false);

  const [educationTypeOptions, setEducationTypeOptions] = useState([]);
  const fetchEducationTypeOptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/master/education_type`, {
        withCredentials: true
      });
      setEducationTypeOptions(response.data);
    } catch (error) {
      console.error("Error fetching education type options:", error);
    }
  };

  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchEducationTypeOptions();
      fetchedOnce.current = true;
    }
  }, []);

  // Add this useEffect to handle reset
  useEffect(() => {
    if (!formData.educationLevel) {
      setEducationLevel("");
      setSections([]);
      setFileNames({});
      setFiles({});
      setUgYears(3);
      setErrors({
        tenthBoard: false,
        tenthPercentage: false,
        tenthYear: false,
        tenthMarksheet: false,
        twelfthBoard: false,
        twelfthPercentage: false,
        twelfthYear: false,
        twelfthMarksheet: false,
        ugCollegeName: false,
        ugCourse: false,
        ugPercentage: false,
        pgCollegeName: false,
        pgCourse: false,
        pgPercentage: false,
        pgMarksheet1: false,
        pgMarksheet2: false,
        phdInstitute: false,
        phdSubject: false,
        phdThesis: false,
        phdCertificate: false
      });
    }
  }, [formData.educationLevel]);

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
      {/* Educational Qualifications Heading */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: isDarkMode ? theme.palette.common.white : theme.palette.primary.dark
        }}
      >
        Educational Qualifications
      </Typography>

      {/* 10th Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          10th Class Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Board Name "
              fullWidth
              required
              sx={errors.tenthBoard ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.tenthBoard || ""}
              onChange={(e) => handleBasicFieldChange("tenthBoard", e.target.value)}
              onBlur={() => handleFieldBlur("tenthBoard")}
              error={errors.tenthBoard}
              helperText={errors.tenthBoard ? "Board name is required" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Percentage "
              type="number"
              fullWidth
              required
              sx={errors.tenthPercentage ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.tenthPercentage || ""}
              onChange={(e) => handleBasicFieldChange("tenthPercentage", e.target.value)}
              onBlur={() => handleFieldBlur("tenthPercentage")}
              error={errors.tenthPercentage}
              helperText={errors.tenthPercentage ? "Percentage is required" : " "}
              inputProps={{ step: "0.01", min: "0", max: "100" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Year of Passing "
              type="number"
              fullWidth
              required
              sx={errors.tenthYear ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.tenthYear || ""}
              onChange={(e) => handleBasicFieldChange("tenthYear", e.target.value)}
              onBlur={() => handleFieldBlur("tenthYear")}
              error={errors.tenthYear}
              helperText={errors.tenthYear ? "Year is required" : " "}
              inputProps={{ min: "1900", max: new Date().getFullYear() }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FileInput
                label="10th Marksheet (Required)"
                fieldName="tenthMarksheet"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
              {errors.tenthMarksheet && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    mt: 0.5,
                    display: "block",
                    fontSize: "0.75rem"
                  }}
                >
                  10th marksheet is required
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInput
              label="10th Certificate (Optional)"
              fieldName="tenthCertificate"
              accept=".pdf,.jpg,.png,.jpeg"
            />
          </Grid>
        </Grid>
      </Box>

      {/* 12th Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          12th Class Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Board Name "
              fullWidth
              required
              sx={errors.twelfthBoard ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.twelfthBoard || ""}
              onChange={(e) => handleBasicFieldChange("twelfthBoard", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthBoard")}
              error={errors.twelfthBoard}
              helperText={errors.twelfthBoard ? "Board name is required" : " "}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Percentage "
              type="number"
              fullWidth
              required
              sx={errors.twelfthPercentage ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.twelfthPercentage || ""}
              onChange={(e) => handleBasicFieldChange("twelfthPercentage", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthPercentage")}
              error={errors.twelfthPercentage}
              helperText={errors.twelfthPercentage ? "Percentage is required" : " "}
              inputProps={{ step: "0.01", min: "0", max: "100" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Year of Passing "
              type="number"
              fullWidth
              required
              sx={errors.twelfthYear ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
              value={formData.twelfthYear || ""}
              onChange={(e) => handleBasicFieldChange("twelfthYear", e.target.value)}
              onBlur={() => handleFieldBlur("twelfthYear")}
              error={errors.twelfthYear}
              helperText={errors.twelfthYear ? "Year is required" : " "}
              inputProps={{ min: "1900", max: new Date().getFullYear() }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FileInput
                label="12th Marksheet (Required)"
                fieldName="twelfthMarksheet"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
              {errors.twelfthMarksheet && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{
                    mt: 0.5,
                    display: "block",
                    fontSize: "0.75rem"
                  }}
                >
                  12th marksheet is required
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInput
              label="12th Certificate (Optional)"
              fieldName="twelfthCertificate"
              accept=".pdf,.jpg,.png,.jpeg"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Higher Education Section */}
      <Box mb={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Higher Educational Qualifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
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
                sx={errors.ugCollegeName ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                value={formData.ugCollegeName || ""}
                onChange={(e) => handleBasicFieldChange("ugCollegeName", e.target.value)}
                onBlur={() => handleFieldBlur("ugCollegeName")}
                error={errors.ugCollegeName}
                helperText={errors.ugCollegeName ? "College name is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course"
                fullWidth
                required
                sx={errors.ugCourse ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                value={formData.ugCourse || ""}
                onChange={(e) => handleBasicFieldChange("ugCourse", e.target.value)}
                onBlur={() => handleFieldBlur("ugCourse")}
                error={errors.ugCourse}
                helperText={errors.ugCourse ? "Course is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CGPA"
                fullWidth
                type="number"
                required
                sx={errors.ugPercentage ? { ...errorStyle, mb: 3 } : { ...inputStyle }}
                value={formData.ugPercentage || ""}
                onChange={(e) => handleBasicFieldChange("ugPercentage", e.target.value)}
                onBlur={() => handleFieldBlur("ugPercentage")}
                error={errors.ugPercentage}
                helperText={errors.ugPercentage ? "Percentage is required" : " "}
                inputProps={{ step: "0.01", min: "0", max: "100" }}
              />
            </Grid>

            {/* Marksheets - 2 per row */}
            {[...Array(Math.ceil(ugYears / 2))].map((_, rowIndex) => (
              <React.Fragment key={`ugYearRow${rowIndex}`}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Box flexGrow={1}>
                      <FileInput
                        label={`UG Marksheet (Year ${rowIndex * 2 + 1})`}
                        fieldName={`ugYear${rowIndex * 2 + 1}`}
                        accept=".pdf,.jpg,.png,.jpeg"
                        required={rowIndex * 2 + 1 === ugYears} // Only last one required
                      />
                    </Box>
                    {rowIndex * 2 + 1 > 3 && rowIndex * 2 + 1 === ugYears && (
                      <IconButton
                        onClick={() => setUgYears((prev) => prev - 1)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
                {rowIndex * 2 + 2 <= ugYears && (
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Box flexGrow={1}>
                        <FileInput
                          label={`UG Marksheet (Year ${rowIndex * 2 + 2})`}
                          fieldName={`ugYear${rowIndex * 2 + 2}`}
                          accept=".pdf,.jpg,.png,.jpeg"
                          required={rowIndex * 2 + 2 === ugYears} // Only last one required
                        />
                      </Box>
                      {rowIndex * 2 + 2 > 3 && rowIndex * 2 + 2 === ugYears && (
                        <IconButton
                          onClick={() => setUgYears((prev) => prev - 1)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                )}
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Box display="flex" gap={2} mt={1}>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddMoreUGYear}
                >
                  Add More Marksheet
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* PG Section */}
      {sections.includes("PG") && (
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
            PG (Postgraduate)
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
                sx={errors.pgCollegeName ? errorStyle : inputStyle}
                value={formData.pgCollegeName || ""}
                onChange={(e) => handleBasicFieldChange("pgCollegeName", e.target.value)}
                onBlur={() => handleFieldBlur("pgCollegeName")}
                error={errors.pgCollegeName}
                helperText={errors.pgCollegeName ? "College name is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course"
                fullWidth
                required
                sx={errors.pgCourse ? errorStyle : inputStyle}
                value={formData.pgCourse || ""}
                onChange={(e) => handleBasicFieldChange("pgCourse", e.target.value)}
                onBlur={() => handleFieldBlur("pgCourse")}
                error={errors.pgCourse}
                helperText={errors.pgCourse ? "Course is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CGPA"
                fullWidth
                type="number"
                required
                inputProps={{ step: "0.01", min: "0", max: "100" }}
                sx={errors.pgPercentage ? errorStyle : inputStyle}
                value={formData.pgPercentage || ""}
                onChange={(e) => handleBasicFieldChange("pgPercentage", e.target.value)}
                onBlur={() => handleFieldBlur("pgPercentage")}
                error={errors.pgPercentage}
                helperText={errors.pgPercentage ? "CGPA is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput
                label="PG Marksheet (Year 1) (Required)"
                fieldName="pgMarksheet1"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
              {errors.pgMarksheet1 && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, fontSize: "0.75rem" }}>
                  PG Marksheet Year 1 is required
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput
                label="PG Marksheet (Year 2) (Required)"
                fieldName="pgMarksheet2"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
              {errors.pgMarksheet2 && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, fontSize: "0.75rem" }}>
                  PG Marksheet Year 2 is required
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      {/* PhD Section */}
      {sections.includes("PhD") && (
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
            PhD (Doctorate)
            <IconButton sx={{ float: "right" }} onClick={() => handleRemoveSection("PhD")}>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="University/Institute"
                fullWidth
                required
                sx={errors.phdInstitute ? errorStyle : inputStyle}
                value={formData.phdInstitute || ""}
                onChange={(e) => handleBasicFieldChange("phdInstitute", e.target.value)}
                onBlur={() => handleFieldBlur("phdInstitute")}
                error={errors.phdInstitute}
                helperText={errors.phdInstitute ? "Institute is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subject"
                fullWidth
                required
                sx={errors.phdSubject ? errorStyle : inputStyle}
                value={formData.phdSubject || ""}
                onChange={(e) => handleBasicFieldChange("phdSubject", e.target.value)}
                onBlur={() => handleFieldBlur("phdSubject")}
                error={errors.phdSubject}
                helperText={errors.phdSubject ? "Subject is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Thesis Title"
                fullWidth
                required
                sx={errors.phdThesis ? errorStyle : inputStyle}
                value={formData.phdThesis || ""}
                onChange={(e) => handleBasicFieldChange("phdThesis", e.target.value)}
                onBlur={() => handleFieldBlur("phdThesis")}
                error={errors.phdThesis}
                helperText={errors.phdThesis ? "Thesis title is required" : " "}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput
                label="PhD Certificate (Required)"
                fieldName="phdCertificate"
                accept=".pdf,.jpg,.png,.jpeg"
                required
              />
              {errors.phdCertificate && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, fontSize: "0.75rem" }}>
                  PhD certificate is required
                </Typography>
              )}
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
            <MenuItem value="" disabled>
              Select Education Level
            </MenuItem>
            {educationTypeOptions.map((option) => (
              <MenuItem key={option._id} value={option.name} sx={{ fontSize: "0.875rem" }}>
                {option.name}
              </MenuItem>
            ))}
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

      {/* File Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            height: "80vh" // Make dialog take 80% of viewport height
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" noWrap sx={{ maxWidth: "calc(100% - 48px)" }}>
              {previewFile?.name}
            </Typography>
            <IconButton onClick={() => setOpenPreview(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkMode ? theme.palette.grey[800] : theme.palette.grey[100]
          }}
        >
          {previewFile && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {previewFile.type === "application/pdf" ? (
                <iframe
                  src={previewFile.url}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title={previewFile.name}
                />
              ) : (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
