import { Box, Grid } from "@mui/material";
import UserCard from "./UserCard"; // Importing UserCard component

// Dummy data (yeh data user card ke liye use hoga)
const dummyData = [
  {
    name: "Joe Black",
    id: "9000",
    phone: "6546546545",
    location: "Ground Floor, Admin",
    roles: ["Super Admin", "Technical Head"],
    img: "/assets/images/faces/2.jpg"
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
];

const CardContainer = () => {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        {/* dummyData mein jitne users hain unhe iterate karenge */}
        {dummyData.map((user, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            {/* Har user ke data ko UserCard ko pass kar rahe hain */}
            <UserCard {...user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;
