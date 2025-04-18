import { Box, Typography } from "@mui/material";

const TimelineTab = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      <Typography>Oct 10: Promotion to Senior Developer (API)</Typography>
      <Typography>Sep 25: Project "Phoenix" completed</Typography>
      <Typography>Aug 15: Team Lunch</Typography>
    </Box>
  );
};

export default TimelineTab;
