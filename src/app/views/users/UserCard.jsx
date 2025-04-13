import { Card, Avatar, Typography, Stack, Box, IconButton, Tooltip } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material"; // 🆕 Import theme

const UserCard = ({ name, id, phone, location, roles, img }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme(); // 🆕 Theme hook for dark/light mode

  const handleViewClick = () => {
    console.log("Navigating to /staff-profile");
    navigate(`/staff-profile/${id}`);
  };

  return (
    <Card
      sx={{
        p: 0,
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        width: "100%",
        height: "140px",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.1)",
            zIndex: 1
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar / Image Section */}
      <Box
        sx={{
          width: "95px",
          minHeight: "100%",
          backgroundColor: theme.palette.mode === "dark" ? "#1e2a3a" : "#e0e0e0", // 🆕 Dark mode color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          zIndex: 2
        }}
      >
        {img ? (
          <Box
            component="img"
            src={img}
            alt={name}
            sx={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              objectFit: "cover",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: "50px",
              height: "45px",
              bgcolor: "#bdbdbd",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Box>

      {/* User Info Section */}
      <Box
        sx={{
          p: "10px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 2
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" fontSize="0.9rem" mb={0.5}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            ID: {id}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            Phone: {phone}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            {location}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={0.5}>
          {roles.map((role, idx) => (
            <Box
              key={idx}
              sx={{
                px: "6px",
                py: "1px",
                borderRadius: "3px",
                bgcolor: idx === 0 ? "#1976d2" : "#e0e0e0",
                color: idx === 0 ? "#fff" : "#424242",
                fontSize: "0.65rem",
                fontWeight: 500,
                mb: "2px"
              }}
            >
              {role}
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Hover Buttons */}
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 2,
            zIndex: 3
          }}
        >
          <Tooltip title="Edit" arrow>
            <IconButton
              size="medium"
              color="primary"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View" arrow>
            <IconButton
              size="medium"
              color="secondary"
              onClick={handleViewClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
};

export default UserCard;
