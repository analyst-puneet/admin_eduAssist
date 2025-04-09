import { IconButton, Icon, Typography, Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import styled from "@mui/material/styles/styled";
import navigation from "app/navigations";
import { useNavigate } from "react-router-dom";

const Overlay = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 64,
  left: "20.3%",
  width: "82%",
  height: "calc(100vh - 65.1px)", // subtract top offset
  zIndex: 1300,
  background: "#f0f2f5",
  padding: "24px",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    left: 0,
    width: "100%"
  }
}));

const ParentBox = styled("div")(() => ({
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "0.3s ease-in-out",
  height: "100%",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)"
  }
}));

const ParentHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
  fontWeight: 600,
  fontSize: "17px",
  color: "#2563eb"
}));

const ChildLink = styled("div")(() => ({
  padding: "6px 0",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  "&:hover": {
    color: "#1d4ed8"
  }
}));

export default function QuickLinks({ open, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!open) return null;

  const filteredNavs = navigation.filter(
    (item) => item.children && item.name !== "Dashboard" && item.name !== "Quick Links"
  );

  const handleLinkClick = (path) => (e) => {
    e.stopPropagation();
    navigate(path);
    onClose();
  };

  return (
    <Overlay onClick={(e) => e.stopPropagation()}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600} sx={{ color: "#2e3a59" }}>
          Quick Links
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Icon sx={{ color: "#2563eb" }}>close</Icon>
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {filteredNavs.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
            <ParentBox onClick={(e) => e.stopPropagation()}>
              <ParentHeader>
                <Icon fontSize="small" sx={{ color: "#2563eb" }}>
                  {item.icon}
                </Icon>
                <Typography variant="subtitle1">{item.name}</Typography>
              </ParentHeader>

              {item.children.map((child, childIdx) => (
                <ChildLink key={childIdx} onClick={handleLinkClick(child.path)}>
                  {child.icon ? (
                    <Icon fontSize="small" sx={{ color: "#2563eb" }}>
                      {child.icon}
                    </Icon>
                  ) : (
                    <Box
                      sx={{
                        fontSize: "11px",
                        width: "22px",
                        height: "22px",
                        backgroundColor: "#e0e7ff",
                        color: "#1e40af",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        flexShrink: 0
                      }}
                    >
                      {child.iconText}
                    </Box>
                  )}
                  <Typography variant="body2">{child.name}</Typography>
                </ChildLink>
              ))}
            </ParentBox>
          </Grid>
        ))}
      </Grid>
    </Overlay>
  );
}
