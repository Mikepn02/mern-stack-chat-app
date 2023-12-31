import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from  './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import storage from 'redux-persist/lib/storage';
import { PersistGate  } from 'redux-persist/integration/react';

const persistConfig =  {key: "root",storage , version: 1};
const persistedReducer = persistReducer(persistConfig , authReducer);

const store = configureStore({
   reducer : persistedReducer,
   middleware : (getDefaultMiddleware) => 
   getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
   }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
      </PersistGate>
    </Provider>
   
  </React.StrictMode>
);

// This practice is mainly because of how React and the virtual DOM work. this why we pass app and states in index.js
//persist used to preserve data while page is reloaded
// To use these hooks, make sure you have set up your Redux store using the createStore function 
// from the redux library and wrapped your application with the Provider component from react-redux.
