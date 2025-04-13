import { useState } from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useTheme, styled } from "@mui/material/styles";

const SearchWrapper = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center"
});

const SearchContainer = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  height: 36,
  background: open ? theme.palette.background.paper : "transparent",
  borderRadius: 20,
  padding: "0 8px",
  transition: "all 0.3s ease",
  overflow: "hidden",
  width: open ? 220 : 40,
  border: open ? `1px solid ${theme.palette.divider}` : "none"
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  paddingLeft: 10,
  fontSize: "0.95rem",
  "& input::placeholder": {
    color: theme.palette.text.secondary
  }
}));

export default function MatxSearchBox() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggle = () => setOpen(!open);

  return (
    <SearchWrapper>
      <SearchContainer open={open}>
        <IconButton
          onClick={toggle}
          size="small"
          disableRipple
          sx={{
            padding: 0,
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" }
          }}
        >
          <Icon sx={{ color: theme.palette.mode === "dark" ? "#ffffff" : "#838485" }}>
            {open ? "close" : "search"}
          </Icon>
        </IconButton>

        <StyledInput
          placeholder="Search..."
          sx={{
            width: open ? 160 : 0,
            opacity: open ? 1 : 0,
            transition: "width 0.3s ease, opacity 0.3s ease"
          }}
          autoFocus={open}
        />
      </SearchContainer>
    </SearchWrapper>
  );
}
