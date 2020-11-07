import { combineReducers } from 'redux';
//import fuelSavings from './fuelSavingsReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history)
  });

export default rootReducer;
