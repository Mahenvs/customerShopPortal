import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    name: null,
    image:null,
    customerId: null,
    storeId: null,
    address: null,
    storeDomain: null,
    cart: [],
    cartList: [],
    paymentMethods: [],
    noOfProducts: 0,
    cartTotalPric:0
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setStoreId: (state, action) => {
      state.storeId = action.payload;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
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
      state.cartTotalPric = 0;
    },

    cartList: (state, action) => {
      state.cartList = action.payload.productReponseList
      state.noOfProducts = action.payload.noOfProducts;
      // console.log(action.payload.cartTotalPrice);
      state.cartTotalPric = action.payload.cartTotalPrice
    },
    addSingleItemToCart: (state, action) => {
      const product = action.payload;
      const product1 = {
        productCartPrice: product.productTotalPrice,
        productCartQuantity: product.quantity,
        productId: product.productId,
        productName: product.productName,
        productStockQuantity: product.productStockQuantity,
      };
      
      state.noOfProducts = product.noOfProducts;

      state.cartList = state.cartList.map((item) => {
        if (item.productId === product1.productId) {
          return {
            ...item,
            productCartPrice: product1.productCartPrice,
            productCartQuantity: product1.productCartQuantity,
          };
        } else {
          return item;
        }
      });
      state.cartTotalPric = product.cartTotalprice
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
        productName: product.productName
      };
      state.noOfProducts = product.noOfProducts;
      state.cartTotalPric = product.cartTotalprice
      state.cartList = state.cartList.map((item) => {
        if (item?.productId === product1.productId) {
          if (product1.productCartPrice > 1){
            return {
              ...item,
              productCartPrice: product1.productCartPrice,
              productCartQuantity: item.productCartQuantity - 1,
            };
          } else return null;
        } else {
          return item;
        }
      });

      state.cartList = state.cartList.filter((product) => product !== null);
    },
    availablePaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    },
    resetStore: (state) => {
      state.customerId = null,
        state.cart = [],
        state.cartList = [],
        state.paymentMethods = [],
        state.cartTotalPric = 0;
        state.noOfProducts = 0;
    },
  },
});

export const {
  setName,
  setStoreId,
  setCustomerId,
  setAddress,
  addToCart,
  removeFromCart,
  clearCartStore,
  setStoreDomain,
  cartList,
  addSingleItemToCart,
  removeSingleItemFromCart,
  availablePaymentMethods,
  setImage,
  resetStore
} = storeSlice.actions;
export default storeSlice.reducer;
