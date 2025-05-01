import { Avatar, Typography, Box } from "@mui/material";
import { BASE_URL } from "../../../../main";

const ProfileHeader = ({ userData }) => {
  // Construct the full image URL if it's not already a complete URL
  const getImageUrl = (img) => {
    if (!img) return "https://i.pravatar.cc/150?img=3";
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return `${BASE_URL}${img}`;
  };

  return (
    <Box textAlign="center" mb={3}>
      <Avatar
        src={getImageUrl(userData.profile_photo_path)}
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
        {userData.first_name} {userData.last_name}
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
