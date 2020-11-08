import { API_ENDPOINT } from '../config';
import { GET_APARTMENTS, ERROR } from './../constants/types';

import axios from 'axios';
/**

 * Registers a new account with:
 * - A new organization
 * - A new admin user with credentials and info
 */
export const getApartments = () => async dispatch => {
  console.log('in action');
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
