import { memo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
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

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";

import { Span } from "app/components/Typography";
import { MatxMenu, MatxSearchBox } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: `${theme.palette.text.primary} !important`
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease"
});

const TopbarContainer = styled("div")(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.custom?.topbarBg || theme.palette.background.paper,

  color: theme.palette.text.primary, // 🔥 Force apply with priority

  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled("div")({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  "& span": {
    marginRight: "10px",
    color: theme.palette.text.primary
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
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex" alignItems="center" gap={1}>
          <StyledIconButton onClick={handleSidebarToggle} sx={{ paddingRight: 0 }}>
            <Menu />
          </StyledIconButton>
          <Box
            component="span"
            sx={{
              fontWeight: 600,
              fontSize: "1.1rem"
            }}
          >
            Shree Sita Ram Public School
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          <IconBox>
            <StyledIconButton>
              <MailOutline />
            </StyledIconButton>

            <StyledIconButton>
              <WebAsset />
            </StyledIconButton>

            <StyledIconButton
              onClick={() => {
                const newTheme = settings.activeTheme === "blue" ? "blueDark" : "blue";
                updateSettings({ activeTheme: newTheme });
              }}
            >
              {settings.activeTheme === "blueDark" ? <MdLightMode /> : <MdDarkMode />}
              {/* <MdDarkMode
                sx={{
                  color: `${theme.palette.text.primary} !important`
                }}
              /> */}
            </StyledIconButton>
          </IconBox>

          <NotificationProvider>{/* <NotificationBar /> */}</NotificationProvider>

          <MatxMenu
            menuButton={
              <UserMenu>
                <Span>
                  Hi <strong>{user.name}</strong>
                </Span>

                <Avatar
                  src={user.avatar}
                  sx={{
                    cursor: "pointer",
                    border: `2px`
                  }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span sx={{ marginInlineStart: 1 }}>Home</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Person />
                <Span sx={{ marginInlineStart: 1 }}>Profile</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Settings />
              <Span sx={{ marginInlineStart: 1 }}>Settings</Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <PowerSettingsNew />
              <Span sx={{ marginInlineStart: 1 }}>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
