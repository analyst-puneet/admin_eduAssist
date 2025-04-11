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

const ParentBox = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "16px",
  padding: "20px",
  boxShadow: theme.shadows[1],
  transition: "0.3s ease-in-out",
  height: "100%",
  "&:hover": {
    boxShadow: theme.shadows[4]
  }
}));

const ParentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
  fontWeight: 600,
  fontSize: "17px",
  color: theme.palette.primary.main
}));

const ChildLink = styled("div")(({ theme }) => ({
  padding: "6px 0",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  "&:hover": {
    color: theme.palette.primary.main
  }
}));

export default function QuickLinks() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { settings } = useSettings();

  const filteredNavs = navigation.filter(
    (item) => item.children && item.name !== "Dashboard" && item.name !== "Quick Links"
  );

  const handleLinkClick = (path) => () => {
    navigate(path);
  };

  const iconColor = settings.activeTheme === "blueDark" ? "#fff" : theme.palette.text.primary;

  return (
    <Container>
      <Box className="header">
        <Typography variant="h5" fontWeight={600} sx={{ color: iconColor }}>
          Quick Links
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <Icon sx={{ color: theme.palette.primary.main }}>close</Icon>
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
                    <Icon fontSize="small" sx={{ color: theme.palette.primary.main }}>
                      {child.icon}
                    </Icon>
                  ) : (
                    <Box
                      sx={{
                        fontSize: "11px",
                        width: "22px",
                        height: "22px",
                        backgroundColor: theme.palette.primary.light,
                        color: iconColor,
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
