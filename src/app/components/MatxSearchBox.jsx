import { useState, Fragment } from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  borderRadius: "20px",
  padding: "0 8px",
  transition: "width 0.3s ease",
  overflow: "hidden"
}));

const SearchWrapper = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center"
});

const SearchInput = styled("input")(({ theme }) => ({
  width: 0,
  opacity: 0,
  border: "none",
  outline: "none",
  fontSize: "1rem",
  paddingLeft: "10px",
  height: "70%",
  background: "transparent",
  color: theme.palette.text.primary,
  transition: "width 0.3s ease, opacity 0.3s ease",
  "&::placeholder": {
    color: theme.palette.text.primary
  }
}));

export default function MatxSearchBox() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <SearchWrapper>
      <SearchContainer style={{ width: open ? 220 : 40 }}>
        <IconButton onClick={toggle} size="small">
          <Icon sx={{ color: "text.primary" }}>{open ? "close" : "search"}</Icon>
        </IconButton>
        <SearchInput
          type="text"
          placeholder="Search..."
          style={{
            width: open ? 160 : 0,
            opacity: open ? 1 : 0
          }}
          autoFocus={open}
        />
      </SearchContainer>
    </SearchWrapper>
  );
}
