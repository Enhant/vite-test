import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { taskModel } from "entities/task";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  tasks: taskModel.reducer
})

export const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    rootReducer,
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);