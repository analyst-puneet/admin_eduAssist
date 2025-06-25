import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Store from "@mui/icons-material/Store";
import Group from "@mui/icons-material/Group";
import AttachMoney from "@mui/icons-material/AttachMoney";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& .icon": {
    opacity: 0.6,
    fontSize: "44px",
    color: theme.palette.primary.main
  }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.primary.main
}));

export default function StatCards() {
  const cardList = [
    { name: "New Leads", amount: 3050, Icon: Group },
    { name: "This week Sales", amount: "$80,500", Icon: AttachMoney },
    { name: "Inventory Status", amount: "8.5% Stock Surplus", Icon: Store },
    { name: "Orders to deliver", amount: "305 Orders", Icon: ShoppingCart }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name }) => (
        <Grid item md={6} xs={12} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="caption" color="textSecondary">
                  {name}
                </Typography>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <ArrowRightAlt sx={{ color: (theme) => theme.palette.text.primary }} />
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
