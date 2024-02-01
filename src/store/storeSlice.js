import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    name: null,
    customerId: null,
    storeId: null,
    storeDomain: null,
    cart: [],
    cartList: [],
    noOfProducts: 0,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },

    setStoreDomain: (state, action) => {
      state.storeDomain = action.payload;
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

        // await axios.post(cartUrl, getHeaders(), {
        //   customerId: customer,
        //   storeId: storeId,
        //   productId: action.payload.productId,
        //   quantity: 1,
        // });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product?.productName === action.payload.productName) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return null;
          }
        }
        return product;
      });
      state.cart = state.cart.filter((product) => product !== null);
    },

    clearCartStore: (state) => {
      state.cartList = [];
      state.noOfProducts = 0
    },

    cartList: (state, action) => {
      state.cartList = action.payload.productReponseList;
      state.noOfProducts = action.payload.noOfProducts;
    },
    addSingleItemToCart: (state, action) => {
      const product = action.payload;
      const product1 = {
        productCartPrice: product.productTotalPrice,
        productCartQuantity: product.quantity,
        productId: product.productId,
        productName: product.productName,
        productStockQuantity: product.productStockQuantity
      };
      console.log(product1,product);
      
      state.noOfProducts = product.noOfProducts;

      state.cartList = state.cartList.map((item) => {
        console.log(item.productStockQuantity <= product1.productCartQuantity,
          item,item.productStockQuantity , product1.productCartQuantity);
        if (item.productId === product1.productId) {
          return {
            ...item,
            productCartPrice: product1.productCartPrice,
            productCartQuantity: item.productCartQuantity + 1,
          };
        } else {
          return item;
        }
      });

      // If the product is not found, add it to the cart
      if (
        !state.cartList.some((item) => item.productId === product1.productId)
      ) {
        state.cartList.push(product1);
      }
    },
    removeSingleItemFromCart: (state, action) => {
      const product = action.payload;
      const product1 = {
        productCartPrice: product.productTotalPrice,
        productCartQuantity: product.quantity,
        productId: product.productId,
        productName: product.productName,
      };
      state.noOfProducts = product.noOfProducts;
      state.cartList = state.cartList.map((item) => {
        if (item?.productId === product1.productId) {
          if (product1.productCartPrice > 1){
            return {
              ...item,
              productCartPrice: product1.productCartPrice,
              productCartQuantity: item.productCartQuantity - 1,
            };
          }
          else
            return null;
        } 
        else {
          return item;
        }
      });

      state.cartList = state.cartList.filter((product) => product !== null);

    },
    deleteItemFromCart: (state,cation) =>{

    }
  },
});

export const {
  setName,
  setStoreId,
  setCustomerId,
  addToCart,
  removeFromCart,
  clearCartStore,
  setStoreDomain,
  cartList,
  addSingleItemToCart,
  removeSingleItemFromCart,
} = storeSlice.actions;
export default storeSlice.reducer;
