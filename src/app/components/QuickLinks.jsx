import { IconButton, Icon, Typography, Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import styled from "@mui/material/styles/styled";
import navigation from "app/navigations";
import { useNavigate } from "react-router-dom";
import useSettings from "app/hooks/useSettings";

// Styled Container like AppForm.jsx
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .header": {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
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

export default function QuickLinks() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { settings } = useSettings(); // ✅ FIXED HERE

  const filteredNavs = navigation.filter(
    (item) => item.children && item.name !== "Dashboard" && item.name !== "Quick Links"
  );

  const handleLinkClick = (path) => () => {
    navigate(path);
  };

  const isDark = settings.activeTheme === "blueDark";
  const iconColor = isDark ? "#fff" : theme.palette.text.primary;

  return (
    <Container>
      <Box className="header">
        <Typography variant="h5" fontWeight={600} sx={{ color: iconColor }}>
          Quick Links
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <Icon sx={{ color: "#2563eb" }}>close</Icon>
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {filteredNavs.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <ParentBox>
              <ParentHeader>
                <Icon fontSize="small" sx={{ color: iconColor }}>
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
    </Container>
  );
}
