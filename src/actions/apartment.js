import { API_ENDPOINT } from '../config';
import {
  GET_APARTMENTS,
  ERROR,
  GET_APARTMENT_ROOMS_BY_ID
} from './../constants/types';

import axios from 'axios';
/**

 * Get all apartments
 */
export const getApartments = () => async dispatch => {
  const path = `${API_ENDPOINT}/apartment`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_APARTMENTS,
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

 * Get apartment rooms by Id
 */
export const getApartmentRoomsById = id => async dispatch => {
  const path = `${API_ENDPOINT}/apartment/${id}`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_APARTMENT_ROOMS_BY_ID,
      payload: { data: res.data.test, id: id }
    });
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};

/**

 * Add new apartments
 */
export const addApartment = payload => async dispatch => {
  const path = `${API_ENDPOINT}/apartment`;
  try {
    const res = await axios.post(path, {
      name: payload.name,
      number: payload.number,
      street: payload.street,
      rooms: payload.rooms
    });
    dispatch({
      type: GET_APARTMENTS,
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

 * Add new room
 */
export const addRoom = payload => async dispatch => {
  const path = `${API_ENDPOINT}/room`;
  try {
    await axios.post(path, payload);
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};
