import {
  combineReducers
} from 'redux';
// set default Redux state
const initialState = {
  currentUser: {},
  friends: [],
  notifications: [],
  userDetail: {},
  chatMan: {},
  messages: []
};

// reducer with cases for Redux
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        ...state, currentUser: action.payload
      };
    case "SET_FRIENDS":
      return {
        ...state, friends: action.payload
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state, notifications: action.payload
      };
    case "SET_USERDETAIL":
      return {
        ...state, userDetail: action.payload
      };
    case "SET_CHAT_MAN":
      return {
        ...state, chatMan: action.payload
      };
    case "SET_MESSAGES":
      return {
        ...state, messages: action.payload
      };
    case "APPEND_MESSAGE":
      let mess = [action.payload].concat(state.messages);
      return {
        ...state, messages: mess
      };
    case "SET_FILTER":
      let notify = state.notifications.filter(notification => notification.senduser.name.search(action.payload) >= 0);
      return {
        ...state, notifications: notify
      };
    default:
      return state;
  }
}

export default userReducer;