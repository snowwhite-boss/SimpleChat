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
                    payload: Object.assign({}, {
                        name: res.data.name
                    }, {
                        phone: res.data.phone
                    })
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
            if (successcb) successcb();
        })
        .catch(error => {
            console.log("login error => ", error);
            if (errorcb) errorcb();
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

export function AcceptFriend(dispatch, requesterphone, receiverphone, successcb) {
    Client.put(`friends/`, {
            requesterphone: requesterphone,
            receiverphone: receiverphone,
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

export function DeleteChatHistory(myphone, otherphone) {
    Client.delete('chats', {
            myphone,
            otherphone
        }).then(() => {})
        .catch((error) => {
            console.log("Error");
        })
}
export function SetChatMan(dispatch, man) {
    dispatch({
        type: "SET_CHAT_MAN",
        payload: man
    });
}
export function GetMessages(dispatch, sender, receiver) {
    Client.get(`chats/${sender}/${receiver}`)
        .then(async res => {
            if (res.status == 200) {
                dispatch({
                    type: "SET_MESSAGES",
                    payload: res.data
                });
            }
        })
        .catch(error => {
            console.log("GetMessages error => ", error);
        });
}
export function SendMessage(dispatch, sender, receiver, newMessage) {
    Client.post(`chats/`, {
            sender: sender,
            receiver: receiver,
            content: newMessage[0].text,
        })
        .then(async res => {
            if (res.status == 200) {
                dispatch({
                    type: "APPEND_MESSAGE",
                    payload: res.data
                });
            }
        })
        .catch(error => {
            console.log("SendMessage error => ", error);
        });
}