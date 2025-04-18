import { memo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import WebAsset from "@mui/icons-material/WebAsset";
import MailOutline from "@mui/icons-material/MailOutline";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import CheckCircle from "@mui/icons-material/CheckCircle";
import axios from "axios"
import styled from "@mui/material/styles/styled";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";

import { Span } from "app/components/Typography";
import { MatxMenu, MatxSearchBox } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";
import { BASE_URL } from "../../../../main";
// STYLED COMPONENTS
const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled("div")(({ theme }) => ({
  padding: "8px 20px 8px 18px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.custom?.topbarBg || theme.palette.background.paper,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled("div")(({ theme }) => ({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": {
    margin: "0 8px",
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary
  }
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary
  },
  "& span": {
    marginRight: "10px"
  },
  "& svg": {
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary
  }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const UserInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginRight: "16px",
  textAlign: "right",
  "& .name": {
    fontWeight: "bold",
    fontSize: "14px"
  },
  "& .role": {
    fontSize: "12px",
    color: "#666"
  }
});

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const {  user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };
  const logout = async () => {
    try {
        await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
        window.location.href = '/login';
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
  const handleSidebarToggle = () => {
    const { layout1Settings } = settings;
    const isClosed = layout1Settings.leftSidebar.mode === "close";
    const mode = isMdScreen
      ? isClosed
        ? "mobile"
        : "close"
      : layout1Settings.leftSidebar.mode === "full"
      ? "close"
      : "full";
    updateSidebarMode({ mode });
  };

  const toggleTheme = () => {
    const newTheme = settings.activeTheme === "blueDark" ? "blue" : "blueDark";
    updateSettings({ activeTheme: newTheme });
  };

  const isDark = settings.activeTheme === "blueDark";

  const iconColor = isDark ? "#fff" : theme.palette.text.primary;

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleSidebarToggle} sx={{ color: iconColor }}>
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: iconColor
            }}
          >
            Shree Sita Ram Public School
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          <IconBox>
            <IconButton sx={{ color: iconColor }}>
              <MailOutline />
            </IconButton>

            <IconButton sx={{ color: iconColor }}>
              <WebAsset />
            </IconButton>

            <IconButton onClick={toggleTheme} sx={{ color: iconColor }}>
              {isDark ? <MdLightMode /> : <MdDarkMode />}
            </IconButton>
          </IconBox>

          <NotificationProvider>{/* <NotificationBar /> */}</NotificationProvider>

          <Box display="flex" alignItems="center" sx={{ marginLeft: 2 }}>
            {/* <CheckCircle sx={{ color: iconColor, marginRight: 1 }} />
            <UserInfo>
              <Typography className="name">Joe Black</Typography>
              <Typography className="role">Super Admin</Typography>
            </UserInfo> */}

            <MatxMenu
              menuButton={
                <UserMenu>
              <Avatar
                src={user?.avatar || ""}
                sx={{
                  cursor: "pointer",
                  border: `2px solid ${theme.palette.divider}`,
                  width: 40,
                  height: 40
                }}
              />
                </UserMenu>
              }
            >
              {/* User Info Section - Made more rectangular but narrower */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px", // Reduced vertical padding
                  minWidth: "240px", // Reduced from 300px
                  minHeight: "80px" // Kept same height
                }}
              >
              <Avatar
                src={user?.avatar || ""}
                sx={{
                  width: 60,
                  height: 60,
                  marginRight: "16px"
                }}
              />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Joe Black
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Super Admin
                  </Typography>
                </Box>
              </Box>

              {/* Divider */}
              <hr
                style={{
                  margin: 0,
                  border: "none",
                  height: "1px",
                  backgroundColor: theme.palette.divider
                }}
              />

              {/* Horizontal Menu Items - Adjusted for narrower width */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "8px 0",
                  flexWrap: "wrap" // Allows items to wrap if needed
                }}
              >
                <StyledItem
                  sx={{
                    flex: "1 0 auto",
                    justifyContent: "center",
                    minWidth: "70px" // Minimum width for each item
                  }}
                >
                  <Link to="/page-layouts/user-profile" style={{ flexDirection: "column" }}>
                    <Person fontSize="small" />
                    <Span sx={{ marginInlineStart: 0, marginTop: "4px" }}>Profile</Span>
                  </Link>
                </StyledItem>

                <StyledItem
                  sx={{
                    flex: "1 0 auto",
                    justifyContent: "center",
                    minWidth: "70px"
                  }}
                >
                  <Link to="/page-layouts/change-password" style={{ flexDirection: "column" }}>
                    <Settings fontSize="small" />
                    <Span sx={{ marginInlineStart: 0, marginTop: "4px" }}>Password</Span>
                  </Link>
                </StyledItem>

                <StyledItem
                  onClick={logout}
                  sx={{
                    flex: "1 0 auto",
                    justifyContent: "center",
                    minWidth: "70px"
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <PowerSettingsNew fontSize="small" />
                    <Span sx={{ marginInlineStart: 0, marginTop: "4px" }}>Logout</Span>
                  </Box>
                </StyledItem>
              </Box>
            </MatxMenu>
          </Box>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
