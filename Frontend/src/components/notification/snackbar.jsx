import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

const AutohideSnackbar = ({message}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <div>
      <Snackbar
        open={true}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}

export default AutohideSnackbar;
