import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";

export default function PreviewStaffDetails({ formData, onSubmit, onBack }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Preview Staff Details
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Personal Information</Typography>
      <pre>{JSON.stringify(formData.personalInfo, null, 2)}</pre>

      <Typography variant="h6">Educational Details</Typography>
      <pre>{JSON.stringify(formData.educationDetails, null, 2)}</pre>

      <Typography variant="h6">Payroll & Bank Details</Typography>
      <pre>{JSON.stringify(formData.payrollDetails, null, 2)}</pre>

      <Typography variant="h6">Other Info</Typography>
      <pre>{JSON.stringify(formData.otherDetails, null, 2)}</pre>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
