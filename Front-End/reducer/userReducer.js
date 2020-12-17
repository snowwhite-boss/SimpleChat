import {
  combineReducers
} from 'redux';
// set default Redux state
const initialState = {
  currentUser: {},
  friends: [],
  notifications: [],
  userDetail: {},
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
    default:
      return state;
  }
}

export default userReducer;