import { Box, Button } from "@mui/material";

const ProfileActions = () => {
  return (
    <Box textAlign="center" mt={2}>
      <Button variant="contained" color="primary" sx={{ mr: 1 }}>
        Edit Profile
      </Button>
      <Button variant="outlined" color="secondary">
        View History
      </Button>
    </Box>
  );
};

export default ProfileActions;
