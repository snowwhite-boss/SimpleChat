import { apiConfig } from '../config/config';
const USER_API = `${apiConfig.baseUrl}users/`;
// Server Client
import Client from '../api/Client';

// allows a new user to sign up for an account and returns
// user object and token to store in state/browser
// Used in LoginSignup/Signup component
export function signUp(dispatch, name, phoneNumber, callback) {
    Client.post(`users/`, { name: name, phone: phoneNumber })
      .then(async res => {
          console.log("res => ", res)
        if (res.status == 200){
            // set user info in Redux state
            dispatch({
                type: "CURRENT_USER",
                payload: res.data
            });
        }
      })
      .catch(error => console.log("login error => ", error));
}


export function IsExsitUser(phoneNumber) {
    return Client.get(`users/${phoneNumber}`)
}

export function SetCurrentUser(dispatch, user) {
    dispatch({
        type: "CURRENT_USER",
        payload: user
    });
}