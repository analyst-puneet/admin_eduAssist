import { Box, Grid, Typography, CircularProgress, Divider, Paper, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const ProfileTab = ({ userData }) => {
  const theme = useTheme();
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProfileDetails(userData);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper
      }}
    >
      {/* Personal Information Section */}
      <Box mb={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
            mb: 3
          }}
        >
          Personal Information
        </Typography>
        <Grid container spacing={3}>
          <DetailItem label="Name" value={profileDetails?.name} />
          <DetailItem label="Phone" value={profileDetails?.contact} />
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Professional Details Section */}
      <Box mb={4}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
            mb: 3
          }}
        >
          Professional Details
        </Typography>
        <Grid container spacing={3}>
          <DetailItem label="Employee ID" value={profileDetails?.empId} />
          <DetailItem label="Department" value={profileDetails?.department} />
          <DetailItem label="Designation" value={profileDetails?.designation} />
          <DetailItem label="Location" value={profileDetails?.location} />
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Official Information Section */}
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "primary.main",
            mb: 3
          }}
        >
          Official Information
        </Typography>
        <Grid container spacing={3}>
          <DetailItem label="PAN Number" value={profileDetails?.PanNumber} />
          <DetailItem label="Roles" value={profileDetails?.roles?.join(", ")} />
        </Grid>
      </Box>
    </Paper>
  );
};

const DetailItem = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderRadius: 1,
        backgroundColor: "action.hover" // This gives the gray background
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 500,
          color: "text.secondary",
          mb: 1
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          wordBreak: "break-word"
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  </Grid>
);

export default ProfileTab;
