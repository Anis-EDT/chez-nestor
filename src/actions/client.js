import { API_ENDPOINT } from '../config';
import { GET_CLIENTS, ERROR, GET_CLIENT_BY_ID } from './../constants/types';

import axios from 'axios';
/**

 * Get all clients
 */
export const getClients = () => async dispatch => {
  const path = `${API_ENDPOINT}/client`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_CLIENTS,
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

 * Get client by Id
 */
export const getClientById = id => async dispatch => {
  const path = `${API_ENDPOINT}/client/${id}`;
  try {
    const res = await axios.get(path);
    dispatch({
      type: GET_CLIENT_BY_ID,
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

 * Add a new client
 */
export const addClient = payload => async dispatch => {
  const path = `${API_ENDPOINT}/client`;
  try {
    await axios.post(path, payload);
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: console.log(e)
    });
  }
};
