import { GET_APARTMENTS, GET_APARTMENT_ROOMS_BY_ID } from '../constants/types';
import initialState from './initialState';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APARTMENTS: {
      return {
        ...state,
        apartments: action.payload.apartments
      };
    }

    case GET_APARTMENT_ROOMS_BY_ID: {
      return {
        ...state,
        currentApartment: {
          rooms: action.payload.data,
          id: action.payload.id
        }
      };
    }

    default:
      return state;
  }
}
