import React from "react";

import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function Dialog() {
  return (
    <MuiDialog open onClose={() => {}}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>Issue with the server</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Disagree</Button>
        <Button color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
