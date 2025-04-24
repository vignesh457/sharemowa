import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}

export interface UserState {
  phoneNumber: string;
  role: 'biker' | 'rider' | null;
  vehicleType: 'bike' | 'car' | null;
  personalInfo: PersonalInfo | null;
  isOnboarded: boolean;
}

const initialState: UserState = {
  phoneNumber: '',
  role: null,
  vehicleType: null,
  personalInfo: null,
  isOnboarded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setUserRole: (state, action: PayloadAction<'biker' | 'rider'>) => {
      state.role = action.payload;
    },
    setUserVehicleType: (state, action: PayloadAction<'bike' | 'car'>) => {
      state.vehicleType = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setIsOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  setUserPhoneNumber,
  setUserRole,
  setUserVehicleType,
  setPersonalInfo,
  setIsOnboarded,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
