import { Box, Typography } from "@mui/material";

const PayrollTab = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Salary Structure
      </Typography>
      <Typography>Basic Salary: ₹50,000 (To be fetched from API)</Typography>
      <Typography>HRA: ₹20,000</Typography>
      <Typography>PF: ₹2,500</Typography>
      <Typography>Net Salary: ₹67,500</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Bank Details
      </Typography>
      <Typography>Account Number: XXXX-XXXX-1234 (API)</Typography>
      <Typography>IFSC: HDFC0005678</Typography>
    </Box>
  );
};

export default PayrollTab;
