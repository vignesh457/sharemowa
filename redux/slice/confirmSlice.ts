import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

const initialState: ConfirmState = {
  open: false,
  title: '',
  message: '',
  onConfirm: null,
  onCancel: null,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    showConfirm: (state, action: PayloadAction<Omit<ConfirmState, 'open'>>) => {
      state.open = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm;
      state.onCancel = action.payload.onCancel;
    },
    hideConfirm: (state) => {
      state.open = false;
      state.title = '';
      state.message = '';
      state.onConfirm = null;
      state.onCancel = null;
    },
  },
});

export const { showConfirm, hideConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
