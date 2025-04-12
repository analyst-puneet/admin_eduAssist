import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Tabs,
  Tab
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";
import CardContainer from "./CardContainer";
import ListView from "./ListView"; // Import the new ListView component

const Index = () => {
  const [role, setRole] = useState("");
  const [tab, setTab] = useState(0);

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleTabChange = (e, val) => setTab(val);

  return (
    <div style={{ margin: "30px" }}>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Users", path: "/users" }, { name: "List" }]} />
      </Box>

      {/* SimpleCard with Add Staff Button Inside (Top-Right) */}
      <Box sx={{ position: "relative", marginTop: 2 }}>
        <SimpleCard
          title="Select Criteria"
          sx={{
            height: "auto",
            padding: 2
          }}
        >
          {/* Add Staff Button (Absolute Position Inside Card) */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              position: "absolute",
              top: 16,
              right: 16
            }}
          >
            + Add Staff
          </Button>

          {/* Form Content */}
          <Stack spacing={2} mt={3}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Role</InputLabel>
                <Select value={role} label="Role" onChange={handleRoleChange}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="librarian">Librarian</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <TextField label="Staff ID, Name, Role etc..." fullWidth />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained">Search</Button>
            </Stack>
          </Stack>
        </SimpleCard>
      </Box>

      <Box mt={3}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Card View" />
          <Tab label="List View" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {tab === 0 ? <CardContainer /> : <ListView />}
    </div>
  );
};

export default Index;
