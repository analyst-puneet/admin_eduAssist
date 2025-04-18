import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  Container,
  useTheme
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

function getStepContent(stepIndex, formData, setFormData) {
  switch (stepIndex) {
    case 0:
      return <Addstaff1 formData={formData} setFormData={setFormData} />;
    case 1:
      return <Addstaff4 formData={formData} setFormData={setFormData} />;
    case 2:
      return <Addstaff2 formData={formData} setFormData={setFormData} />;
    case 3:
      return <Addstaff3 formData={formData} setFormData={setFormData} />;
    default:
      return "Unknown Step";
  }
}

export default function StepperForm() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [activeStep, setActiveStep] = React.useState(0);
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

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setFormData({});
    sessionStorage.removeItem("staffFormData");
  };

  // Back button style that works in both enabled and disabled states
  const backButtonStyle = {
    backgroundColor: isDarkMode ? theme.palette.grey[700] : theme.palette.secondary.main,
    color: theme.palette.common.white + " !important", // Force white text in all states
    "&:hover": {
      backgroundColor: isDarkMode ? theme.palette.grey[600] : theme.palette.secondary.dark
    },
    "&.Mui-disabled": {
      backgroundColor: isDarkMode
        ? theme.palette.grey[800]
        : theme.palette.action.disabledBackground,
      color: theme.palette.common.white + " !important" // Force white text when disabled
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
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Preview & Submit
            </Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep, formData, setFormData)}

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

              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
