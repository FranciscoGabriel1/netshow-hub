
import React, { useState } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarOptions {
  message: string;
  severity?: AlertColor; 
  duration?: number;     
}


export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<SnackbarOptions>({
    message: '',
    severity: 'info',
    duration: 3000,
  });

  function showSnackbar({
    message,
    severity = 'info',
    duration = 3000,
  }: SnackbarOptions) {
    setOpts({ message, severity, duration });
    setOpen(true);
  }

  function handleClose(_?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function renderSnackbar() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={opts.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={opts.severity} sx={{ width: '100%' }}>
          {opts.message}
        </Alert>
      </Snackbar>
    );
  }

  return { showSnackbar, renderSnackbar };
}
