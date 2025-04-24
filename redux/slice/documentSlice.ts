import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DocumentState {
    url: string;
    number: string;
}

export interface DocumentInfo {
    rc: DocumentState;
    dl: DocumentState;
    aadhar: DocumentState;
}

const initialState: DocumentInfo = {
    rc: { url: '', number: '' },
    dl: { url: '', number: '' },
    aadhar: { url: '', number: '' },    
};

const documentSlice = createSlice({
name: 'document',
initialState,
reducers: {
    setRcDocument: (state, action: PayloadAction<DocumentState>) => {
        state.rc = action.payload;
    },
    setDlDocument: (state, action: PayloadAction<DocumentState>) => {
        state.dl = action.payload;
    },
    setAadharDocument: (state, action: PayloadAction<DocumentState>) => {
        state.aadhar = action.payload;
    },
    resetDocuments: () => initialState
},
});

export const { setRcDocument, setDlDocument, setAadharDocument, resetDocuments } = documentSlice.actions;
export default documentSlice.reducer;