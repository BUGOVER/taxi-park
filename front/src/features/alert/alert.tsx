import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { Alert, Snackbar } from '@mui/material';

function AlertSite() {
  const dispatch = useDispatch();

  const [state, setState] = useState<any>({
    vertical: 'bottom',
    horizontal: 'right'
  });
  const { vertical, horizontal } = state;
  const handleClose = () => {
    dispatch(
      openAlert({
        status: undefined,
        go: false
      })
    );
    dispatch(setMessageAlert(''));
  };

  const alertSite = useSelector((state: IAlertSite) => state.AlertSite);

  return (
    <Snackbar
      open={alertSite.open.go}
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSite.open.status}>
        {alertSite.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertSite;
