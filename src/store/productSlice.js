import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    
    name: 'product',
    initialState: {
        products: null,
        categories : null,
        activeCategory: null
    }, 
    reducers:{

        setActiveCategory: (state,action) => {
            state.activeCategory = action.payload
        },
        listOfProducts:(state,action) =>{
            state.products = action.payload
        },
        listOfCategories: (state,action) => {
            state.categories = action.payload
        },
        resetProduct:(state) =>{
            state.products = null,
            state.categories = null,
            state.activeCategory = null
        }
    }
});

export const {listOfProducts,listOfCategories,setActiveCategory,resetProduct} = productSlice.actions;
export default productSlice.reducer;