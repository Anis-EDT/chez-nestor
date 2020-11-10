import {
  GET_APARTMENTS,
  GET_APARTMENT_ROOMS_BY_ID,
  GET_ROOMS
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

    case GET_APARTMENT_ROOMS_BY_ID: {
      return {
        ...state,
        currentApartment: {
          rooms: action.payload.data,
          id: action.payload.id
        }
      };
    }
    case GET_ROOMS: {
      // as the Apartment API doesn't retrieve the ID of the room , it's impossible to book ,
      // so this state was made to have the current rooms with their IDs
      const currentRooms = action.payload.rooms.filter(a =>
        state.currentApartment.rooms.some(
          b => a.number === b.number && a.area === b.area && a.price === b.price
        )
      );
      return {
        ...state,
        currentRooms: currentRooms
      };
    }

    default:
      return state;
  }
}
