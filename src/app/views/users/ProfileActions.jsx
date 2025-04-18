import { Box, Button } from "@mui/material";

const ProfileActions = () => {
  return (
    <Box
      textAlign="center"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 3
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{
          px: 3,
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: "500"
        }}
      >
        Edit Profile
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          px: 3,
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: "500"
        }}
      >
        View History
      </Button>
    </Box>
  );
};

export default ProfileActions;
