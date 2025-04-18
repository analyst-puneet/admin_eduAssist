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
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddStaff4({ formData, setFormData }) {
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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      educationLevel,
      sections,
      fileNames,
      ugYears,
      subjects
    }));
  }, [educationLevel, sections, fileNames, ugYears, subjects]);

  const handleFileChange = (fieldName, e) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames((prev) => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  const handleRemoveFile = (fieldName) => {
    setFileNames((prev) => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
  };

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

  const FileInput = ({ label, fieldName, accept = "*" }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="label"
        sx={{
          border: "1px dashed",
          borderColor: isDarkMode ? theme.palette.grey[600] : theme.palette.grey[400],
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
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { id: subjects.length + 1, name: "" }]);
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
            <TextField label="School Name" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Board" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Percentage" type="number" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInput label="10th Marksheet" fieldName="tenthMarksheet" accept=".pdf,.jpg,.png" />
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
            <TextField label="School Name" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Board" fullWidth sx={inputStyle} />
          </Grid>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={4} key={subject.id}>
              <TextField
                label={`Subject ${index + 1}`}
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
                fullWidth
                sx={inputStyle}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleAddSubject}>
          Add Subject
        </Button>
        <Grid container spacing={1.5} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Percentage" type="number" fullWidth sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FileInput
              label="12th Marksheet"
              fieldName="twelfthMarksheet"
              accept=".pdf,.jpg,.png"
            />
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
              <TextField label="University/College Name" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Course" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Percentage of Final Year" fullWidth type="number" sx={inputStyle} />
            </Grid>
            {[...Array(ugYears)].map((_, i) => (
              <Grid item xs={12} sm={6} key={`ugYear${i + 1}`}>
                <FileInput label={`UG Marksheet (Year ${i + 1})`} fieldName={`ugYear${i + 1}`} />
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
              <TextField label="University/College Name" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Course" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Percentage" type="number" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FileInput label="PG Marksheet" fieldName="pgMarksheet" />
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
              <TextField label="University/College Name" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Course" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Thesis Title (Optional)" fullWidth sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Completion Year" type="number" fullWidth sx={inputStyle} />
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
        <Button variant="contained" onClick={handleAddEducationSection}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
