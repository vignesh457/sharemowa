import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  profileInformation: string;
}

const initialState: FormState = {
  profileInformation: '',
};

const riderFormSlice = createSlice({
  name: 'rider',
  initialState,
  reducers: {
    setRiderForm: (
      state,
      action: PayloadAction<{ name: keyof FormState; value: string }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetRiderForm: (state) => {
      state.profileInformation = '';
    },
  },
});

export const { setRiderForm, resetRiderForm } = riderFormSlice.actions;
export default riderFormSlice.reducer;
