import { Box, Typography, Divider } from "@mui/material";

const ProfileInfoBlock = ({ userData }) => {
  const profileData = [
    { label: "Staff ID", value: userData.empId },
    { label: "Role", value: userData.roles.join(", ") },
    { label: "Designation", value: userData.designation },
    { label: "Department", value: userData.department },
    { label: "Contact", value: userData.contact },
    { label: "Location", value: userData.location },
    { label: "PAN Number", value: userData.PanNumber }
  ];

  return (
    <Box>
      {profileData.map((item, index) => (
        <Box key={index} mb={1}>
          <Typography fontWeight="bold" variant="body2">
            {item.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.value}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default ProfileInfoBlock;
