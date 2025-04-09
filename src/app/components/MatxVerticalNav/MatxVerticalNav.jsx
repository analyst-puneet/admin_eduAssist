import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";

import useSettings from "app/hooks/useSettings";
import { Paragraph, Span } from "../Typography";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";

// STYLED COMPONENTS
const ListLabel = styled(Paragraph)(({ theme, mode }) => ({
  fontSize: "12px",
  marginTop: "20px",
  marginLeft: "15px",
  marginBottom: "10px",
  textTransform: "uppercase",
  display: mode === "compact" && "none",
  color: theme.palette.text.secondary
}));

const ExtAndIntCommon = {
  display: "flex",
  overflow: "hidden",
  borderRadius: "4px",
  height: 44,
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none",
  justifyContent: "space-between",
  transition: "all 150ms ease-in",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "&.compactNavItem": {
    overflow: "hidden",
    justifyContent: "center !important"
  },
  "& .icon": {
    fontSize: "18px",
    paddingLeft: "16px",
    paddingRight: "16px",
    verticalAlign: "middle"
  }
};

const ExternalLink = styled("a")(({ theme }) => ({
  ...ExtAndIntCommon,
  color: theme.palette.text.primary
}));

const InternalLink = styled(Box)(({ theme }) => ({
  "& a": {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary
  },
  "& .navItemActive": {
    backgroundColor: "rgba(255, 255, 255, 0.16)"
  }
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  display: mode === "compact" && "none"
}));

const BulletIcon = styled("div")(({ theme }) => ({
  padding: "2px",
  marginLeft: "24px",
  marginRight: "8px",
  overflow: "hidden",
  borderRadius: "300px",
  background: theme.palette.text.primary
}));

const BadgeValue = styled("div")(() => ({
  padding: "1px 8px",
  overflow: "hidden",
  borderRadius: "300px"
}));

export default function MatxVerticalNav({ items }) {
  const { settings } = useSettings();
  const { mode } = settings.layout1Settings.leftSidebar;

  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === "label") {
        return (
          <Box
            key={index}
            onClick={item.onClick}
            sx={{
              px: 2,
              py: 1,
              cursor: "pointer",
              color: "text.secondary",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "action.hover"
              }
            }}
          >
            <Icon fontSize="small">{item.icon}</Icon>
            <span>{item.name}</span>
          </Box>
        );
      }

      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      }

      return (
        <InternalLink key={index}>
          {item.onClick ? (
            <ButtonBase onClick={item.onClick} sx={{ width: "100%" }}>
              {item.icon ? (
                <Icon className="icon" sx={{ width: 36 }}>
                  {item.icon}
                </Icon>
              ) : (
                <Fragment>
                  <BulletIcon sx={{ display: mode === "compact" && "none" }} />
                  <Box
                    sx={{
                      ml: "20px",
                      fontSize: "11px",
                      display: mode !== "compact" && "none"
                    }}
                  >
                    {item.iconText}
                  </Box>
                </Fragment>
              )}
              <StyledText mode={mode} className="sidenavHoverShow">
                {item.name}
              </StyledText>
              <Box mx="auto" />
              {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
            </ButtonBase>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `navItemActive ${mode === "compact" && "compactNavItem"}`
                  : `${mode === "compact" && "compactNavItem"}`
              }
            >
              <ButtonBase sx={{ width: "100%" }}>
                {item.icon ? (
                  <Icon className="icon" sx={{ width: 36 }}>
                    {item.icon}
                  </Icon>
                ) : (
                  <Fragment>
                    <BulletIcon sx={{ display: mode === "compact" && "none" }} />
                    <Box
                      sx={{
                        ml: "20px",
                        fontSize: "11px",
                        display: mode !== "compact" && "none"
                      }}
                    >
                      {item.iconText}
                    </Box>
                  </Fragment>
                )}
                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </StyledText>
                <Box mx="auto" />
                {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
              </ButtonBase>
            </NavLink>
          )}
        </InternalLink>
      );
    });
  };

  return <div className="navigation">{renderLevels(items)}</div>;
}
