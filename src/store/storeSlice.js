import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    name: null,
    adminid: null,
    storeId: null,
    cart: [],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    // setAdminId: (state,action) => {
    //     state.adminid = action.payload;
    // },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },

    addToCart: (state, action) => {

      const isProductInCart = state.cart.some(
        (product) => product.productName === action.payload.productName
      );

      if (!isProductInCart) {
        state.cart.push({ quantity: 1, ...action.payload });
      } else {
        state.cart = state.cart.map((product) =>
          product.productName === action.payload.productName
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
    },

    removeFromCart: (state, action) => {

        state.cart = state.cart.map((product) =>{
          if(product?.productName === action.payload.productName){
            if(product.quantity > 1){
                 return {...product, quantity: product.quantity - 1} 
            }
            else{
                return null
            }
          }
           return product 
        });
        state.cart = state.cart.filter((product) => product !== null);

        // const isProductInCart = state.cart.some(
        //   (product) => product.productName === action.payload.productName
        // );
  
        // if (!isProductInCart) {
        //   state.cart.push({ quantity: 1, ...action.payload });
        // } else {
        //   state.cart = state.cart.map((product) =>
        //     product.productName === action.payload.productName
        //       ? { ...product, quantity: product.quantity - 1 }
        //       : product
        //   );
        // }
      },
  },
});

export const { setName, setStoreId, addToCart,removeFromCart } = storeSlice.actions;
export default storeSlice.reducer;
