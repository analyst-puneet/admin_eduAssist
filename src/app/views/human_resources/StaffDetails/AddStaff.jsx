import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Container,
  useTheme,
  Snackbar,
  Alert
} from "@mui/material";
import React from "react";
import Addstaff1 from "./AddStaff1";
import Addstaff2 from "./AddStaff2";
import Addstaff3 from "./AddStaff3";
import Addstaff4 from "./AddStaff4";

function getSteps() {
  return [
    "Personal Information",
    "Educational Details",
    "Payroll & Bank Details",
    "Review & Submit"
  ];
}

function getStepContent(stepIndex, formData, setFormData, setStepValid) {
  switch (stepIndex) {
    case 0:
      return (
        <Addstaff1
          formData={formData}
          setFormData={setFormData}
          onValidationChange={setStepValid}
        />
      );
    case 1:
      return (
        <Addstaff4
          formData={formData}
          setFormData={setFormData}
          onValidationChange={setStepValid}
        />
      );
    case 2:
      return (
        <Addstaff2
          formData={formData}
          setFormData={setFormData}
          onValidationChange={setStepValid}
        />
      );
    case 3:
      return (
        <Addstaff3
          formData={formData}
          setFormData={setFormData}
          onValidationChange={setStepValid}
        />
      );
    default:
      return "Unknown Step";
  }
}

export default function StepperForm() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepValid, setStepValid] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("error");
  const steps = getSteps();

  // Initialize form data from sessionStorage or empty object
  const [formData, setFormData] = React.useState(() => {
    const savedData = sessionStorage.getItem("staffFormData");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save to sessionStorage whenever formData changes
  React.useEffect(() => {
    sessionStorage.setItem("staffFormData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (stepValid) {
      setActiveStep((prev) => prev + 1);
    } else {
      showError("Please fill all required fields before proceeding");
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setFormData({});
    sessionStorage.removeItem("staffFormData");
    showSuccess("Form has been reset");
  };

  const handleSubmit = () => {
    // Here you would typically send the formData to your API
    console.log("Form submitted:", formData);
    showSuccess("Staff member added successfully!");
    handleReset();
  };

  const showError = (message) => {
    setSnackbarSeverity("error");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const showSuccess = (message) => {
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Back button style that works in both enabled and disabled states
  const backButtonStyle = {
    backgroundColor: isDarkMode ? theme.palette.grey[700] : theme.palette.secondary.main,
    color: theme.palette.common.white + " !important",
    "&:hover": {
      backgroundColor: isDarkMode ? theme.palette.grey[600] : theme.palette.secondary.dark
    },
    "&.Mui-disabled": {
      backgroundColor: isDarkMode
        ? theme.palette.grey[800]
        : theme.palette.action.disabledBackground,
      color: theme.palette.common.white + " !important"
    }
  };

  // Next button style that changes based on validation
  const nextButtonStyle = {
    backgroundColor: stepValid ? theme.palette.primary.main : theme.palette.grey[500],
    "&:hover": {
      backgroundColor: stepValid ? theme.palette.primary.dark : theme.palette.grey[600]
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Stepper */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      <Paper elevation={1} sx={{ p: 4 }}>
        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              🎉 All steps completed – you're done!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ px: 4 }}>
                Submit
              </Button>
              <Button variant="outlined" onClick={handleReset} sx={{ px: 4 }}>
                Start Over
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep, formData, setFormData, setStepValid)}

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                sx={backButtonStyle}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              <Button variant="contained" sx={nextButtonStyle} onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
