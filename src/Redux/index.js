import thunk from "redux-thunk" 
import { combineReducers, compose } from 'redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';

// Reducers
import slices from './Slices/index'

// Config Redux Thunk
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

// This is Store Redux
const reducers = combineReducers({ 
  slices
});

const store = createStore(
  reducers,
  enhancers,
);

export default store;