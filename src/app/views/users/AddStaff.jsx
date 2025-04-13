import { Box, Button, Step, StepLabel, Stepper, Typography, Paper, Container } from "@mui/material";
import React from "react";
// import Addstaff1 from "./Addstaff1";
import Addstaff2 from "./Addstaff2";
import Addstaff3 from "./Addstaff3";

function getSteps() {
  return ["Personal Information", "Payroll & Bank Details", "Review & Submit"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Unknown Step";
      // return <Addstaff1 />;
    case 1:
      return <Addstaff2 />;
    case 2:
      return <Addstaff3 />;
    default:
      return "Unknown Step";
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
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
            {getStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="secondary"
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
