import React from "react";
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
  IconButton
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
  ArrowBack
} from "@mui/icons-material";

export default function PreviewStaffDetails({ formData, onSubmit, onBack }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // Basic Information Section
  const BasicInfoSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Person sx={{ mr: 1 }} /> Basic Information
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        {formData.selectedImage && (
          <Avatar src={formData.selectedImage} sx={{ width: 100, height: 100, mr: 3 }} />
        )}
        <Box>
          <Typography variant="h5">
            {formData.basicInfo?.firstName} {formData.basicInfo?.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {formData.basicInfo?.designation} ({formData.role})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Staff ID: {formData.basicInfo?.staffId}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Gender" secondary={formData.basicInfo?.gender || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              <ListItemText
                primary="Date of Birth"
                secondary={formatDate(formData.basicInfo?.dob)}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DateRange />
              </ListItemIcon>
              <ListItemText
                primary="Date of Joining"
                secondary={formatDate(formData.joiningDate)}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={formData.basicInfo?.email || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary="Phone" secondary={formData.basicInfo?.phone || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText
                primary="Emergency Contact"
                secondary={formData.basicInfo?.emergencyContact || "N/A"}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Current Address" secondary={formData.address || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary="Permanent Address"
                secondary={formData.permanentAddress || "N/A"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );

  // Educational Qualifications Section
  const EducationSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <School sx={{ mr: 1 }} /> Educational Qualifications
      </Typography>

      {/* 10th Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          10th Class
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              School
            </Typography>
            <Typography>{formData.tenthSchool || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Board
            </Typography>
            <Typography>{formData.tenthBoard || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Percentage
            </Typography>
            <Typography>{formData.tenthPercentage || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Marksheet
            </Typography>
            <Typography>
              {formData.fileNames?.tenthMarksheet ? (
                <Chip icon={<Description />} label="Uploaded" size="small" color="success" />
              ) : (
                "Not Uploaded"
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* 12th Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
          12th Class
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              School
            </Typography>
            <Typography>{formData.twelfthSchool || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Board
            </Typography>
            <Typography>{formData.twelfthBoard || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Percentage
            </Typography>
            <Typography>{formData.twelfthPercentage || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Marksheet
            </Typography>
            <Typography>
              {formData.fileNames?.twelfthMarksheet ? (
                <Chip icon={<Description />} label="Uploaded" size="small" color="success" />
              ) : (
                "Not Uploaded"
              )}
            </Typography>
          </Grid>
        </Grid>

        {/* 12th Subjects */}
        {formData.subjects && formData.subjects.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Subjects
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {formData.subjects.map(
                (subject, index) =>
                  subject.name && <Chip key={index} label={subject.name} size="small" />
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* Higher Education */}
      {formData.sections && formData.sections.length > 0 && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            Higher Education
          </Typography>

          {/* UG */}
          {formData.sections.includes("UG") && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Undergraduate (UG)
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
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
                  <Typography>
                    {formData.fileNames?.ugYear1 ? (
                      <Chip
                        icon={<Description />}
                        label={`${formData.ugYears || 3} Uploaded`}
                        size="small"
                        color="success"
                      />
                    ) : (
                      "Not Uploaded"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* PG */}
          {formData.sections.includes("PG") && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Postgraduate (PG)
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
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
                  <Typography>
                    {formData.fileNames?.pgMarksheet ? (
                      <Chip icon={<Description />} label="Uploaded" size="small" color="success" />
                    ) : (
                      "Not Uploaded"
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* PhD */}
          {formData.sections.includes("PhD") && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                PhD
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
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
        </Box>
      )}
    </Paper>
  );

  // Work Experience Section
  const WorkExperienceSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Work sx={{ mr: 1 }} /> Work Experience
      </Typography>

      {formData.experiences && formData.experiences.length > 0 ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.experiences.map((exp, index) => (
                <TableRow key={index}>
                  <TableCell>{exp.company || "N/A"}</TableCell>
                  <TableCell>{exp.position || "N/A"}</TableCell>
                  <TableCell>
                    {formatDate(exp.from)} - {formatDate(exp.to)}
                  </TableCell>
                  <TableCell>{exp.description || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No work experience added
        </Typography>
      )}
    </Paper>
  );

  // Documents Section
  const DocumentsSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <Description sx={{ mr: 1 }} /> Documents
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2" color="text.secondary">
            PAN Card
          </Typography>
          <Typography>{formData.documents?.panCard || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2" color="text.secondary">
            Aadhaar Card
          </Typography>
          <Typography>{formData.documents?.aadhaarCard || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2" color="text.secondary">
            Passport
          </Typography>
          <Typography>{formData.documents?.passport || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2" color="text.secondary">
            Driving License
          </Typography>
          <Typography>{formData.documents?.drivingLicense || "N/A"}</Typography>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
        Uploaded Files
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {formData.files?.resume && (
          <Chip icon={<Description />} label="Resume" color="primary" variant="outlined" />
        )}
        {formData.files?.joiningLetter && (
          <Chip icon={<Description />} label="Joining Letter" color="primary" variant="outlined" />
        )}
        {formData.files?.resignationLetter && (
          <Chip
            icon={<Description />}
            label="Resignation Letter"
            color="primary"
            variant="outlined"
          />
        )}
        {formData.files?.otherDocuments && (
          <Chip icon={<Description />} label="Other Documents" color="primary" variant="outlined" />
        )}
      </Box>
    </Paper>
  );

  // Payroll & Bank Details Section
  const PayrollBankSection = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <AttachMoney sx={{ mr: 1 }} /> Payroll & Bank Details
      </Typography>

      <Grid container spacing={2}>
        {/* Payroll Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Payroll Information
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="EPF Number" secondary={formData.payrollInfo?.epfNo || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Basic Salary"
                secondary={
                  formData.payrollInfo?.basicSalary ? `₹${formData.payrollInfo.basicSalary}` : "N/A"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Contract Type"
                secondary={formData.payrollInfo?.contractType || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Work Shift"
                secondary={formData.payrollInfo?.workShift || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Work Location"
                secondary={formData.payrollInfo?.workLocation || "N/A"}
              />
            </ListItem>
          </List>
        </Grid>

        {/* Bank Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
            Bank Account Information
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Account Holder"
                secondary={formData.bankInfo?.accountHolderName || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Number"
                secondary={formData.bankInfo?.accountNumber || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bank Name" secondary={formData.bankInfo?.bankName || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemText primary="IFSC Code" secondary={formData.bankInfo?.ifscCode || "N/A"} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Branch Name"
                secondary={formData.bankInfo?.branchName || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Account Type"
                secondary={formData.bankInfo?.accountType || "N/A"}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Leave Allocation */}
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
        Leave Allocation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Medical Leave
          </Typography>
          <Typography>{formData.leaveAllocation?.medicalLeave || "0"} days</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Casual Leave
          </Typography>
          <Typography>{formData.leaveAllocation?.casualLeave || "0"} days</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Maternity Leave
          </Typography>
          <Typography>{formData.leaveAllocation?.maternityLeave || "0"} days</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="body2" color="text.secondary">
            Sick Leave
          </Typography>
          <Typography>{formData.leaveAllocation?.sickLeave || "0"} days</Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h5">Staff Details Preview</Typography>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={onBack} sx={{ mr: 2 }}>
          Back to Edit
        </Button>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Please review all the details before submitting. You can go back to edit any information if
        needed.
      </Typography>

      <BasicInfoSection />
      <EducationSection />
      <WorkExperienceSection />
      <DocumentsSection />
      <PayrollBankSection />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button variant="outlined" onClick={onBack} sx={{ px: 4 }}>
          Back
        </Button>
        <Button variant="contained" onClick={onSubmit} sx={{ px: 4 }} color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
