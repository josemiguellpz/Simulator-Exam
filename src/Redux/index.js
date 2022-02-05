import thunk from "redux-thunk" 
import { combineReducers, compose } from 'redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';

// Reducers
import topics from '../Redux/Slices/Topics'
import users from '../Redux/Slices/Users'

// Config Redux Thunk
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

// This is Store Redux
const reducers = combineReducers({ 
  users, 
  topics
});

const store = createStore(
  reducers,
  enhancers,
);

export default store;