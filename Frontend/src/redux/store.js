import * as thunks from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

import accountReducer from './reducer';

const store = createStore(accountReducer, applyMiddleware(thunks.thunk));

export default store;
