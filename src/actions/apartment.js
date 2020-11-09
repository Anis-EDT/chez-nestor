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

 * Get all apartments
 */
export const getApartmentRoomsById = id => async dispatch => {
  const path = `${API_ENDPOINT}/apartment/${id}`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_APARTMENT_ROOMS_BY_ID,
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

 * Get all apartments
 */
export const createApartment = payload => async dispatch => {
  const path = `${API_ENDPOINT}/apartment`;
  try {
    const res = await axios.post(path, { payload });
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
