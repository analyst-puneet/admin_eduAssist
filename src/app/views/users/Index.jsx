import {
  Box,
  styled,
  Stack,
  Grid,
  Card,
  Avatar,
  Typography,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Tab,
  Tabs
} from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useState } from "react";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const UserCard = ({ name, id, phone, location, roles, img }) => (
  <Card sx={{ p: 2 }}>
    <Stack spacing={1} alignItems="center">
      <Avatar src={img} sx={{ width: 70, height: 70 }} />
      <Typography fontWeight="bold">{name}</Typography>
      <Typography variant="body2">{id}</Typography>
      <Typography variant="body2">{phone}</Typography>
      <Typography variant="body2">{location}</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
        {roles.map((role, idx) => (
          <Box
            key={idx}
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: "#e0e0e0",
              fontSize: "12px"
            }}
          >
            {role}
          </Box>
        ))}
      </Stack>
    </Stack>
  </Card>
);

const Index = () => {
  const [role, setRole] = useState("");
  const [tab, setTab] = useState(0);

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleTabChange = (e, val) => setTab(val);

  const dummyData = [
    {
      name: "Joe Black",
      id: "9000",
      phone: "6546546545",
      location: "Ground Floor, Admin",
      roles: ["Super Admin", "Technical Head"],
      img: ""
    },
    {
      name: "Shivam Verma",
      id: "9002",
      phone: "9552654564",
      location: "1st Floor, Academic",
      roles: ["Teacher", "Faculty"],
      img: ""
    },
    {
      name: "Brandon Heart",
      id: "9006",
      phone: "345645654",
      location: "2nd Floor, Library",
      roles: ["Librarian", "Librarian"],
      img: ""
    },
    {
      name: "William Abbot",
      id: "9003",
      phone: "564564565",
      location: "Ground Floor, Admin",
      roles: ["Admin", "Principal"],
      img: ""
    }
    // ...add more dummy entries here
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Users", path: "/users" }, { name: "List" }]} />
      </Box>

      <SimpleCard title="Select Criteria">
        <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems="center">
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} label="Role" onChange={handleRoleChange}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="librarian">Librarian</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Search By Staff ID, Name, Role etc..." fullWidth />

          <Button variant="contained">Search</Button>
          <Button variant="contained" color="secondary">
            + Add Staff
          </Button>
        </Stack>

        <Box mt={3}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Card View" />
            <Tab label="List View" />
          </Tabs>
        </Box>
      </SimpleCard>

      {tab === 0 && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {dummyData.map((user, i) => (
              <Grid item xs={3} sm={3} md={3} lg={3} key={i}>
                <UserCard {...user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* tab === 1 ke liye list view baad mein bana denge if needed */}
    </Container>
  );
};

export default Index;
