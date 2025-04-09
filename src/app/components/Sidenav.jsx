// src/app/components/Sidenav.jsx
import { Fragment, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import styled from "@mui/material/styles/styled";

import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import navigations from "app/navigations";
import QuickLinks from "./QuickLinks"; // 👈 import it

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative"
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  [theme.breakpoints.up("lg")]: { display: "none" }
}));

export default function Sidenav({ children }) {
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: { ...activeLayoutSettings.leftSidebar, ...sidebarSettings }
      }
    });
  };

  // src/app/components/Sidenav.jsx
  const customNavs = navigations.map((nav) => {
    if (nav.name === "Quick Links") {
      return {
        ...nav,
        type: "label",
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowQuickLinks(true);
        }
      };
    }
    return nav;
  });

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={customNavs} />
      </StyledScrollBar>

      {!showQuickLinks && <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />}

      <QuickLinks open={showQuickLinks} onClose={() => setShowQuickLinks(false)} />
    </Fragment>
  );
}
