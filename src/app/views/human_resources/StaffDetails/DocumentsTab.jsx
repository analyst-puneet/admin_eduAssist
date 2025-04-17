import { Box, Typography, Button } from "@mui/material";

const DocumentsTab = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Uploaded Documents
      </Typography>
      <Typography>PAN Card.pdf (API)</Typography>
      <Typography>Aadhaar Card.pdf</Typography>
      <Typography>Resume_2023.pdf</Typography>

      <Button variant="contained" sx={{ mt: 2 }}>
        Upload New Document
      </Button>
    </Box>
  );
};

export default DocumentsTab;
