import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
  useTheme,
  Divider,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddStaff2({
  formData,
  setFormData,
  onValidationChange,
  triggerValidation
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Initialize state from formData
  const [payrollInfo, setPayrollInfo] = useState(
    formData.payrollInfo || {
      epfNo: "",
      basicSalary: "",
      contractType: "",
      workShift: "",
      workLocation: ""
    }
  );

  const [leaveAllocation, setLeaveAllocation] = useState(
    formData.leaveAllocation || {
      medicalLeave: "",
      casualLeave: "",
      maternityLeave: "",
      sickLeave: ""
    }
  );

  const [bankInfo, setBankInfo] = useState(
    formData.bankInfo || {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      branchName: "",
      accountType: ""
    }
  );

  // Validation states
  const [errors, setErrors] = useState({
    epfNo: false,
    basicSalary: false,
    contractType: false,
    workShift: false,
    workLocation: false,
    accountHolderName: false,
    accountNumber: false,
    bankName: false,
    ifscCode: false,
    accountType: false,
    medicalLeave: false,
    casualLeave: false,
    maternityLeave: false,
    sickLeave: false,
    branchName: false
  });

  const [showErrors, setShowErrors] = useState(false);

  // Validate form and notify parent
  const validateForm = (show = false) => {
    const newErrors = {
      epfNo: !payrollInfo.epfNo,
      basicSalary: !payrollInfo.basicSalary,
      contractType: !payrollInfo.contractType,
      workShift: !payrollInfo.workShift,
      workLocation: !payrollInfo.workLocation,
      accountHolderName: !bankInfo.accountHolderName,
      accountNumber: !bankInfo.accountNumber,
      bankName: !bankInfo.bankName,
      ifscCode: !bankInfo.ifscCode,
      accountType: !bankInfo.accountType,
      medicalLeave: !leaveAllocation.medicalLeave,
      casualLeave: !leaveAllocation.casualLeave,
      maternityLeave: !leaveAllocation.maternityLeave,
      sickLeave: !leaveAllocation.sickLeave,
      branchName: !bankInfo.branchName
    };

    if (show) setErrors(newErrors);

    const isFormValid = !Object.values(newErrors).some((error) => error);
    if (onValidationChange) {
      onValidationChange(isFormValid);
    }

    return isFormValid;
  };

  // Update formData whenever any field changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      payrollInfo,
      leaveAllocation,
      bankInfo
    }));
  }, [payrollInfo, leaveAllocation, bankInfo]);

  // Validate on mount and when dependencies change
  useEffect(() => {
    validateForm();
  }, [payrollInfo, bankInfo]);

  useEffect(() => {
    if (triggerValidation) {
      setShowErrors(true);
      validateForm(true);
    }
  }, [triggerValidation]);

  // Input styling with error state
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

  const errorStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "error.main",
      borderWidth: "2px"
    }
  };

  const handlePayrollChange = (field, value) => {
    setPayrollInfo((prev) => ({
      ...prev,
      [field]: value
    }));
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleLeaveChange = (field, value) => {
    setLeaveAllocation((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankInfoChange = (field, value) => {
    setBankInfo((prev) => ({
      ...prev,
      [field]: value
    }));
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validate field on blur
  const handleFieldBlur = (field) => {
    if (field in payrollInfo) {
      setErrors((prev) => ({ ...prev, [field]: !payrollInfo[field] }));
    } else if (field in bankInfo) {
      setErrors((prev) => ({ ...prev, [field]: !bankInfo[field] }));
    }
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
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? theme.palette.common.white : "inherit"
          }}
        >
          Payroll & Bank Details
        </Typography>
      </Box>

      {/* Payroll Section */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Payroll Information
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="EPF No."
              fullWidth
              required
              sx={errors.epfNo ? { ...errorStyle } : { ...inputStyle }}
              value={payrollInfo.epfNo}
              onChange={(e) => handlePayrollChange("epfNo", e.target.value)}
              onBlur={() => handleFieldBlur("epfNo")}
              error={errors.epfNo}
              helperText={errors.epfNo ? "EPF number is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Basic Salary"
              fullWidth
              required
              type="number"
              sx={errors.basicSalary ? errorStyle : inputStyle}
              value={payrollInfo.basicSalary}
              onChange={(e) => handlePayrollChange("basicSalary", e.target.value)}
              onBlur={() => handleFieldBlur("basicSalary")}
              error={errors.basicSalary}
              helperText={errors.basicSalary ? "Basic salary is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.contractType ? errorStyle : inputStyle}
              error={errors.contractType}
            >
              <InputLabel>Contract Type</InputLabel>
              <Select
                value={payrollInfo.contractType}
                label="Contract Type"
                onChange={(e) => handlePayrollChange("contractType", e.target.value)}
                onBlur={() => handleFieldBlur("contractType")}
              >
                <MenuItem value="Full-Time" sx={{ fontSize: "0.875rem" }}>
                  Full-Time
                </MenuItem>
                <MenuItem value="Part-Time" sx={{ fontSize: "0.875rem" }}>
                  Part-Time
                </MenuItem>
                <MenuItem value="Temporary" sx={{ fontSize: "0.875rem" }}>
                  Temporary
                </MenuItem>
              </Select>
              {errors.contractType && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Contract type is required
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Work Shift"
              fullWidth
              required
              sx={errors.workShift ? errorStyle : inputStyle}
              value={payrollInfo.workShift}
              onChange={(e) => handlePayrollChange("workShift", e.target.value)}
              onBlur={() => handleFieldBlur("workShift")}
              error={errors.workShift}
              helperText={errors.workShift ? "Work shift is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Work Location"
              fullWidth
              required
              sx={errors.workLocation ? errorStyle : inputStyle}
              value={payrollInfo.workLocation}
              onChange={(e) => handlePayrollChange("workLocation", e.target.value)}
              onBlur={() => handleFieldBlur("workLocation")}
              error={errors.workLocation}
              helperText={errors.workLocation ? "Work location is required" : ""}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]
        }}
      />

      {/* Leaves Section */}
      <Box mb={3}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Leave Allocation
        </Typography>

        <Grid container spacing={1.5}>
          {/* Medical Leave */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Medical Leave"
              placeholder="Days"
              fullWidth
              required
              type="number"
              sx={errors.medicalLeave ? errorStyle : inputStyle}
              value={leaveAllocation.medicalLeave}
              onChange={(e) => handleLeaveChange("medicalLeave", e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, medicalLeave: !leaveAllocation.medicalLeave }))
              }
              error={errors.medicalLeave}
              helperText={errors.medicalLeave ? "Medical leave days required" : ""}
            />
          </Grid>

          {/* Casual Leave */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Casual Leave"
              placeholder="Days"
              fullWidth
              required
              type="number"
              sx={errors.casualLeave ? errorStyle : inputStyle}
              value={leaveAllocation.casualLeave}
              onChange={(e) => handleLeaveChange("casualLeave", e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, casualLeave: !leaveAllocation.casualLeave }))
              }
              error={errors.casualLeave}
              helperText={errors.casualLeave ? "Casual leave days required" : ""}
            />
          </Grid>

          {/* Maternity Leave */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Maternity Leave"
              placeholder="Days"
              fullWidth
              required
              type="number"
              sx={errors.maternityLeave ? errorStyle : inputStyle}
              value={leaveAllocation.maternityLeave}
              onChange={(e) => handleLeaveChange("maternityLeave", e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, maternityLeave: !leaveAllocation.maternityLeave }))
              }
              error={errors.maternityLeave}
              helperText={errors.maternityLeave ? "Maternity leave days required" : ""}
            />
          </Grid>

          {/* Sick Leave */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Sick Leave"
              placeholder="Days"
              fullWidth
              required
              type="number"
              sx={errors.sickLeave ? errorStyle : inputStyle}
              value={leaveAllocation.sickLeave}
              onChange={(e) => handleLeaveChange("sickLeave", e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({ ...prev, sickLeave: !leaveAllocation.sickLeave }))
              }
              error={errors.sickLeave}
              helperText={errors.sickLeave ? "Sick leave days required" : ""}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderColor: isDarkMode ? theme.palette.grey[700] : theme.palette.grey[300]
        }}
      />

      {/* Bank Account Details */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            mb: 1.5,
            color: isDarkMode ? theme.palette.grey[300] : theme.palette.text.secondary
          }}
        >
          Bank Account Information
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Account Holder Name"
              fullWidth
              required
              sx={errors.accountHolderName ? errorStyle : inputStyle}
              value={bankInfo.accountHolderName}
              onChange={(e) => handleBankInfoChange("accountHolderName", e.target.value)}
              onBlur={() => handleFieldBlur("accountHolderName")}
              error={errors.accountHolderName}
              helperText={errors.accountHolderName ? "Account holder name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Account Number"
              fullWidth
              required
              type="number"
              sx={errors.accountNumber ? errorStyle : inputStyle}
              value={bankInfo.accountNumber}
              onChange={(e) => handleBankInfoChange("accountNumber", e.target.value)}
              onBlur={() => handleFieldBlur("accountNumber")}
              error={errors.accountNumber}
              helperText={errors.accountNumber ? "Account number is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Bank Name"
              fullWidth
              required
              sx={errors.bankName ? errorStyle : inputStyle}
              value={bankInfo.bankName}
              onChange={(e) => handleBankInfoChange("bankName", e.target.value)}
              onBlur={() => handleFieldBlur("bankName")}
              error={errors.bankName}
              helperText={errors.bankName ? "Bank name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="IFSC Code"
              fullWidth
              required
              sx={errors.ifscCode ? errorStyle : inputStyle}
              value={bankInfo.ifscCode}
              onChange={(e) => handleBankInfoChange("ifscCode", e.target.value)}
              onBlur={() => handleFieldBlur("ifscCode")}
              error={errors.ifscCode}
              helperText={errors.ifscCode ? "IFSC code is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Branch Name"
              fullWidth
              required
              sx={errors.branchName ? errorStyle : inputStyle}
              value={bankInfo.branchName}
              onChange={(e) => handleBankInfoChange("branchName", e.target.value)}
              onBlur={() => handleFieldBlur("branchName")}
              error={errors.branchName}
              helperText={errors.branchName ? "Branch name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              required
              sx={errors.accountType ? errorStyle : inputStyle}
              error={errors.accountType}
            >
              <InputLabel>Account Type</InputLabel>
              <Select
                value={bankInfo.accountType}
                label="Account Type"
                onChange={(e) => handleBankInfoChange("accountType", e.target.value)}
                onBlur={() => handleFieldBlur("accountType")}
              >
                <MenuItem value="Savings" sx={{ fontSize: "0.875rem" }}>
                  Savings
                </MenuItem>
                <MenuItem value="Current" sx={{ fontSize: "0.875rem" }}>
                  Current
                </MenuItem>
                <MenuItem value="Salary" sx={{ fontSize: "0.875rem" }}>
                  Salary
                </MenuItem>
              </Select>
              {errors.accountType && (
                <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                  Account type is required
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
