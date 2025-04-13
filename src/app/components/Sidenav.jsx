import { Fragment, useEffect, useRef, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import styled from "@mui/material/styles/styled";
import { MatxVerticalNav } from "app/components";
import useSettings from "app/hooks/useSettings";
import navigations from "app/navigations";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
  height: "100%",
  overflowY: "auto"
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

const StickyContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease",
  zIndex: 10,
  "&.sticky": {
    position: "sticky",
    top: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: "6px",
    paddingBottom: "6px"
  }
}));

export default function Sidenav({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const { settings, updateSettings } = useSettings();
  const quickRef = useRef();

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

  const quickLinkNav = navigations.find((nav) => nav.name === "Quick Links");
  const restNavs = navigations.filter(
    (nav) => nav.name !== "Quick Links" && nav.name !== "Dashboard"
  );
  const dashboardNav = navigations.find((nav) => nav.name === "Dashboard");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );

    if (quickRef.current) {
      observer.observe(quickRef.current);
    }

    return () => {
      if (quickRef.current) observer.unobserve(quickRef.current);
    };
  }, []);

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}

        {/* Invisible marker for sticky detection */}
        <div ref={quickRef} />

        {/* Sticky Quick Links at top */}
        {quickLinkNav && (
          <StickyContainer className={isSticky ? "sticky" : ""}>
            <MatxVerticalNav items={[quickLinkNav]} />
          </StickyContainer>
        )}

        {/* Dashboard just after Quick Links */}
        {dashboardNav && <MatxVerticalNav items={[dashboardNav]} />}

        {/* Baaki sab nav items */}
        <MatxVerticalNav items={restNavs} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
}
