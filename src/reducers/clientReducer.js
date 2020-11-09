import { GET_CLIENTS, GET_CLIENT_BY_ID } from '../constants/types';
import initialState from './initialState';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS: {
      return {
        ...state,
        clients: action.payload.clients
      };
    }

    case GET_CLIENT_BY_ID: {
      return {
        clients: state.clients,
        currentClient: action.payload.client
      };
    }

    default:
      return state;
  }
}
