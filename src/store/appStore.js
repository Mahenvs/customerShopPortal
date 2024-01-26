import {configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import storeReducer from './storeSlice';
import appConfigReducer from './appConfigSlice';

const appStore = configureStore({
    reducer:{
        product: productReducer,
        store: storeReducer,  
        appConfig: appConfigReducer
    }

})
// const persistor = persistStore(appStore);

export default appStore;
// export { appStore, persistor };
