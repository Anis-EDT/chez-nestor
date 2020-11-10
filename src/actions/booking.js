import { API_ENDPOINT } from '../config';
import { GET_BOOKINGS, ERROR, GET_BOOKING_BY_ID } from './../constants/types';

import axios from 'axios';
/**

 * Get all bookings
 */
export const getBookings = () => async dispatch => {
  const path = `${API_ENDPOINT}/booking`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_BOOKINGS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};

/**

 * Get booking by Id
 */
export const getBookingById = id => async dispatch => {
  console.log('in action', id);
  const path = `${API_ENDPOINT}/booking/${id}`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_BOOKING_BY_ID,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};

/**

 * Book a room
 */
export const bookRoom = (clientId, roomId) => async dispatch => {
  const path = `${API_ENDPOINT}/booking`;
  try {
    await axios.post(path, { clientId: clientId, roomId: roomId });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};
