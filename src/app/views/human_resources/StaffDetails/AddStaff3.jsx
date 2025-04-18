import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Grid, Typography, Paper, Button, Modal, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ file, onClose }) => {
  const getPreviewContent = () => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "80vh" }}
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title="PDF Preview"
          width="100%"
          height="500px"
          style={{ border: "none" }}
        />
      );
    } else {
      return (
        <Box textAlign="center">
          <DescriptionIcon style={{ fontSize: 100 }} />
          <Typography variant="h6">No preview available</Typography>
          <Typography>File: {file.name}</Typography>
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        outline: "none",
        maxWidth: "90%",
        maxHeight: "90%",
        overflow: "auto"
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
      >
        <CloseIcon />
      </IconButton>
      {getPreviewContent()}
      <Box mt={2} textAlign="center">
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

const DropzoneBox = ({ label, onDrop, file }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const getFileIcon = () => {
    if (!file) return <CloudUploadIcon />;

    if (file.type.startsWith("image/")) {
      return <ImageIcon />;
    } else if (file.type === "application/pdf") {
      return <PictureAsPdfIcon />;
    } else if (
      file.type.includes("document") ||
      file.name.endsWith(".docx") ||
      file.name.endsWith(".doc")
    ) {
      return <DescriptionIcon />;
    } else {
      return <InsertDriveFileIcon />;
    }
  };

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
          gap: 1,
          flexDirection: "column"
        }}
      >
        <input {...getInputProps()} />
        {getFileIcon()}
        <Typography>
          {isDragActive ? "Drop the file here..." : "Drag and drop a file here or click"}
        </Typography>

        {file && (
          <>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {file.name}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                setPreviewOpen(true);
              }}
            >
              Preview
            </Button>
          </>
        )}
      </Box>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <FilePreview file={file} onClose={() => setPreviewOpen(false)} />
      </Modal>
    </Paper>
  );
};

const Addstaff3 = ({ formData, setFormData }) => {
  const [files, setFiles] = useState(
    formData.files || {
      resume: null,
      joiningLetter: null,
      resignationLetter: null,
      otherDocuments: null
    }
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      files
    }));
  }, [files]);

  const handleFileUpload = (field) => (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(`${field} uploaded:`, file);
    setFiles((prev) => ({
      ...prev,
      [field]: file
    }));
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Upload Documents
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DropzoneBox label="1. Resume" onDrop={handleFileUpload("resume")} file={files.resume} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="2. Joining Letter"
            onDrop={handleFileUpload("joiningLetter")}
            file={files.joiningLetter}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="3. Resignation Letter"
            onDrop={handleFileUpload("resignationLetter")}
            file={files.resignationLetter}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="4. Other Documents"
            onDrop={handleFileUpload("otherDocuments")}
            file={files.otherDocuments}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Addstaff3;
