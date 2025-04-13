import { Box, Grid, Typography, CircularProgress, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileTab = ({ userData }) => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use existing userData since all fields are already in your API
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
    return <CircularProgress />;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DetailItem label="Name" value={profileDetails?.name} />
          <DetailItem label="Phone" value={profileDetails?.contact} />
          <DetailItem label="Department" value={profileDetails?.department} />
          <DetailItem label="Designation" value={profileDetails?.designation} />
          <DetailItem label="Location" value={profileDetails?.location} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DetailItem label="Employee ID" value={profileDetails?.empId} />
          <DetailItem label="PAN Number" value={profileDetails?.PanNumber} />
          <DetailItem label="Roles" value={profileDetails?.roles?.join(", ")} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Add more sections if needed */}
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <Box mb={2}>
    <Typography fontWeight="bold">{label}</Typography>
    <Typography>{value || "-"}</Typography>
  </Box>
);

export default ProfileTab;
