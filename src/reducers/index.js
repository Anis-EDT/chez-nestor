import { combineReducers } from 'redux';
import apartmentReducer from './apartmentReducer';
import clientReducer from './clientReducer';

import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    apartmentReducer,
    clientReducer
  });

export default rootReducer;
