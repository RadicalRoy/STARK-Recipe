import * as types from '../constants/actionTypes'


export const updateUsernameStr = (usernameStr) => ({
  type: types.UPDATE_USERNAME_STR,
  payload: usernameStr
});

export const updatePasswordStr = (passwordStr) => ({
  type: types.UPDATE_PASSWORD_STR,
  payload: passwordStr
});

export const isLogin = (id, username, email, error) => ({
  type: types.IS_LOGIN,
  payload: { id, username, email, error }
});

export const signupOnClick = () => ({
  type: types.SIGNUP_ONCLICK,
});

export const loginApi = (usernameStr, passwordStr) => {
  return function (dispatch, getState) {
    return fetch('http://localhost:3000/login', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ "username": usernameStr, "password": passwordStr })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) dispatch(isLogin('error', 'error', 'error', response.error));
        else dispatch(isLogin(response.id, response.username, response.email, null));
      })
      .catch(err => console.log(err))
  }
}

export const signupApi = (usernameStr, passwordStr) => {
  return function (dispatch, getState) {
    return fetch('http://localhost:3000/signup', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ "username": usernameStr, "password": passwordStr })
    })
      .then(response => response.json())
      .then(response => {
        dispatch(isLogin(response.id, response.username, response.email))
      })
      .catch(err => console.log(err))
  }
}
