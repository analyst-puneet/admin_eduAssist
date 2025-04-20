import { Box, Grid, Typography, CircularProgress, Divider, Paper, useTheme } from "@mui/material";
import {
  Person,
  Phone,
  Badge,
  Business,
  Work,
  LocationOn,
  CreditCard,
  Security
} from "@mui/icons-material";
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
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper
      }}
    >
      {/* Personal Info */}
      <SectionTitle title="Personal Information" icon={<Person color="primary" />} />

      <Grid container spacing={3} mb={3}>
        <DetailItem icon={<Person />} label="Name" value={profileDetails?.name} />
        <DetailItem icon={<Phone />} label="Phone" value={profileDetails?.contact} />
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Professional Info */}
      <SectionTitle title="Professional Details" icon={<Work color="primary" />} />

      <Grid container spacing={3} mb={3}>
        <DetailItem icon={<Badge />} label="Employee ID" value={profileDetails?.empId} />
        <DetailItem icon={<Business />} label="Department" value={profileDetails?.department} />
        <DetailItem icon={<Work />} label="Designation" value={profileDetails?.designation} />
        <DetailItem icon={<LocationOn />} label="Location" value={profileDetails?.location} />
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Official Info */}
      <SectionTitle title="Official Information" icon={<Security color="primary" />} />

      <Grid container spacing={3}>
        <DetailItem icon={<CreditCard />} label="PAN Number" value={profileDetails?.PanNumber} />
        <DetailItem icon={<Security />} label="Roles" value={profileDetails?.roles?.join(", ")} />
      </Grid>
    </Paper>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: "action.hover",
        height: "100%",
        boxShadow: 1
      }}
    >
      <Box mt={0.5}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, wordBreak: "break-word" }}>
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

const SectionTitle = ({ title, icon }) => (
  <Box display="flex" alignItems="center" mb={2}>
    {icon}
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        color: "primary.main",
        ml: 1
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default ProfileTab;
