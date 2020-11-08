import { combineReducers } from 'redux';
import apartmentReducer from './apartmentReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    apartmentReducer
  });

export default rootReducer;
