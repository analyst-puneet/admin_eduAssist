import { Avatar, Typography, Box } from "@mui/material";

const ProfileHeader = ({ userData }) => {
  return (
    <Box textAlign="center" mb={3}>
      <Avatar
        src={userData.img || "https://i.pravatar.cc/150?img=3"}
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
          border: "3px solid",
          borderColor: "primary.main"
        }}
      />
      <Typography variant="h5" fontWeight="600" gutterBottom>
        {userData.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {userData.designation}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          backgroundColor: "action.selected",
          display: "inline-block",
          px: 1.5,
          py: 0.5,
          borderRadius: "4px"
        }}
      >
        {userData.department}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
