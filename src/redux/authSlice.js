import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {

            const response = await axios.post('https://reqres.in/api/login', {
                email: credentials.email, 
                password: credentials.password, 
            });


            return response.data.token;
        } catch (error) {

            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
          
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending , (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled , (state,action) =>{
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem('token', action.payload)
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
       
    }
})


export const { logout } = authSlice.actions;

export default authSlice.reducer;