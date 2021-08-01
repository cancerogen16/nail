import HTTP from '../HTTP';
import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKEN,
  AUTH_RESET_PASSWORD,
} from './action-types';

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case AUTH_REFRESH_TOKEN:
    case AUTH_LOGIN:
      return login(state, payload);
    case AUTH_CHECK:
      return checkAuth(state, payload);
    case AUTH_LOGOUT:
      return logout(state);
    case AUTH_RESET_PASSWORD:
      return resetPassword(state);
    default:
      return state;
  }
};

function login(state, payload) {
  console.log(payload)
  return {
    ...state, isAuthenticated: true,
  }

}

function checkAuth(state, payload) {
  // state = Object.assign({}, state, {
  //   isAuthenticated: !!localStorage.getItem('access_token')
  // })

  // if (state.isAuthenticated) {
  //   HTTP.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  // }
  console.log('check', payload);
  return {
    ...state,
      isAuthenticated: payload
  };
}

function logout(state) {
  localStorage.removeItem('access_token')

  return {
    ...state, isAuthenticated: false
  }
}

function resetPassword(state) {
  return {
    ...state, resetPassword: true,
  }
}

//export const getAuth = state => state.auth.isAuthenticated;

export default authReducer;