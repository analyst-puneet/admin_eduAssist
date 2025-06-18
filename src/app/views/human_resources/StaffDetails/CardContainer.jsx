import { Box, Grid, CircularProgress, Alert, Button } from "@mui/material";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../main";
const CardContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user_details`, {
          withCredentials: true
        });

        console.log("Full API response:", response); // Debugging log

        // Handle the API response structure
        let usersData = [];

        if (Array.isArray(response.data)) {
          usersData = response.data;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
          usersData = response.data.data;
        } else {
          throw new Error("API response doesn't contain valid users data");
        }

        console.log("Processed users data:", usersData); // Debugging log

        if (usersData.length === 0) {
          console.warn("API returned empty users array");
        }

        setUsers(usersData);
      } catch (err) {
        console.error("API Error Details:", {
          error: err,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.message || "Failed to fetch users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <Box mt={2} fontFamily="monospace">
          Check browser console for detailed error information
        </Box>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box mt={2}>
        <Alert severity="info">No users found in the system</Alert>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
            <UserCard
              name={user.full_name}
              id={user.user_id}
              phone={user.cantact_no_1}
              location={`${user.current_city}, ${user.current_state}`}
              roles={[user.designation_id || user.employee_type]}
              img={user.profile_photo_path}
              department={user.department_id}
              designation={user.designation_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;
