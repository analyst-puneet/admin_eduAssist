import { Box, useTheme, Paper } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoBlock from "./ProfileInfoBlock";
import ProfileActions from "./ProfileActions";

const ProfileCard = ({ userData }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        minHeight: "100%",
        color: theme.palette.text.primary,
        border: `1px solid ${isDarkMode ? theme.palette.divider : "#e0e0e0"}`,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
      }}
    >
      <ProfileHeader userData={userData} />
      <ProfileInfoBlock userData={userData} />
      <ProfileActions />
    </Paper>
  );
};

export default ProfileCard;
