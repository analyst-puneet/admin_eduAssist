import { Box, Grid, Button, CircularProgress, Alert, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import ProfileDetails from "./ProfileDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "app/views/material-kit/buttons/BackButton";

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

        // Using the real API endpoint
        const response = await axios.get(`https://backend-aufx.onrender.com/api/user_details`);

        // Handle different possible response structures
        let usersData = [];
        if (Array.isArray(response.data)) {
          usersData = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          usersData = response.data.data;
        } else {
          throw new Error("Invalid API response format");
        }

        // Find user by employee_code (since empId in URL is employee_code)
        const foundUser = usersData.find((user) => user.employee_code === empId);

        if (!foundUser) {
          throw new Error(`User with ID ${empId} not found`);
        }

        // Map API data to expected format
        const mappedUserData = {
          empId: foundUser.employee_code,
          userId: foundUser.user_id,
          name:
            foundUser.full_name ||
            `${foundUser.first_name} ${foundUser.middle_name || ""} ${
              foundUser.last_name || ""
            }`.trim(),
          contact: foundUser.cantact_no_1,
          altContact: foundUser.cantact_no_2,
          email: foundUser.email,
          altEmail: foundUser.alt_email,
          gender: foundUser.gender,
          dob: foundUser.dob,
          bloodGroup: foundUser.blood_group,
          designation: foundUser.designation_id,
          department: foundUser.department_id,
          employeeType: foundUser.employee_type,
          dateOfJoining: foundUser.date_of_joining,
          status: foundUser.status === "true" ? "Active" : "Inactive",
          currentAddress: `${foundUser.current_address}, ${foundUser.current_city}, ${foundUser.current_state}, ${foundUser.current_country} - ${foundUser.current_pincode}`,
          permanentAddress: `${foundUser.permanent_address}, ${foundUser.permanent_city}, ${foundUser.permanent_state}, ${foundUser.permanent_country} - ${foundUser.permanent_pincode}`,
          maritalStatus: foundUser.marital_status,
          spouseName: foundUser.spouse_name,
          noOfChildren: foundUser.no_of_children,
          fatherName: foundUser.father_name,
          motherName: foundUser.mother_name,
          guardianName: foundUser.guardian_name,
          bankName: foundUser.bank_name,
          bankAccNo: foundUser.bank_acc_no,
          ifscCode: foundUser.ifsc_code,
          profilePhoto: foundUser.profile_photo_path
          // Add more fields as needed
        };

        setUserData(mappedUserData);
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
    navigate("/human_resources/staff-details");
  };

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
        <Button variant="contained" onClick={handleBack} sx={backButtonStyle}>
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
      <Box mb={2} mt={2} display="flex" justifyContent="flex-end">
        <BackButton onClick={handleBack} />
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
