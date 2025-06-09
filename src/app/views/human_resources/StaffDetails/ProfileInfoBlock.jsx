import { Box, Typography, Divider } from "@mui/material";

const ProfileInfoBlock = ({ userData }) => {
  // Safely handle roles array (default to empty array if undefined)
  const roles = Array.isArray(userData?.roles) ? userData.roles : [];

  const profileData = [
    { label: "Staff ID", value: userData?.empId || "-" },
    { label: "Role", value: roles.join(", ") || "-" },
    { label: "Designation", value: userData?.designation || "-" },
    { label: "Department", value: userData?.department || "-" },
    { label: "Contact", value: userData?.contact || "-" },
    { label: "Location", value: userData?.location || "-" },
    { label: "PAN Number", value: userData?.PanNumber || "-" }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      {profileData.map((item, index) => (
        <Box key={index} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0.5
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight="500"
              sx={{
                minWidth: "120px",
                color: "text.secondary"
              }}
            >
              {item.label}
            </Typography>
            <Typography variant="body1" fontWeight="500">
              {item.value}
            </Typography>
          </Box>
          {index < profileData.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default ProfileInfoBlock;
