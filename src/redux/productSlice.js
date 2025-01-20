import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllProduct = createAsyncThunk('products', async() => {
    const response =  await axios.get("https://fakestoreapi.com/products")
    return response.data;

  })

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getAllProduct.fulfilled, (state,action) => {
            state.products = action.payload;
            state.loading = false; 
            state.error = null;
        })
        builder.addCase(getAllProduct.rejected, (state , action) =>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const { } = productSlice.actions
export default productSlice.reducer;
  