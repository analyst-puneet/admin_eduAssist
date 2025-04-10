import { useState } from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material/styles"; // ✅ Import theme hook
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: 36,
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
  height: "100%",
  background: "transparent",
  color: theme.palette.text.primary,
  transition: "width 0.3s ease, opacity 0.3s ease",
  "&::placeholder": {
    color: theme.palette.text.primary
  }
}));

export default function MatxSearchBox() {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // ✅ Use theme hook here

  const toggle = () => setOpen(!open);

  return (
    <SearchWrapper>
      <SearchContainer
        style={{
          width: open ? 220 : 40,
          border: `1px solid ${open ? theme.palette.grey[600] : "transparent"}`
        }}
      >
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
