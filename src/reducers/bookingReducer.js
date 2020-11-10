import { GET_BOOKINGS, GET_BOOKING_BY_ID } from '../constants/types';
import initialState from './initialState';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKINGS: {
      return {
        ...state,
        bookings: action.payload.bookings
      };
    }

    case GET_BOOKING_BY_ID: {
      console.log('reducer ', action.payload.booking, action.payload);
      return {
        ...state,
        currentBooking: action.payload.booking
      };
    }

    default:
      return state;
  }
}
