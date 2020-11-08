import { GET_APARTMENTS } from '../constants/types';
import initialState from './initialState';

export default function apartmentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APARTMENTS:
      return {
        ...state,
        apartments: action.payload
      };
    default:
      return state;
  }
}
