import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Grid, Typography, Paper } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DropzoneBox = ({ label, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          color: isDragActive ? "primary.main" : "text.secondary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon />
        <Typography>
          {isDragActive ? "Drop the file here..." : "Drag and drop a file here or click"}
        </Typography>
      </Box>
    </Paper>
  );
};

const Addstaff3 = () => {
  const handleFileUpload = (title) => (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(`${title} uploaded:`, file);
    // You can save to state or upload to server here
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Upload Documents
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DropzoneBox label="1. Resume" onDrop={handleFileUpload("Resume")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox label="2. Joining Letter" onDrop={handleFileUpload("Joining Letter")} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="3. Resignation Letter"
            onDrop={handleFileUpload("Resignation Letter")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox label="4. Other Documents" onDrop={handleFileUpload("Other Documents")} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Addstaff3;
