import { Box, Grid, Button, CircularProgress, Alert, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import ProfileDetails from "./ProfileDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StaffProfile = () => {
  const theme = useTheme();
  const { empId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!empId) {
          throw new Error("No employee ID provided in URL");
        }

        const response = await axios.get(`http://localhost:3000/users`);
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
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [empId]);

  const handleBack = () => {
    navigate("/human_resources/staff-details");
  };

  // Back button styling
  const backButtonStyle = {
    borderRadius: "8px",
    padding: "8px 16px",
    textTransform: "none",
    fontWeight: 600,
    boxShadow: theme.shadows[1],
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[3],
      transform: "translateY(-1px)"
    },
    "& .MuiButton-startIcon": {
      marginRight: "6px"
    }
  };

  if (loading) {
    return (
      <Box p={2} display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={handleBack}
          // startIcon={<ArrowBackIcon />}
          sx={backButtonStyle}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box p={2}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          No user data available
        </Alert>
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={backButtonStyle}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          // startIcon={<ArrowBackIcon />}
          sx={backButtonStyle}
        >
          BACK
        </Button>
      </Box>

      <Grid container spacing={3}>
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
