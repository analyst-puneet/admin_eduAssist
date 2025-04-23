import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Grid, Typography, Paper, Button, Modal, IconButton, useTheme } from "@mui/material";
import {
  CloudUpload,
  InsertDriveFile,
  PictureAsPdf,
  Image,
  Description,
  Close
} from "@mui/icons-material";

// IndexedDB utils
import { saveFileToDB, getAllFilesFromDB, deleteFileFromDB } from "app/utils/indexedDBUtils";

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
          <Description style={{ fontSize: 100 }} />
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
        <Close />
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

const DropzoneBox = ({ label, onDrop, file, error, helperText }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const getFileIcon = () => {
    if (!file || !file.type || !file.name) return <CloudUpload />;
    if (file.type.startsWith("image/")) return <Image />;
    if (file.type === "application/pdf") return <PictureAsPdf />;
    if (
      file.type.includes("document") ||
      file.name.endsWith(".docx") ||
      file.name.endsWith(".doc")
    ) {
      return <Description />;
    }
    return <InsertDriveFile />;
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${error ? theme.palette.error.main : theme.palette.grey[400]}`,
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          color: isDragActive ? "primary.main" : "text.secondary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          flexDirection: "column",
          backgroundColor: error ? theme.palette.error.light + "20" : undefined
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
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
          {helperText}
        </Typography>
      )}

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <FilePreview file={file} onClose={() => setPreviewOpen(false)} />
      </Modal>
    </Paper>
  );
};

export default function AddStaff3({
  formData,
  setFormData,
  onValidationChange,
  triggerValidation
}) {
  const [files, setFiles] = useState(
    formData.files || {
      resume: null,
      joiningLetter: null,
      aadharFront: null,
      aadharBack: null,
      panCard: null,
      offerLetter: null,
      otherDocuments: null
    }
  );

  const [errors, setErrors] = useState({
    resume: false,
    joiningLetter: false,
    aadharFront: false,
    aadharBack: false,
    panCard: false
  });

  const [showErrors, setShowErrors] = useState(false);

  // ✅ Load files from IndexedDB on mount
  useEffect(() => {
    const loadFilesFromIndexedDB = async () => {
      // Check if we're editing an existing record (formData.files exists)
      const isEditing = formData.files && Object.keys(formData.files).length > 0;

      if (!isEditing) {
        // For new form, clear any existing files from IndexedDB
        await Promise.all([
          deleteFileFromDB("resume"),
          deleteFileFromDB("joiningLetter"),
          deleteFileFromDB("aadharFront"),
          deleteFileFromDB("aadharBack"),
          deleteFileFromDB("panCard"),
          deleteFileFromDB("offerLetter"),
          deleteFileFromDB("otherDocuments")
        ]);
        return;
      }

      // Only load files if we're editing an existing record
      const storedFiles = await getAllFilesFromDB();
      const updated = {};

      for (const key of Object.keys(files)) {
        const file = storedFiles[key];
        if (file && file.data) {
          const blob = await dataURLtoBlob(file.data);
          const reconstructedFile = new File([blob], file.name, {
            type: file.type
          });
          updated[key] = reconstructedFile;
        }
      }

      setFiles((prev) => ({
        ...prev,
        ...updated
      }));
    };

    loadFilesFromIndexedDB();
  }, []);

  // Helper to convert base64 to blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  // Validate form and notify parent
  const validateForm = (show = false) => {
    const newErrors = {
      resume: !files.resume,
      joiningLetter: !files.joiningLetter,
      aadharFront: !files.aadharFront,
      aadharBack: !files.aadharBack,
      panCard: !files.panCard
    };

    if (show) setErrors(newErrors);

    const isFormValid = !Object.values(newErrors).some((error) => error);
    if (onValidationChange) {
      onValidationChange(isFormValid);
    }

    return isFormValid;
  };

  // 🔄 Update formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      files
    }));
    validateForm();
  }, [files]);

  useEffect(() => {
    if (triggerValidation) {
      setShowErrors(true);
      validateForm(true);
    }
  }, [triggerValidation]);

  // 📤 Upload and save to IndexedDB
  const handleFileUpload = (field) => (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        await saveFileToDB(field, {
          name: file.name,
          type: file.type,
          data: reader.result
        });

        setFiles((prev) => ({
          ...prev,
          [field]: file
        }));

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: false }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Upload Documents
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="1. Resume (Required)"
            onDrop={handleFileUpload("resume")}
            file={files.resume}
            error={errors.resume}
            helperText="Resume is required"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="2. Joining Letter (Required)"
            onDrop={handleFileUpload("joiningLetter")}
            file={files.joiningLetter}
            error={errors.joiningLetter}
            helperText="Joining letter is required"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="3. Aadhar Card (Front) (Required)"
            onDrop={handleFileUpload("aadharFront")}
            file={files.aadharFront}
            error={errors.aadharFront}
            helperText="Aadhar Card front is required"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="4. Aadhar Card (Back) (Required)"
            onDrop={handleFileUpload("aadharBack")}
            file={files.aadharBack}
            error={errors.aadharBack}
            helperText="Aadhar Card back is required"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="5. PAN Card (Front) (Required)"
            onDrop={handleFileUpload("panCard")}
            file={files.panCard}
            error={errors.panCard}
            helperText="PAN Card is required"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DropzoneBox
            label="6. Offer Letter (Optional)"
            onDrop={handleFileUpload("offerLetter")}
            file={files.offerLetter}
          />
        </Grid>
        <Grid item xs={12}>
          <DropzoneBox
            label="7. Other Documents (Optional)"
            onDrop={handleFileUpload("otherDocuments")}
            file={files.otherDocuments}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
