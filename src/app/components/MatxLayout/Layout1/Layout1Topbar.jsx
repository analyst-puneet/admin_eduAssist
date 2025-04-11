import { memo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import WebAsset from "@mui/icons-material/WebAsset";
import MailOutline from "@mui/icons-material/MailOutline";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import styled from "@mui/material/styles/styled";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";

import { Span } from "app/components/Typography";
import { MatxMenu, MatxSearchBox } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";

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
  justifyContent: "center",
  minWidth: 0,
  padding: "6px 12px",
  "& a, & div": {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary
  },
  "& span": {
    marginLeft: "6px"
  },
  "& svg": {
    fontSize: "18px"
  }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
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

        <Box display="flex" alignItems="center" sx={{ marginRight: 2 }}>
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
            <MatxMenu
              menuButton={
                <UserMenu>
                  <Avatar
                    src={user.avatar}
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
              {/* User Info Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  minWidth: "240px",
                  minHeight: "80px"
                }}
              >
                <Avatar
                  src={user.avatar}
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

              {/* Menu Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 12px",
                  minWidth: "240px",
                  gap: 1
                }}
              >
                <StyledItem>
                  <Link to="/page-layouts/user-profile">
                    <Person fontSize="small" />
                    <Span>Profile</Span>
                  </Link>
                </StyledItem>

                <StyledItem>
                  <Link to="/page-layouts/change-password">
                    <Settings fontSize="small" />
                    <Span>Password</Span>
                  </Link>
                </StyledItem>

                <StyledItem onClick={logout}>
                  <Box display="flex" alignItems="center">
                    
                      <PowerSettingsNew fontSize="small" />
                      <Span>Logout</Span>
                    
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
