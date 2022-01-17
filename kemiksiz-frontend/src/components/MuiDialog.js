import { Clear } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

function MuiDialog({ btnText, dialogTitle, children, dialogProps, open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {btnText}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {dialogTitle}
            <Stack direction="row" spacing={3}>
              <Tooltip title="Cancel" arrow>
                <IconButton onClick={handleClose}>
                  <Clear />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}

export default MuiDialog;
