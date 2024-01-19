import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, Box } from "@mui/material";
import { useSnackBar } from "./cartContext";

const CustomizedSnackbars = () => {
  const { snackbarOpen, snackbarMessage, snackbarType, addSnackbarItem } = useSnackBar();

  const handleClose = (event) => {
    addSnackbarItem(false,snackbarMessage,snackbarType)
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomizedSnackbars;