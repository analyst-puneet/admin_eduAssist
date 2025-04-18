import { Box, Grid, CircularProgress, Alert, Button } from "@mui/material";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";

const CardContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log("Full API response:", response); // Debugging log

        // Handle different possible response structures
        let usersData = [];

        if (Array.isArray(response.data)) {
          // Case 1: Response is directly an array
          usersData = response.data;
        } else if (response.data?.users && Array.isArray(response.data.users)) {
          // Case 2: Response has users property containing array
          usersData = response.data.users;
        } else if (response.data?.data?.users && Array.isArray(response.data.data.users)) {
          // Case 3: Nested response structure
          usersData = response.data.data.users;
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
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.empId}>
            <UserCard
              name={user.name}
              id={user.empId}
              phone={user.contact}
              location={user.location}
              roles={user.roles}
              img={user.img}
              department={user.department}
              designation={user.designation}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;
