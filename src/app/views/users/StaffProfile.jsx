import { Box, Grid, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import ProfileDetails from "./ProfileDetails";

const StaffProfile = () => {
  const { empId } = useParams(); // Using empId to match route parameter
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Extracted empId from URL:", empId); // Debugging

    const fetchUserData = async () => {
      try {
        if (!empId) {
          throw new Error("No employee ID provided in URL");
        }

        const response = await axios.get(`http://localhost:3000/users`);
        console.log("API Response:", response.data);

        // Handle API response format (array or object with users array)
        const usersData = Array.isArray(response.data) ? response.data : response.data?.users || [];

        if (!Array.isArray(usersData)) {
          throw new Error("Invalid API response format");
        }

        const foundUser = usersData.find((user) => user.empId === empId);

        if (!foundUser) {
          throw new Error(`User with ID ${empId} not found`);
        }

        setUserData(foundUser);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [empId]);

  const handleBack = () => {
    navigate("/users");
  };

  if (loading) {
    return (
      <Box p={2} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box p={2}>
        <Alert severity="warning">No user data available</Alert>
        <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Users
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box mb={2}>
        <Button variant="outlined" color="primary" onClick={handleBack}>
          ← Back
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ProfileCard userData={userData} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileDetails userData={userData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffProfile;
