import { combineReducers } from 'redux';
// set default Redux state
const initialState = {
  currentUser: {},
};

// reducer with cases for Redux
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "ADD_FRIEND":
      state.currentUser.friends.push(action.payload)
      return { ...state, currentUser: state.currentUser };
    default:
      return state;
  }
}

export default userReducer;
