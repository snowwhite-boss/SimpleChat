import { combineReducers } from 'redux';
// set default Redux state
const initialState = {
  currentUser: {},
  friends: [],
  notifications: [],
  chatMan: {},
  messages: []
};

// reducer with cases for Redux
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_FRIENDS":
      return { ...state, friends: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "SET_CHAT_MAN":
      return { ...state, chatMan: action.payload };
    default:
      return state;
  }
}

export default userReducer;
