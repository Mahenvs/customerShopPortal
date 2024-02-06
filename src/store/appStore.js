import {configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import cartReducer from './cartSlice';
import storeReducer from './storeSlice';
import appConfigReducer from './appConfigSlice';

const appStore = configureStore({
    reducer:{
        product: productReducer,
        store: storeReducer,  
        cart: cartReducer,
        appConfig: appConfigReducer
    }

})
// const persistor = persistStore(appStore);

export default appStore;
// export { appStore, persistor };
