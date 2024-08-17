import { createSlice } from '@reduxjs/toolkit';
import { AlertSiteTypes } from '../enums/enums';

interface IAlertSite {
  open: {
    status: AlertSiteTypes;
    go: boolean;
  };
  vertical: string;
  horizontal: string;
  message: string;
  processUploading: number;
}
const initialState: IAlertSite = {
  open: {
    status: AlertSiteTypes.error,
    go: false
  },
  vertical: 'top',
  horizontal: 'right',
  message: '',
  processUploading: 0
};

const AlertSite = createSlice({
  name: 'alert-site',
  initialState,
  reducers: {
    openAlert(state, action) {
      state.open = action.payload;
    },
    setMessageAlert(state, action) {
      state.message = action.payload;
    },
    setUploadingProcess(state, action) {
      state.processUploading = action.payload;
    }
  }
});

export const { openAlert, setMessageAlert, setUploadingProcess } = AlertSite.actions;

export default AlertSite.reducer;
