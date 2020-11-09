import {
  GET_APARTMENTS,
  CREATE_APARTMENTS,
  GET_APARTMENT_ROOMS_BY_ID
} from '../constants/types';
import initialState from './initialState';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APARTMENTS: {
      return {
        ...state,
        apartments: action.payload.apartments
      };
    }
    case CREATE_APARTMENTS:
      return {
        ...state,
        apartments: [...state.apartments, action.payload.apartment]
      };
    case GET_APARTMENT_ROOMS_BY_ID: {
      console.log(action.payload.test);
      return {
        ...state,
        currentApartmentRooms: action.payload.test
      };
    }

    default:
      return state;
  }
}
