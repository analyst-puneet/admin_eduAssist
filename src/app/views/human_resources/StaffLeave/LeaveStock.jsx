import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Button,
  Paper,
  Typography,
  Box
} from "@mui/material";

const leaveTypes = [
  "Casual Leave",
  "Earned Leave",
  "Commuted Leave",
  "Restricted Holiday",
  "Duty Leave",
  "Half Casual Leave"
];

const LeaveStockTable = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        LEAVES FOR <u style={{ color: "blue", cursor: "pointer" }}>REGULAR TEACHER</u>
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#007bff" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>TYPE</TableCell>
              <TableCell sx={{ color: "white" }}>COUNT PER YEAR</TableCell>
              <TableCell sx={{ color: "white" }}>ROLLOVER APPLICABLE</TableCell>
              <TableCell sx={{ color: "white" }}>ROLLOVER MAXCAP</TableCell>
              <TableCell sx={{ color: "white" }}>AUTO-APPROVE</TableCell>
              <TableCell sx={{ color: "white" }}>AUTO-APPROVE MAXCAP</TableCell>
              <TableCell sx={{ color: "white" }}>ASSIGN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveTypes.map((type) => (
              <TableRow key={type}>
                <TableCell>{type.toUpperCase()}</TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <TextField size="small" />
                </TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LeaveStockTable;
