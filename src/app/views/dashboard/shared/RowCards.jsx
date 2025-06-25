import { Fragment } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MoreVert from "@mui/icons-material/MoreVert";
import DateRange from "@mui/icons-material/DateRange";
import StarOutline from "@mui/icons-material/StarOutline";
import format from "date-fns/format";
import { Span } from "app/components/Typography"; // if Span is a styled 'span'

const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: "500",
  [theme.breakpoints.down("sm")]: { marginLeft: 4 }
}));

const StyledFabStar = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: "none",
  background: "#08ad6c !important",
  [theme.breakpoints.down("sm")]: { display: "none" }
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: "none",
  color: "white !important",
  background: `${theme.palette.error.main} !important`,
  [theme.breakpoints.down("sm")]: { display: "none" }
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
  border: "2px solid #fff",
  boxShadow: "0 0 3px rgba(0,0,0,0.2)"
}));

export default function RowCards() {
  return [1, 2, 3, 4].map((id) => (
    <Fragment key={id}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              <Checkbox />

              {id % 2 === 1 ? (
                <StyledFabStar size="small">
                  <StarOutline />
                </StyledFabStar>
              ) : (
                <StyledFab size="small">
                  <DateRange />
                </StyledFab>
              )}

              <ProjectName>Project {id}</ProjectName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box sx={{ color: "text.secondary" }}>
              {format(new Date().getTime(), "MM/dd/yyyy hh:mma")}
            </Box>
          </Grid>

          <Grid item md={3} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box display="flex" position="relative" sx={{ ml: "-14px" }}>
              <StyledAvatar src="/assets/images/face-4.jpg" sx={{ ml: "14px" }} />
              <StyledAvatar src="/assets/images/face-4.jpg" sx={{ ml: "-10px" }} />
              <StyledAvatar src="/assets/images/face-4.jpg" sx={{ ml: "-10px" }} />
              <StyledAvatar sx={{ fontSize: "14px", ml: "-10px" }}>+3</StyledAvatar>
            </Box>
          </Grid>

          <Grid item md={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Box py={1} />
    </Fragment>
  ));
}
