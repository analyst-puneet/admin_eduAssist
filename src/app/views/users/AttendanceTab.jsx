import { Box, Typography } from "@mui/material";

const AttendanceTab = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        This Month's Summary
      </Typography>
      <Typography>Present: 20 days (API)</Typography>
      <Typography>Late Arrivals: 2</Typography>
      <Typography>WFH: 3 days</Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Today's Status
      </Typography>
      <Typography>Checked in at: 9:45 AM (API)</Typography>
    </Box>
  );
};

export default AttendanceTab;
