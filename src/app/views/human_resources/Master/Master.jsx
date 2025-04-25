import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import LeaveGroup from "./LeaveGroup";
import ComplaintType from "./ComplaintType";
import Source from "./Source";
import Reference from "./Reference";
import RoleGroup from "./RoleGroup";

const modules = ["Leave Group","Role Group", "Complaint Type", "Source", "Reference"];

const moduleComponents = {
  "Leave Group": LeaveGroup,
  "Role Group":RoleGroup,
  "Complaint Type": ComplaintType,
  "Source": Source,
  "Reference": Reference,
};

export default function Master() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const [selectedModule, setSelectedModule] = useState("Leave Group");
  const [mobileOpen, setMobileOpen] = useState(false);

  const inputStyle = {
    "& .MuiInputBase-root": {
      height: "38px",
      fontSize: "0.875rem"
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
      fontSize: "0.875rem",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)"
      }
    },
    borderColor: isDarkMode ? "white" : "grey.500",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.500"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.700"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "primary.main"
    },
    margin: "0.25rem 0"
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 200 }}>
      <List>
        {modules.map((mod) => (
          <ListItemButton
            key={mod}
            selected={selectedModule === mod}
            onClick={() => {
              setSelectedModule(mod);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemText primary={mod} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const SelectedModuleComponent = moduleComponents[selectedModule];

  return (
    <Box p={isMobile ? 1 : 2}>
      {/* Top Bar */}
      <Box display="flex" alignItems="center" mb={3} flexWrap="wrap">
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
            <MenuIcon sx={{ color: isDarkMode ? "white" : "inherit" }} />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight="bold" mr={1}>
          Master
        </Typography>
        <Typography color="textSecondary" mx={1}>
          |
        </Typography>
        <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
          <HomeIcon color="primary" fontSize="small" />
        </Link>
        <ChevronRightIcon color="disabled" fontSize="small" />
        <Typography
          sx={{
            color: "text.secondary",
            borderBottom: "2px solid purple",
            fontWeight: 500
          }}
        >
          Master
        </Typography>
      </Box>

      <Box display="flex" height="100%">
        {!isMobile ? (
          <Box width="200px" mr={2}>
            {drawer}
          </Box>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 200 } }}
          >
            {drawer}
          </Drawer>
        )}

        <Box flex={1} sx={{ overflowX: "auto" }}>
          <SelectedModuleComponent 
            isMobile={isMobile} 
            isDarkMode={isDarkMode} 
            inputStyle={inputStyle} 
          />
        </Box>
      </Box>
    </Box>
  );
}