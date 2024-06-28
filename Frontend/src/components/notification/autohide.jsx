import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

const AutohideNoti = ({ message, open, onClose }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default AutohideNoti;
