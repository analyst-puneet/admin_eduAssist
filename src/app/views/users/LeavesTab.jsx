import { Box, Typography } from "@mui/material";

const LeavesTab = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Leave Balance
      </Typography>
      <Typography>Casual Leaves: 8/12 (API)</Typography>
      <Typography>Sick Leaves: 5/7</Typography>
      <Typography>Earned Leaves: 10/15</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Upcoming Time-Off
      </Typography>
      <Typography>15-18 Oct 2023: Diwali Break (Approved)</Typography>
    </Box>
  );
};

export default LeavesTab;
