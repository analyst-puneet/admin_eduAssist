import { lazy } from "react";
import Loadable from "app/components/Loadable";

const StaffDetails = Loadable(lazy(() => import("app/views/human_resources/StaffDetails/Index")));
const StaffProfileIndex = Loadable(
  lazy(() => import("app/views/human_resources/StaffDetails/StaffProfile"))
);
const AddUser = Loadable(lazy(() => import("app/views/human_resources/StaffDetails/AddStaff")));
const StaffAttendance = Loadable(
  lazy(() => import("app/views/human_resources/StaffAttendance/StaffAttendance"))
);
const MarkAttendance = Loadable(
  lazy(() => import("app/views/human_resources/StaffAttendance/MarkAttendance"))
);
const LeaveIndex = Loadable(lazy(() => import("app/views/human_resources/StaffLeave/LeaveIndex")));
const ApplyLeave = Loadable(lazy(() => import("app/views/human_resources/StaffLeave/ApplyLeave")));

const humanResourceRoutes = [
  { path: "/human_resources/staff-details", element: <StaffDetails /> },
  { path: "/human_resources/add-staff", element: <AddUser /> },
  { path: "/human_resources/staff-profile/:empId", element: <StaffProfileIndex /> },
  { path: "/human_resources/staff-attendance", element: <StaffAttendance /> },
  { path: "/human_resources/staff/mark-attendance", element: <MarkAttendance /> },
  { path: "/human_resources/staff-leave", element: <LeaveIndex /> },
  { path: "/apply", element: <ApplyLeave /> }
];

export default humanResourceRoutes;
