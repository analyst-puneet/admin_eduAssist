import { Box } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoBlock from "./ProfileInfoBlock";
import ProfileActions from "./ProfileActions";

const ProfileCard = ({ userData }) => {
  return (
    <Box
      p={2}
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fff",
        minHeight: "100%"
      }}
    >
      <ProfileHeader userData={userData} />
      <ProfileInfoBlock userData={userData} />
      <ProfileActions userData={userData} />
    </Box>
  );
};

export default ProfileCard;
