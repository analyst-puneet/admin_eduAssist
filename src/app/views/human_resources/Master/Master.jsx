import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TablePagination,
  Drawer,
  useMediaQuery,
  useTheme,
  Grid,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Edit,
  Delete,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Add as AddIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import LeaveStock from "../StaffLeave/LeaveStock";

const modules = ["Leave Group", "Complaint Type", "Source", "Reference"];

const moduleFields = {
  "Leave Group": [
    { key: "groupName", label: "Group Name" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
  ],
  "Complaint Type": [
    { key: "type", label: "Type" },
    { key: "severity", label: "Severity Level" },
    { key: "notes", label: "Notes" }
  ],
  Source: [
    { key: "title", label: "Source Title" },
    { key: "info", label: "Information" }
  ],
  Reference: [
    { key: "referenceCode", label: "Reference Code" },
    { key: "details", label: "Details" }
  ]
};

const staticData = {
  "Leave Group": [
    { groupName: "Teaching Staff", status: "Active" },
    { groupName: "Admin Staff", status: "Inactive" },
    { groupName: "Support Staff", status: "Active" }
  ],
  "Complaint Type": [
    { type: "Discipline", severity: "High", notes: "Immediate attention" },
    { type: "Facilities", severity: "Medium", notes: "Needs resolution" },
    { type: "Academic", severity: "Low", notes: "General inquiry" }
  ],
  Source: [
    { title: "Email", info: "Received via official mail" },
    { title: "Phone", info: "Direct call from parent" },
    { title: "In-person", info: "Walk-in complaint" }
  ],
  Reference: [
    { referenceCode: "REF123", details: "Old case reference" },
    { referenceCode: "REF456", details: "Previous year record" },
    { referenceCode: "REF789", details: "Archived document" }
  ]
};

export default function Master() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const [selectedModule, setSelectedModule] = useState("Leave Group");
  const [formData, setFormData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLeaveStock, setOpenLeaveStock] = useState(false);
  const [selectedLeaveGroup, setSelectedLeaveGroup] = useState(null);

  const fields = moduleFields[selectedModule] || [];
  const fullData = staticData[selectedModule] || [];
  const tableData = fullData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const inputStyle = {
    "& .MuiInputBase-root": {
      height: "38px",
      fontSize: "0.875rem"
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
      fontSize: "0.875rem",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)"
      }
    },
    borderColor: isDarkMode ? "white" : "grey.500",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.500"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "grey.700"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "white" : "primary.main"
    },
    margin: "0.25rem 0"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert(`Saved ${JSON.stringify(formData)} for ${selectedModule}`);
    setFormData({});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenLeaveStock = (group) => {
    setSelectedLeaveGroup(group);
    setOpenLeaveStock(true);
  };

  const handleCloseLeaveStock = () => {
    setOpenLeaveStock(false);
    setSelectedLeaveGroup(null);
  };

  const drawer = (
    <Box sx={{ width: 200 }}>
      <List>
        {modules.map((mod) => (
          <ListItemButton
            key={mod}
            selected={selectedModule === mod}
            onClick={() => {
              setSelectedModule(mod);
              setFormData({});
              setPage(0);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemText primary={mod} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box p={isMobile ? 1 : 2}>
      {/* Top Bar */}
      <Box display="flex" alignItems="center" mb={3} flexWrap="wrap">
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
            <MenuIcon sx={{ color: isDarkMode ? "white" : "inherit" }} />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight="bold" mr={1}>
          Master
        </Typography>
        <Typography color="textSecondary" mx={1}>
          |
        </Typography>
        <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
          <HomeIcon color="primary" fontSize="small" />
        </Link>
        <ChevronRightIcon color="disabled" fontSize="small" />
        <Typography
          sx={{
            color: "text.secondary",
            borderBottom: "2px solid purple",
            fontWeight: 500
          }}
        >
          Master
        </Typography>
      </Box>

      <Box display="flex" height="100%">
        {!isMobile ? (
          <Box width="200px" mr={2}>
            {drawer}
          </Box>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", width: 200 } }}
          >
            {drawer}
          </Drawer>
        )}

        <Box flex={1} sx={{ overflowX: "auto" }}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add {selectedModule}
            </Typography>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.key}>
                  {field.type === "select" ? (
                    <TextField
                      select
                      fullWidth
                      label={field.label}
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={handleInputChange}
                      sx={inputStyle}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={handleInputChange}
                      sx={inputStyle}
                    />
                  )}
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
              <Typography variant="h6">{selectedModule} List</Typography>
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
                    {selectedModule === "Leave Group" && (
                      <>
                        <TableCell>Stock Status</TableCell>
                        <TableCell>Fill Stock</TableCell>
                      </>
                    )}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((item, index) => (
                    <TableRow key={index}>
                      {fields.map((field) => (
                        <TableCell key={field.key}>{item[field.key]}</TableCell>
                      ))}
                      {selectedModule === "Leave Group" && (
                        <>
                          <TableCell>Not Filled</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<AddIcon />}
                              onClick={() => handleOpenLeaveStock(item)}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </>
                      )}
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
      </Box>

      <Dialog open={openLeaveStock} onClose={handleCloseLeaveStock} fullWidth maxWidth="md">
        <DialogTitle>Leave Stock for {selectedLeaveGroup?.groupName}</DialogTitle>
        <DialogContent>
          <LeaveStock leaveGroup={selectedLeaveGroup} onClose={handleCloseLeaveStock} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeaveStock}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
