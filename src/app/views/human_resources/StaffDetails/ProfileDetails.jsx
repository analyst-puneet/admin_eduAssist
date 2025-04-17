import { Box, Tabs, Tab, Divider, CircularProgress } from "@mui/material";
import { useState } from "react";
import ProfileTab from "./ProfileTab";
import PayrollTab from "./StaffDetails/PayrollTab";
import LeavesTab from "./StaffDetails/LeavesTab";
import AttendanceTab from "./StaffDetails/AttendanceTab";
import DocumentsTab from "./StaffDetails/DocumentsTab";
import TimelineTab from "./TimelineTab";

const ProfileDetails = ({ userData }) => {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Tabs value={tab} onChange={handleChange}>
        <Tab label="Profile" />
        <Tab label="Payroll" />
        <Tab label="Leaves" />
        <Tab label="Attendance" />
        <Tab label="Documents" />
        <Tab label="Timeline" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Render active tab */}
      {tab === 0 && <ProfileTab userData={userData} />}
      {tab === 1 && <PayrollTab />}
      {tab === 2 && <LeavesTab />}
      {tab === 3 && <AttendanceTab />}
      {tab === 4 && <DocumentsTab />}
      {tab === 5 && <TimelineTab />}
    </Box>
  );
};

export default ProfileDetails;
