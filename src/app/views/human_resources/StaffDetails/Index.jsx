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
import ListView from "./ListView";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [role, setRole] = useState("");
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleTabChange = (e, val) => setTab(val);

  return (
    <div style={{ margin: "30px" }}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Users", path: "/users" },
            { name: tab === 0 ? "Cards" : "Lists" }
          ]}
        />
      </Box>

      {/* SimpleCard with Add Staff Button Inside (Top-Right) */}
      <Box sx={{ position: "relative", marginTop: 2 }}>
        <SimpleCard
          title="Select Criteria"
          sx={{
            height: "auto",
            padding: 2,
            boxShadow: "none"
          }}
          elevation={0}
        >
          {/* Add Staff Button (Absolute Position Inside Card) */}
          <Button
            variant="contained"
            onClick={() => navigate("/human_resources/add-staff")}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: isDarkMode ? "green" : "secondary.main",
              color: isDarkMode ? "white" : "inherit",
              "&:hover": {
                backgroundColor: isDarkMode ? "#006400" : "secondary.dark"
              }
            }}
          >
            + Add Staff
          </Button>

          {/* Form Content */}
          <Stack spacing={2} mt={3}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
              <FormControl fullWidth sx={{ minWidth: 200 }} size="small">
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={handleRoleChange}
                  size="small"
                  sx={{
                    borderColor: isDarkMode ? "white" : "grey.500",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "grey.500"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "grey.700"
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "primary.main"
                    }
                  }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="faculty">Faculty</MenuItem>
                  <MenuItem value="librarian">Librarian</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ minWidth: 200 }} size="small">
                <TextField
                  label="Staff ID, Name, Role etc..."
                  fullWidth
                  size="small"
                  sx={{
                    borderColor: isDarkMode ? "white" : "grey.500",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "grey.500"
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "grey.700"
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDarkMode ? "white" : "primary.main"
                    }
                  }}
                />
              </FormControl>

              {/* Search Button */}
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  minWidth: "120px",
                  alignSelf: "center"
                }}
              >
                Search
              </Button>
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
