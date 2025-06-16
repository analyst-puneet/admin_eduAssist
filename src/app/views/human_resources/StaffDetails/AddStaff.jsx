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
import React, { useEffect, useState } from "react";
import Addstaff1 from "./AddStaff1";
import Addstaff4 from "./AddStaff4";
import Addstaff2 from "./AddStaff2";
import Addstaff3 from "./AddStaff3";
import PreviewStaffDetails from "./PreviewStaffDetails";
import { useNavigate } from "react-router-dom";

export default function StepperForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === "dark";
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepValid, setStepValid] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("error");
  const steps = getSteps();
  const [previewMode, setPreviewMode] = React.useState(false);

  // Initialize form data from sessionStorage or empty object
  const [formData, setFormData] = React.useState(() => {
    try {
      const savedData = sessionStorage.getItem("staffFormData");
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error("Error parsing saved form data:", error);
      return {};
    }
  });

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      sessionStorage.removeItem("staffFormData");
    };
  }, []);

  // Update the useEffect for storing form data:
  React.useEffect(() => {
    const dataToStore = JSON.parse(
      JSON.stringify({
        ...formData,
        files: Object.fromEntries(
          Object.entries(formData.files || {}).map(([key, file]) => [
            key,
            {
              name: file.name,
              type: file.type,
              data: file.data
            }
          ])
        )
      })
    );

    try {
      sessionStorage.setItem("staffFormData", JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Failed to save form data:", error);
      if (error.name === "QuotaExceededError") {
        const simplifiedData = {
          ...formData,
          files: undefined
        };
        sessionStorage.setItem("staffFormData", JSON.stringify(simplifiedData));
      }
    }
  }, [formData]);

  const [triggerValidation, setTriggerValidation] = React.useState(false);

  const handleNext = () => {
    setTriggerValidation(true);

    setTimeout(() => {
      if (stepValid) {
        if (activeStep === steps.length - 1) {
          // Last step, show preview instead of going to 'All steps completed'
          setPreviewMode(true);
        } else {
          setActiveStep((prev) => prev + 1);
        }
        setTriggerValidation(false);
      } else {
        showError("Please fill all required fields before proceeding");
      }
    }, 0);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      // When on first step (AddStaff1), navigate to staff-details
      navigate("/human_resources/staff-details");
    } else {
      // For other steps, go to previous step
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setPreviewMode(false);
    setFormData({
      basicInfo: null,
      addressInfo: null,
      experiences: [],
      documents: null,
      payrollInfo: null,
      leaveAllocation: null,
      bankInfo: null,
      educationLevel: "",
      sections: [],
      fileNames: {},
      files: {},
      ugYears: 3,
      selectedImage: null,
      role: "",
      joiningDate: "",
      sameAsAddress: false
    });

    // Clear session storage
    sessionStorage.removeItem("staffFormData");

    // Clear IndexedDB
    clearIndexedDB();

    showSuccess("Form has been reset");
  };

  const handleBackFromPreview = (shouldReset = false) => {
    if (shouldReset) {
      // Reset all form data
      setActiveStep(0);
      setFormData({
        basicInfo: null,
        addressInfo: null,
        experiences: [],
        documents: null,
        payrollInfo: null,
        leaveAllocation: null,
        bankInfo: null,
        educationLevel: "",
        sections: [],
        fileNames: {},
        files: {},
        ugYears: 3,
        selectedImage: null,
        role: "",
        joiningDate: "",
        sameAsAddress: false
      });

      // Clear IndexedDB
      clearIndexedDB();
    }
    setActiveStep(activeStep - 1);
  };

  const clearIndexedDB = async () => {
    try {
      const fileKeys = [
        "staff-photo",
        "resume",
        "joiningLetter",
        "aadharFront",
        "aadharBack",
        "panCard",
        "offerLetter",
        "otherDocuments",
        "tenthMarksheet",
        "tenthCertificate",
        "twelfthMarksheet",
        "twelfthCertificate",
        ...Array.from({ length: 10 }, (_, i) => `ugYear${i + 1}`),
        "pgMarksheet1",
        "pgMarksheet2",
        "phdCertificate"
      ];

      for (const key of fileKeys) {
        await deleteFileFromDB(key);
      }
    } catch (error) {
      console.error("Error clearing IndexedDB:", error);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the formData to your API
    console.log("Form submitted:", formData);
    showSuccess("Staff member added successfully!");

    // Clear all data after successful submission
    handleReset();

    // Additionally clear IndexedDB
    clearIndexedDB();

    // Reset the form to initial state
    setActiveStep(0);
    setPreviewMode(false);
    setFormData({});
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

  function getSteps() {
    return [
      "Personal Information",
      "Educational Details",
      "Payroll & Bank Details",
      "Upload Documents"
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
            triggerValidation={triggerValidation}
          />
        );
      case 1:
        return (
          <Addstaff4
            formData={formData}
            setFormData={setFormData}
            onValidationChange={setStepValid}
            triggerValidation={triggerValidation}
          />
        );
      case 2:
        return (
          <Addstaff2
            formData={formData}
            setFormData={setFormData}
            onValidationChange={setStepValid}
            triggerValidation={triggerValidation}
          />
        );
      case 3:
        return (
          <Addstaff3
            formData={formData}
            setFormData={setFormData}
            onValidationChange={setStepValid}
            triggerValidation={triggerValidation}
          />
        );
      default:
        return "Unknown Step";
    }
  }

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
        {previewMode ? (
          <PreviewStaffDetails
            formData={formData}
            onSubmit={handleSubmit}
            onBack={() => setPreviewMode(false)}
          />
        ) : (
          <Box>
            {getStepContent(activeStep, formData, setFormData, setStepValid)}

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="contained" sx={backButtonStyle} onClick={handleBack}>
                {activeStep === 0 ? "Back to Staff List" : "Back"}
              </Button>

              <Button variant="contained" sx={nextButtonStyle} onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Preview And Submit" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
