import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Grow,
  Slide,
  Zoom,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { saveFileToDB } from "app/utils/indexedDBUtils";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "10px",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease"
}));

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    borderColor: theme.palette.divider,
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
}));

const UploadArea = styled("div")(({ theme, isdragactive }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: "12px",
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: isdragactive ? theme.palette.action.selected : theme.palette.background.default,
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)"
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  padding: "10px 24px",
  borderRadius: "50px",
  boxShadow: theme.shadows[3],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
  },
  "&.Mui-disabled": {
    background: theme.palette.action.disabledBackground
  }
}));

const Breadcrumbs = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box display="flex" alignItems="center" mb={3}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Typography variant="h6" fontWeight="bold" mr={1} color="primary">
          Staff Management
        </Typography>
      </motion.div>
      <Typography color="textSecondary" mx={1}>
        |
      </Typography>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
          <HomeIcon color="primary" fontSize="small" />
        </Link>
      </motion.div>
      <ChevronRightIcon color="disabled" fontSize="small" />
      <motion.div whileHover={{ scale: 1.02 }}>
        <Typography
          sx={{
            color: isDarkMode ? theme.palette.text.primary : "text.secondary",
            borderBottom: "2px solid",
            borderImage: "linear-gradient(45deg, #6200ee, #bb86fc) 1",
            fontWeight: 600
          }}
        >
          Import Staff
        </Typography>
      </motion.div>
    </Box>
  );
};

const StepCard = ({ icon, title, description }) => {
  const theme = useTheme();

  return (
    <Grow in={true} style={{ transformOrigin: "0 0 0" }} {...{ timeout: 1000 }}>
      <Card
        sx={{
          height: "100%",
          borderRadius: "12px",
          boxShadow: theme.shadows[2],
          transition: "all 0.3s ease",
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: theme.shadows[6]
          }
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              mb: 2,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6200ee 0%, #bb86fc 100%)",
              color: "white"
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default function ImportStaff() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === "dark";
  const [role, setRole] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [dragActive, setDragActive] = React.useState(false);

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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }
    setSelectedFile(file);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleDownloadSample = () => {
    // Create a sample CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Staff ID,First Name,Last Name,Father Name,Mother Name,Email *,Gender *,Date of Birth,Date of Joining,Phone,Emergency Contact Number,Marital Status,Current Address,Permanent Address,Qualification,Work Experience,Note\n" +
      "EMP001,John,Doe,Michael,Emily,john.doe@example.com,Male,1985-05-15,2020-06-01,+1234567890,+1987654320,Single,123 Main St,456 Oak St,MBA,5 years,New hire";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_import_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first");
      return;
    }

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a unique key for the file
      const fileKey = `staff_import_${Date.now()}`;

      // Store the file in IndexedDB
      await saveFileToDB(fileKey, selectedFile);

      // Store metadata
      const metadata = {
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        uploadDate: new Date().toISOString(),
        role,
        designation,
        department
      };

      await saveFileToDB(`${fileKey}_metadata`, metadata);

      // Show success message
      alert("Staff imported successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Import error:", error);
      alert("Error importing staff: " + error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Breadcrumbs />

      <Fade in={true} timeout={500}>
        <StyledPaper>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}
          >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  background: isDarkMode ? "theme.palette.common.primary" : "inherit",
                  
                  display: "inline-block"
                }}
              >
                Staff Import
              </Typography>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadSample}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  boxShadow: theme.shadows[3],
                  "&:hover": {
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                Download Sample
              </Button>
            </motion.div>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <DescriptionIcon color="primary" /> Import Guidelines
            </Typography>

            <Box
              sx={{
                borderRadius: "12px",
                p: 3,
                border: `1px solid ${
                  isDarkMode ? theme.palette.palette.white : theme.palette.divider
                }`,
                "& ol": {
                  margin: 0,
                  paddingLeft: theme.spacing(4),
                  "& li": {
                    paddingBottom: theme.spacing(1),
                    "&:last-child": {
                      paddingBottom: 0
                    },
                    "& .MuiTypography-root": {
                      color: isDarkMode ? theme.palette.grey[100] : theme.palette.text.primary
                    }
                  }
                },
                ...inputStyle
              }}
            >
              <ol>
                <li>
                  <Typography variant="body1">
                    Your CSV data should be in the format below. The first line of your CSV file
                    should be the column headers as in the table example. Also make sure that your
                    file is UTF-8 to avoid unnecessary encoding problems.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    If the column you are trying to import is date make sure that is formatted in
                    format Y-m-d (2018-06-06).
                  </Typography>
                </li>
              </ol>
            </Box>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main"
              }}
            >
              CSV Format Example
            </Typography>

            <Box sx={{ borderRadius: "12px", overflow: "hidden", boxShadow: theme.shadows[3] }}>
              <Box
                sx={{
                  overflowX: "auto",
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.divider}`,
                  ...inputStyle
                }}
              >
                <StyledTable sx={{ minWidth: "1000px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Staff ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Father Name</TableCell>
                      <TableCell>Mother Name</TableCell>
                      <TableCell>Email *</TableCell>
                      <TableCell>Gender *</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>Date of Joining</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Emergency Contact</TableCell>
                      <TableCell>Marital Status</TableCell>
                      <TableCell>Current Address</TableCell>
                      <TableCell>Permanent Address</TableCell>
                      <TableCell>Qualification</TableCell>
                      <TableCell>Work Experience</TableCell>
                      <TableCell>Note</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      hover
                      sx={{
                        backgroundColor: isDarkMode
                          ? theme.palette.grey[800]
                          : theme.palette.action.hover,
                        "& .MuiTableCell-root": {
                          color: isDarkMode
                            ? theme.palette.grey[100]
                            : theme.palette.text.secondary,
                          borderColor: isDarkMode ? theme.palette.grey[700] : theme.palette.divider,
                          fontFamily: "monospace"
                        }
                      }}
                    >
                      {Array(17)
                        .fill(0)
                        .map((_, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              fontFamily: "monospace",
                              color: theme.palette.text.secondary
                            }}
                          >
                            {index === 0
                              ? "EMP001"
                              : index === 5
                              ? "example@email.com"
                              : index === 6
                              ? "Male/Female"
                              : index === 7 || index === 8
                              ? "YYYY-MM-DD"
                              : "Sample"}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "primary.main"
              }}
            >
              Staff Information
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                mb: 4
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    ...inputStyle
                  }}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  value={designation}
                  label="Designation"
                  onChange={(e) => setDesignation(e.target.value)}
                  sx={{
                    ...inputStyle
                  }}
                >
                  <MenuItem value="professor">Professor</MenuItem>
                  <MenuItem value="assistant">Assistant Professor</MenuItem>
                  <MenuItem value="lecturer">Lecturer</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={department}
                  label="Department"
                  onChange={(e) => setDepartment(e.target.value)}
                  sx={{
                    ...inputStyle
                  }}
                >
                  <MenuItem value="academic">Academic</MenuItem>
                  <MenuItem value="administration">Administration</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "primary.main"
              }}
            >
              Upload CSV File
            </Typography>

            <input
              type="file"
              id="file-upload"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />

            <UploadArea
              isdragactive={dragActive ? 1 : 0}
              onClick={() => document.getElementById("file-upload").click()}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              </motion.div>

              {selectedFile ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    File Ready for Import
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: theme.palette.success.main + "20",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "4px"
                      }}
                    >
                      <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
                      {selectedFile.name}
                    </Box>
                  </Typography>
                </motion.div>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Drag & Drop your CSV file here
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    or click to browse files
                  </Typography>
                </>
              )}

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: "50px",
                    px: 3,
                    py: 1,
                    fontWeight: "bold"
                  }}
                >
                  Select File
                </Button>
              </motion.div>
            </UploadArea>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  borderRadius: "50px",
                  px: 4,
                  py: 1,
                  fontWeight: "bold",
                  borderWidth: "2px",
                  "&:hover": {
                    borderWidth: "2px"
                  },
                  backgroundColor: theme.palette.primary.main,
                  color: "white"
                }}
              >
                Cancel
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <GradientButton
                onClick={handleImport}
                disabled={!selectedFile}
                startIcon={<CloudUploadIcon />}
              >
                Import Staff
              </GradientButton>
            </motion.div>
          </Box>
        </StyledPaper>
      </Fade>
    </Container>
  );
}
