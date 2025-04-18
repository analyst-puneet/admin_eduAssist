import { Card, Avatar, Typography, Stack, Box, IconButton, Tooltip, Chip } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const UserCard = ({ name, id, phone, location, roles, img }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleViewClick = () => {
    navigate(`/human_resources/staff-profile/${id}`);
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "auto",
        minHeight: "220px",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
          "& .hover-buttons": {
            opacity: 1
          }
        },
        [theme.breakpoints.down("sm")]: {
          minHeight: "180px",
          p: 1.5
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Buttons - New Position */}
      <Box
        className="hover-buttons"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          display: "flex",
          gap: 1,
          zIndex: 3,
          opacity: 0,
          transition: "opacity 0.2s ease"
        }}
      >
        <Tooltip title="Edit" arrow>
          <IconButton
            size="small"
            color="primary"
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "white"
              }
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View" arrow>
          <IconButton
            size="small"
            color="secondary"
            onClick={handleViewClick}
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "white"
              }
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Avatar Section - Centered */}
      <Box
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: theme.palette.mode === "dark" ? "#1e2a3a" : "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          mb: 2,
          border: `2px solid ${theme.palette.primary.light}`,
          [theme.breakpoints.down("sm")]: {
            width: "64px",
            height: "64px",
            mb: 1.5
          }
        }}
      >
        {img ? (
          <Box
            component="img"
            src={img}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: theme.palette.primary.main,
              fontSize: "32px",
              fontWeight: "bold",
              color: "white"
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Box>

      {/* User Info Section - Centered */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 1.5,
          [theme.breakpoints.down("sm")]: {
            mb: 1
          }
        }}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          fontSize="1.1rem"
          noWrap
          sx={{
            mb: 0.5,
            [theme.breakpoints.down("sm")]: {
              fontSize: "1rem"
            }
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          fontSize="0.75rem"
          noWrap
          sx={{ mb: 0.5 }}
        >
          ID: {id}
        </Typography>

        <Typography variant="body2" color="text.secondary" fontSize="0.75rem" noWrap>
          {phone}
        </Typography>
      </Box>

      {/* Location & Roles Section */}
      <Box sx={{ width: "100%", mt: "auto" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 1,
            fontSize: "0.7rem"
          }}
        >
          {location}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ gap: "6px" }}
        >
          {roles.map((role, idx) => (
            <Chip
              key={idx}
              label={role}
              size="small"
              sx={{
                height: "24px",
                fontSize: "0.6rem",
                fontWeight: 500,
                backgroundColor: idx === 0 ? theme.palette.primary.light : theme.palette.grey[200],
                color: theme.palette.getContrastText(
                  idx === 0 ? theme.palette.primary.light : theme.palette.grey[200]
                ),

                "& .MuiChip-label": {
                  px: 1,
                  py: 0.25
                }
              }}
            />
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

export default UserCard;
