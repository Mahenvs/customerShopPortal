import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    
    name: 'product',
    initialState: {
        products: null,
        categories: null
    }, 
    reducers:{

        listOfProducts:(state,action) =>{
            state.products = action.payload
        },
        listOfCategories: (state,action) => {
            state.categories = action.payload
        }
        // listOfProductsSorted:(state,action) =>{
        //     state.sortedProducts = action.payload
        // },
    }
});

export const {listOfProducts,listOfCategories} = productSlice.actions;
export default productSlice.reducer;