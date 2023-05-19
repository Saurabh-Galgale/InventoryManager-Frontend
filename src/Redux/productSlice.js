import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: "",
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.product = action.payload;
        },
        removeProduct(state, action) {
            state.id = "";
        }
    }
});

export const {addProduct, removeProduct} = productSlice.actions;

export default productSlice.reducer;