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
                    payload: Object.assign({}, { name: res.data.name }, { phone: res.data.phone })
                });
                dispatch({
                    type: "SET_FRIENDS",
                    payload: res.data.friends.friends
                });
                dispatch({
                    type: "SET_NOTIFICATIONS",
                    payload: res.data.notifications.notifications
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

export function RequestFriend(dispatch, requesterphone, receiverphone, requestcontent, successcb) {
    Client.post(`friends/`, {
        requesterphone: requesterphone,
        receiverphone: receiverphone,
        requestcontent: requestcontent,
    })
        .then(async res => {
            if (res.status == 200) {
                dispatch({
                    type: "SET_FRIENDS",
                    payload: res.data.friends.friends
                });
                console.log("Request Friend success")
                successcb();
            }
        })
        .catch(error => {
            console.log("RequestFriend error => ", error);
        });
}