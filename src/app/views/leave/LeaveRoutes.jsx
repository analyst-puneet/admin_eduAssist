import { lazy } from "react";
import Loadable from "app/components/Loadable";

const LeaveIndex = Loadable(lazy(() => import("app/views/leave/LeaveIndex")));
const ApplyLeave = Loadable(lazy(() => import("app/views/leave/ApplyLeave")));

const leaveRoutes = [
  { path: "/staff/leave", element: <LeaveIndex /> },
  { path: "/apply", element: <ApplyLeave /> }
];
// const applyLeave = [{ path: "/apply", element: <ApplyLeave /> }];

export default leaveRoutes;
