import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({

    name: 'user',
    initialState: { value : {itsId: ''}, professional: { isProfessional: '' }, profileForm : {form: '', notification: { success: '', error: '' }}, logoutValue : { log: false}},
    reducers : {
        login : (state, action) => {
            state.value = action.payload
        },
        professional : (state, action) => {
            state.professional = action.payload
        },
        profileForm : (state, action) => {
            state.profileForm = action.payload
        },
        logout : (state, action) => {
            state.logoutValue = action.payload
        }
    }

});

export const { login, professional, profileForm, logout } = userSlice.actions;
export default userSlice.reducer;
