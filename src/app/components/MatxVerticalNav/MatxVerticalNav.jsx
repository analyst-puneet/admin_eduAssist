import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";

import useSettings from "app/hooks/useSettings";
import { Span } from "../Typography";
import MatxVerticalNavExpansionPanel from "./MatxVerticalNavExpansionPanel";

// STYLED COMPONENTS
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
  fontWeight: 600,
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
      // Custom styled LABEL TYPE ITEM (like Quick Links)
      if (item.type === "label") {
        return (
          <ButtonBase
            key={index}
            onClick={item.onClick}
            sx={{
              ...ExtAndIntCommon,
              width: "100%",
              color: "text.secondary",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }
            }}
          >
            <Icon className="icon">{item.icon}</Icon>
            <StyledText mode={mode} className="sidenavHoverShow">
              {item.name}
            </StyledText>
            <Box mx="auto" />
          </ButtonBase>
        );
      }

      // Expandable parent item
      if (item.children) {
        return (
          <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
            {renderLevels(item.children)}
          </MatxVerticalNavExpansionPanel>
        );
      }

      // Internal link item
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
              <StyledText mode={mode} className="sidenavHoverShow" sx={{ fontWeight: 900 }}>
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
