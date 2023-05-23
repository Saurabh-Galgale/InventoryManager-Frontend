import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: "",
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ADDPRODUCT(state, action) {
            state.product = action.payload;
        },
        REMOVEPRODUCT(state, action) {
            state.id = "";
        },
        TOTALPRODUCTS(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { price, quantity } = item;
                return array.push(quantity);
            });
            const totalValue = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.totalProducts = totalValue;
        },
        STOREVALUE(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { price, quantity } = item;
                const productValue = price * quantity;
                return array.push(productValue);
            });
            const totalValue = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.totalStoreValue = totalValue;
        },
        OUTOFSTOCK(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { quantity } = item;

                return array.push(quantity);
            });
            let count = 0;
            array.forEach((number) => {
                if (number === 0 || number === "0") {
                    count += 1;
                }
            });
            state.outOfStock = count;
        },
        TOTALCATEGORY(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { category } = item;

                return array.push(category);
            });
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
        },
    },
})

export const { ADDPRODUCT, REMOVEPRODUCT, OUTOFSTOCK, TOTALCATEGORY, STOREVALUE, TOTALPRODUCTS } = productSlice.actions;

export default productSlice.reducer;