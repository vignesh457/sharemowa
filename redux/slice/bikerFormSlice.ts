import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  registrationCertificate: string;
  drivingLicense: string;
  aadharCard: string;
  profileInformation: string;
}

const initialState: FormState = {
  registrationCertificate: '',
  drivingLicense: '',
  aadharCard: '',
  profileInformation: '',
};

const bikerFormSlice = createSlice({
  name: 'biker',
  initialState,
  reducers: {
    setBikerForm: (
      state,
      action: PayloadAction<{ name: keyof FormState; value: string }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetBikerForm: (state) => {
      state.registrationCertificate = '';
      state.drivingLicense = '';
      state.aadharCard = '';
      state.profileInformation = '';
    },
  },
});

export const { setBikerForm, resetBikerForm } = bikerFormSlice.actions;
export default bikerFormSlice.reducer;
