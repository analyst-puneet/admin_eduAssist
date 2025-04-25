import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TablePagination,
  Typography,
  Grid,
  TextField,
  Paper,
  Stack
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Reference = ({ isMobile, isDarkMode, inputStyle }) => {
  const [formData, setFormData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fields = [
    { key: "referenceCode", label: "Reference Code" },
    { key: "details", label: "Details" }
  ];

  const fullData = [
    { referenceCode: "REF123", details: "Old case reference" },
    { referenceCode: "REF456", details: "Previous year record" },
    { referenceCode: "REF789", details: "Archived document" }
  ];

  const tableData = fullData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert(`Saved ${JSON.stringify(formData)} for Reference`);
    setFormData({});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Reference
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.key}>
              <TextField
                fullWidth
                label={field.label}
                name={field.key}
                value={formData[field.key] || ""}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Reference List</Typography>
          {isMobile && (
            <TablePagination
              component="div"
              count={fullData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5]}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
            />
          )}
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.key}>{field.label}</TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item, index) => (
                <TableRow key={index}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>{item[field.key]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton size={isMobile ? "small" : "medium"}>
                      <Edit sx={{ color: isDarkMode ? "white" : "#a3a2a2" }} />
                    </IconButton>
                    <IconButton size={isMobile ? "small" : "medium"}>
                      <Delete sx={{ color: isDarkMode ? "white" : "#7a190c" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {!isMobile && (
          <TablePagination
            component="div"
            count={fullData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Reference;
