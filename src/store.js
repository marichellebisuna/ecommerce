import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userReducer } from './reducers/userReducers';

const reducer = combineReducers({
  userReducer: userReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
