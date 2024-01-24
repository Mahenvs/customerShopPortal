import {configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import storeReducer from './storeSlice';
// import customerStoreReducer from './customerSlice';

const appStore = configureStore({
    reducer:{
        product: productReducer,
        store: storeReducer, 
     
    }

})
// const persistor = persistStore(appStore);

export default appStore;
// export { appStore, persistor };
