import { combineReducers } from 'redux';

import apartmentReducer from './apartmentReducer';
import clientReducer from './clientReducer';
import bookingReducer from './bookingReducer';

import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    apartmentReducer,
    clientReducer,
    bookingReducer
  });

export default rootReducer;
