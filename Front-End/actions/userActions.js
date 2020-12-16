// Server Client
import Client from '../api/Client';

// allows a new user to sign up for an account and returns
// user object and token to store in state/browser
// Used in LoginSignup/Signup component
export function signUp(dispatch, name, phoneNumber, successcb, errorcb) {
    Client.post(`users/`, {
            name: name,
            phone: phoneNumber
        })
        .then(async res => {
            if (res.status == 200) {
                // set user info in Redux state
                dispatch({
                    type: "CURRENT_USER",
                    payload: res.data
                });
            }
            successcb();
        })
        .catch(error => {
            console.log("login error => ", error);
            errorcb();
        });
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

// export function GetNotifications(dispatch, callback) {
//     Client.get(`notifications/${phoneNumber}`)
//         .then(async res => {
//             console.log(res.data, " notifications");
//             // set user info in Redux state
//             dispatch({
//                 type: "NOTIFICATIONS",
//                 payload: res.data
//             });
//         })
//         .catch(error => console.log("login error => ", error));
// }