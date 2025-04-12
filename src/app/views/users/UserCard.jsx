import { Card, Avatar, Typography, Stack, Box } from "@mui/material";

const UserCard = ({ name, id, phone, location, roles, img }) => (
  <Card
    sx={{
      p: 0,
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      width: "100%",
      height: "140px",
      overflow: "hidden"
    }}
  >
    {/* Left Side - Image/Avatar Container */}
    <Box
      sx={{
        width: "95px",
        minHeight: "100%",
        backgroundColor: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {img ? (
        <Box
          component="img"
          src={img}
          alt={name}
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "contain"
          }}
        />
      ) : (
        <Avatar
          sx={{
            width: "45px",
            height: "45px",
            bgcolor: "#bdbdbd",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          {name.charAt(0)}
        </Avatar>
      )}
    </Box>

    {/* Right Side - User Details */}
    <Box
      sx={{
        p: "10px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            mb: "2px",
            lineHeight: 1.2
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#616161",
            fontSize: "0.75rem",
            mb: "2px",
            lineHeight: 1.2
          }}
        >
          ID: {id}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#616161",
            fontSize: "0.75rem",
            mb: "2px",
            lineHeight: 1.2
          }}
        >
          Phone: {phone}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#616161",
            fontSize: "0.75rem",
            lineHeight: 1.2
          }}
        >
          {location}
        </Typography>
      </Box>

      <Box sx={{ mt: "6px" }}>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
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
                fontWeight: "500",
                mb: "2px"
              }}
            >
              {role}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  </Card>
);

export default UserCard;
