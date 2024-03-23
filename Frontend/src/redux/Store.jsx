import { configureStore } from "@reduxjs/toolkit";
import inventoryReducers from "./reducers/inventoryReducer";
import  storage  from "redux-persist/lib/storage";
import { persistStore,persistReducer } from "redux-persist";

const persistConfig={
    key:"inventory-key",
    storage,
}
const persistedReducer=persistReducer(persistConfig,inventoryReducers);
// const rootReducer=combineReducers({
//     user:authReducer
// });
export const store=configureStore({
    // reducer:rootReducer
    reducer:persistedReducer
});
export const persistor=persistStore(store);