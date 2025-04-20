import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  Work,
  School,
  AccountBalance,
  AttachMoney,
  DateRange,
  Description,
  PictureAsPdf,
  Image as ImageIcon,
  ArrowBack,
  ContactMail,
  Contacts,
  FamilyRestroom,
  Cake,
  Badge,
  WorkHistory,
  AccountCircle,
  HomeWork,
  LocationCity,
  PinDrop,
  CreditCard,
  DriveFileRenameOutline,
  LibraryBooks,
  Assignment,
  Note,
  Folder,
  Close,
  Preview
} from "@mui/icons-material";

export default function PreviewStaffDetails({ formData, onSubmit, onBack }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [previewFile, setPreviewFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const navigate = useNavigate();

  // Format date in DD-MMM-YYYY format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Format address with proper line breaks
  const formatAddress = (addressInfo, type) => {
    if (!addressInfo) return "N/A";

    const prefix = type === "current" ? "current" : "permanent";
    const parts = [
      addressInfo[`${prefix}FullAddress`],
      addressInfo[`${prefix}City`],
      addressInfo[`${prefix}State`],
      addressInfo[`${prefix}Country`],
      addressInfo[`${prefix}PinCode`] ? `PIN: ${addressInfo[`${prefix}PinCode`]}` : null
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "N/A";
  };

  const handleSubmit = async () => {
    try {
      // Call the original onSubmit function if it exists
      if (onSubmit) {
        await onSubmit();
      }

      // Show success message
      await Swal.fire({
        title: "Success!",
        text: "Your data has been submitted successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: theme.palette.primary.main
      });

      // Redirect after confirmation
      navigate("/human_resources/staff-details");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to submit data",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  // Handle file preview with better error handling
  const handleFilePreview = (file, fileName) => {
    if (!file) return;

    try {
      let fileType = "";
      let fileUrl = "";

      // Handle both raw files and our new structure
      const fileToPreview = file.file || file;

      if (fileToPreview instanceof File || fileToPreview instanceof Blob) {
        fileType = fileToPreview.type || getFileTypeFromName(fileName);
        fileUrl = file.preview || URL.createObjectURL(fileToPreview);
      } else if (typeof fileToPreview === "string") {
        fileType = getFileTypeFromName(fileName);
        fileUrl = fileToPreview;
      }

      setPreviewFile({
        file: fileToPreview,
        name: fileName,
        type: fileType,
        url: fileUrl,
        isBlob: fileToPreview instanceof Blob
      });
      setOpenPreview(true);
    } catch (error) {
      console.error("Error previewing file:", error);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs
      if (previewFile?.url && previewFile.isBlob) {
        URL.revokeObjectURL(previewFile.url);
      }

      // Clean up any file preview URLs in the form data
      Object.values(formData.files || {}).forEach((file) => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });

      if (formData.selectedImage?.preview) {
        URL.revokeObjectURL(formData.selectedImage.preview);
      }
    };
  }, []);

  const getFileTypeFromName = (fileName) => {
    if (!fileName) return "application/octet-stream";
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return "application/pdf";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "bmp":
        return "image/bmp";
      default:
        return "application/octet-stream";
    }
  };

  // Improved File Preview Dialog with download option
  const FilePreviewDialog = () => (
    <Dialog
      open={openPreview}
      onClose={() => setOpenPreview(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {previewFile?.name}
          </Typography>
          <IconButton onClick={() => setOpenPreview(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {previewFile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
              bgcolor: theme.palette.grey[isDarkMode ? 900 : 100],
              position: "relative"
            }}
          >
            {previewFile.type?.includes("pdf") ? (
              <embed src={previewFile.url} type="application/pdf" width="100%" height="500px" />
            ) : previewFile.type?.includes("image") ? (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px",
                  objectFit: "contain"
                }}
              />
            ) : (
              <Box textAlign="center" sx={{ p: 3 }}>
                <Description sx={{ fontSize: 80, color: theme.palette.text.secondary }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  No preview available
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {previewFile.name}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: theme.palette.grey[isDarkMode ? 800 : 50] }}>
        <Button
          onClick={() => {
            if (previewFile?.url && previewFile.isBlob) {
              URL.revokeObjectURL(previewFile.url);
            }
            setOpenPreview(false);
          }}
        >
          Close
        </Button>
        {previewFile?.url && (
          <Button
            variant="contained"
            onClick={() => {
              const link = document.createElement("a");
              link.href = previewFile.url;
              link.download = previewFile.name;
              link.click();
            }}
          >
            Download
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  // Enhanced FileChip with better visual feedback
  const FileChip = ({ file, fileName, icon, label }) => {
    if (!file) return null;

    return (
      <Chip
        icon={React.cloneElement(icon, { fontSize: "small" })}
        label={label}
        color="primary"
        variant="outlined"
        onClick={() => handleFilePreview(file, fileName)}
        onDelete={() => handleFilePreview(file, fileName)}
        deleteIcon={<Preview fontSize="small" />}
        sx={{
          cursor: "pointer",
          "&:hover": {
            bgcolor: theme.palette.primary.light,
            color: "white"
          }
        }}
      />
    );
  };

  // Section Header Component for consistent styling
  const SectionHeader = ({ icon, title }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        "& svg": {
          color: theme.palette.primary.main,
          mr: 1
        }
      }}
    >
      {React.cloneElement(icon, { fontSize: "medium" })}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );

  // Info Item Component for consistent info display
  const InfoItem = ({ icon, primary, secondary, sx = {} }) => (
    <ListItem sx={{ px: 0, ...sx }}>
      <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {primary}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {secondary || "N/A"}
          </Typography>
        }
      />
    </ListItem>
  );

  // Basic Information Section with improved layout
  const BasicInfoSection = () => (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={<SectionHeader icon={<Person />} title="Basic Information" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
            gap: 3
          }}
        >
          <Avatar
            src={formData.selectedImage}
            sx={{
              width: 120,
              height: 120,
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: 3
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {formData.basicInfo?.firstName || "N/A"} {formData.basicInfo?.lastName || ""}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
              {formData.basicInfo?.designation || "N/A"} • {formData.role || "N/A"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 2
              }}
            >
              <Chip
                label={`Staff ID: ${formData.basicInfo?.staffId || "N/A"}`}
                size="small"
                icon={<Badge fontSize="small" />}
              />
              <Chip
                label={`Joined: ${formatDate(formData.joiningDate)}`}
                size="small"
                icon={<DateRange fontSize="small" />}
              />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Personal Details
              </Typography>
              <List dense>
                <InfoItem
                  icon={<Cake fontSize="small" />}
                  primary="Date of Birth"
                  secondary={formatDate(formData.basicInfo?.dob)}
                />
                <InfoItem
                  icon={<Person fontSize="small" />}
                  primary="Gender"
                  secondary={formData.basicInfo?.gender}
                />
                <InfoItem
                  icon={<DriveFileRenameOutline fontSize="small" />}
                  primary="Marital Status"
                  secondary={formData.basicInfo?.maritalStatus}
                />
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Contact Information
              </Typography>
              <List dense>
                <InfoItem
                  icon={<Email fontSize="small" />}
                  primary="Email"
                  secondary={formData.basicInfo?.email}
                />
                <InfoItem
                  icon={<Phone fontSize="small" />}
                  primary="Phone"
                  secondary={formData.basicInfo?.phone}
                />
                <InfoItem
                  icon={<Contacts fontSize="small" />}
                  primary="Emergency Contact"
                  secondary={formData.basicInfo?.emergencyContact}
                />
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Family Information
              </Typography>
              <List dense>
                <InfoItem
                  icon={<FamilyRestroom fontSize="small" />}
                  primary="Father's Name"
                  secondary={`${formData.basicInfo?.fatherTitle || ""} ${
                    formData.basicInfo?.fatherName || ""
                  }`}
                />
                <InfoItem
                  icon={<FamilyRestroom fontSize="small" />}
                  primary="Mother's Name"
                  secondary={`${formData.basicInfo?.motherTitle || ""} ${
                    formData.basicInfo?.motherName || ""
                  }`}
                />
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Current Address
              </Typography>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "flex-start" }}>
                <HomeWork fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                {formatAddress(formData.addressInfo, "current")}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                Permanent Address
              </Typography>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "flex-start" }}>
                <Home fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                {formatAddress(formData.addressInfo, "permanent")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Documents Section with better organization
  const DocumentsSection = () => (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={<SectionHeader icon={<Description />} title="Documents" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                Government IDs
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<CreditCard fontSize="small" />}
                    primary="PAN Card"
                    secondary={formData.documents?.panCard}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<AccountCircle fontSize="small" />}
                    primary="Aadhaar Card"
                    secondary={formData.documents?.aadhaarCard}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<ContactMail fontSize="small" />}
                    primary="Passport"
                    secondary={formData.documents?.passport}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<DriveFileRenameOutline fontSize="small" />}
                    primary="Driving License"
                    secondary={formData.documents?.drivingLicense}
                    sx={{ px: 0 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                Uploaded Files
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                <FileChip
                  file={formData.files?.resume}
                  fileName="Resume"
                  icon={<Description />}
                  label="Resume"
                />
                <FileChip
                  file={formData.files?.joiningLetter}
                  fileName="Joining Letter"
                  icon={<Description />}
                  label="Joining Letter"
                />
                <FileChip
                  file={formData.files?.aadharFront}
                  fileName="Aadhar Front"
                  icon={<ImageIcon />}
                  label="Aadhar Front"
                />
                <FileChip
                  file={formData.files?.aadharBack}
                  fileName="Aadhar Back"
                  icon={<ImageIcon />}
                  label="Aadhar Back"
                />
                <FileChip
                  file={formData.files?.panCard}
                  fileName="PAN Card"
                  icon={<ImageIcon />}
                  label="PAN Card"
                />
                <FileChip
                  file={formData.files?.offerLetter}
                  fileName="Offer Letter"
                  icon={<Description />}
                  label="Offer Letter"
                />
                <FileChip
                  file={formData.files?.otherDocuments}
                  fileName="Other Documents"
                  icon={<Folder />}
                  label="Other Documents"
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Work Experience Section with better table styling
  const WorkExperienceSection = () => (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={<SectionHeader icon={<WorkHistory />} title="Work Experience" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        {formData.experiences && formData.experiences.length > 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small" sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: theme.palette.grey[isDarkMode ? 800 : 100] }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.experiences.map((exp, index) => (
                  <TableRow key={index} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                    <TableCell>{exp.company || "N/A"}</TableCell>
                    <TableCell>{exp.position || "N/A"}</TableCell>
                    <TableCell>
                      {formatDate(exp.from)} - {formatDate(exp.to) || "Present"}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="body2" noWrap>
                        {exp.description || "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No work experience added
            </Typography>
          </Paper>
        )}
      </CardContent>
    </Card>
  );

  // Education Section with better organization
  const EducationSection = () => (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={<SectionHeader icon={<School />} title="Educational Qualifications" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {/* 10th Class */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                10th Class Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Board
                  </Typography>
                  <Typography>{formData.tenthBoard || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Percentage
                  </Typography>
                  <Typography>{formData.tenthPercentage || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Year
                  </Typography>
                  <Typography>{formData.tenthYear || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Marksheet
                  </Typography>
                  {formData.fileNames?.tenthMarksheet ? (
                    <FileChip
                      file={formData.files?.tenthMarksheet}
                      fileName="10th Marksheet"
                      icon={<Description />}
                      label="10th Marksheet"
                    />
                  ) : (
                    <Typography variant="body2">Not Uploaded</Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* 12th Class */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                12th Class Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Board
                  </Typography>
                  <Typography>{formData.twelfthBoard || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Percentage
                  </Typography>
                  <Typography>{formData.twelfthPercentage || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Year
                  </Typography>
                  <Typography>{formData.twelfthYear || "N/A"}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Marksheet
                  </Typography>
                  {formData.fileNames?.twelfthMarksheet ? (
                    <FileChip
                      file={formData.files?.twelfthMarksheet}
                      fileName="12th Marksheet"
                      icon={<Description />}
                      label="12th Marksheet"
                    />
                  ) : (
                    <Typography variant="body2">Not Uploaded</Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Higher Education */}
          {formData.sections && formData.sections.length > 0 && (
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                  Higher Education
                </Typography>

                {/* UG */}
                {formData.sections.includes("UG") && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      Undergraduate (UG)
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          College
                        </Typography>
                        <Typography>{formData.ugCollegeName || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Course
                        </Typography>
                        <Typography>{formData.ugCourse || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Percentage
                        </Typography>
                        <Typography>{formData.ugPercentage || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Marksheets
                        </Typography>
                        {formData.fileNames?.ugYear1 ? (
                          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
                            {[...Array(formData.ugYears || 3)].map((_, i) => (
                              <FileChip
                                key={i}
                                file={formData.files?.[`ugYear${i + 1}`]}
                                fileName={`UG Year ${i + 1} Marksheet`}
                                icon={<Description />}
                                label={`Year ${i + 1}`}
                                size="small"
                              />
                            ))}
                          </Stack>
                        ) : (
                          <Typography variant="body2">Not Uploaded</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* PG */}
                {formData.sections.includes("PG") && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      Postgraduate (PG)
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          College
                        </Typography>
                        <Typography>{formData.pgCollegeName || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Course
                        </Typography>
                        <Typography>{formData.pgCourse || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Percentage
                        </Typography>
                        <Typography>{formData.pgPercentage || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Marksheet
                        </Typography>
                        {formData.fileNames?.pgMarksheet ? (
                          <FileChip
                            file={formData.files?.pgMarksheet}
                            fileName="PG Marksheet"
                            icon={<Description />}
                            label="PG Marksheet"
                          />
                        ) : (
                          <Typography variant="body2">Not Uploaded</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* PhD */}
                {formData.sections.includes("PhD") && (
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      PhD Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          University
                        </Typography>
                        <Typography>{formData.phdCollegeName || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Course
                        </Typography>
                        <Typography>{formData.phdCourse || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Thesis Title
                        </Typography>
                        <Typography>{formData.phdThesisTitle || "N/A"}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="text.secondary">
                          Completion Year
                        </Typography>
                        <Typography>{formData.phdCompletionYear || "N/A"}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );

  // Payroll & Bank Details Section with better organization
  const PayrollBankSection = () => (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={<SectionHeader icon={<AttachMoney />} title="Payroll & Bank Details" />}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {/* Payroll Info */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                Payroll Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<AccountBalance fontSize="small" />}
                    primary="EPF Number"
                    secondary={formData.payrollInfo?.epfNo}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<AttachMoney fontSize="small" />}
                    primary="Basic Salary"
                    secondary={
                      formData.payrollInfo?.basicSalary
                        ? `₹${formData.payrollInfo.basicSalary}`
                        : null
                    }
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<Work fontSize="small" />}
                    primary="Contract Type"
                    secondary={formData.payrollInfo?.contractType}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<WorkHistory fontSize="small" />}
                    primary="Work Shift"
                    secondary={formData.payrollInfo?.workShift}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoItem
                    icon={<LocationCity fontSize="small" />}
                    primary="Work Location"
                    secondary={formData.payrollInfo?.workLocation}
                    sx={{ px: 0 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Bank Info */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                Bank Account Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<Badge fontSize="small" />}
                    primary="Account Holder"
                    secondary={formData.bankInfo?.accountHolderName}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<CreditCard fontSize="small" />}
                    primary="Account Number"
                    secondary={formData.bankInfo?.accountNumber}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<AccountBalance fontSize="small" />}
                    primary="Bank Name"
                    secondary={formData.bankInfo?.bankName}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<LibraryBooks fontSize="small" />}
                    primary="IFSC Code"
                    secondary={formData.bankInfo?.ifscCode}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<PinDrop fontSize="small" />}
                    primary="Branch Name"
                    secondary={formData.bankInfo?.branchName}
                    sx={{ px: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<Assignment fontSize="small" />}
                    primary="Account Type"
                    secondary={formData.bankInfo?.accountType}
                    sx={{ px: 0 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Leave Allocation */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mt: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
            Leave Allocation
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                label: "Medical Leave",
                value: formData.leaveAllocation?.medicalLeave,
                icon: <Note fontSize="small" />
              },
              {
                label: "Casual Leave",
                value: formData.leaveAllocation?.casualLeave,
                icon: <Note fontSize="small" />
              },
              {
                label: "Maternity Leave",
                value: formData.leaveAllocation?.maternityLeave,
                icon: <Note fontSize="small" />
              },
              {
                label: "Sick Leave",
                value: formData.leaveAllocation?.sickLeave,
                icon: <Note fontSize="small" />
              }
            ].map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      p: 1,
                      borderRadius: 1,
                      display: "flex"
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item.value || "0"} days
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Staff Details Preview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please review all details before submitting
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{
            backgroundColor: isDarkMode ? theme.palette.grey[800] : "white",
            "&:hover": {
              backgroundColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[100]
            }
          }}
        >
          Back to Edit
        </Button>
      </Box>

      {/* Main Content Sections */}
      <BasicInfoSection />
      <EducationSection />
      <WorkExperienceSection />
      <DocumentsSection />
      <PayrollBankSection />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            px: 4,
            backgroundColor: isDarkMode ? theme.palette.grey[800] : "white"
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: 4,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark
            }
          }}
        >
          Submit
        </Button>
      </Box>

      <FilePreviewDialog />
    </Box>
  );
}
