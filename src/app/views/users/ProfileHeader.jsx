import { Avatar, Typography, Box } from "@mui/material";

const ProfileHeader = ({ userData }) => {
  return (
    <Box textAlign="center" mb={2}>
      <Avatar
        src={userData.img || "https://i.pravatar.cc/150?img=3"}
        sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
      />
      <Typography variant="h6">{userData.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {userData.designation}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {userData.department}
      </Typography>
    </Box>
  );
};

export default ProfileHeader;
