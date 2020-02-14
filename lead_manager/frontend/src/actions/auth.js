import axios from 'axios'
import { returnErrors } from './messages'
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING })

  axios
    .get('/api/auth/user/', tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: USER_LOADED,
        payload: response.data
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Login
export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request Body
  const body = JSON.stringify({
    username,
    password
  })

  axios
    .post('api/auth/login/', body, config)
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Logout
export const logout = () => (dispatch, getState) => {
  axios
    .post('api/auth/logout/', null, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
    })
}

// Register
export const register = ({ username, password, email }) => (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password, email })

  axios
    .post('api/auth/register/', body, config)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      })
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

// Setup config with token
export const tokenConfig = (getState) => {
  // Get token from the state
  const token = getState().authReducer.token

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token exists, add it to headers
  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }

  return config
}
