import React, { useState } from "react";
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

export default function AddStaff4() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [educationLevel, setEducationLevel] = useState("");
  const [sections, setSections] = useState([]);

  const [subjects, setSubjects] = useState([
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
    { id: 4, name: "" },
    { id: 5, name: "" }
  ]);

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { id: subjects.length + 1, name: "" }]);
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
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
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
            <TextField label="Percentage" fullWidth type="number" sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Marksheet" fullWidth type="file" sx={inputStyle} />
          </Grid>
        </Grid>
      </Box>

      {/* 12th Section */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
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
            <TextField label="Percentage" fullWidth type="number" sx={inputStyle} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Marksheet" fullWidth type="file" sx={inputStyle} />
          </Grid>
        </Grid>
      </Box>

      {/* Higher Education Section */}
      <Box mb={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Higher Educational Qualifications
        </Typography>
      </Box>

      {/* Render all added sections FIRST */}
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
            <Grid item xs={12} sm={6}>
              <TextField label="Marksheet (1st Year)" fullWidth type="file" sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Marksheet (2nd Year)" fullWidth type="file" sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Marksheet (3rd Year)" fullWidth type="file" sx={inputStyle} />
            </Grid>
          </Grid>
        </Box>
      )}

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
              <TextField label="Percentage" fullWidth type="number" sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Marksheet" fullWidth type="file" sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Upload Marksheet (All Years if applicable)"
                fullWidth
                type="file"
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Box>
      )}

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
              <TextField label="Completion Year" fullWidth type="number" sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Research Paper/Thesis Upload"
                fullWidth
                type="file"
                sx={inputStyle}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Add Section Dropdown & Button */}
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
