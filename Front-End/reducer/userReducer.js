import {
  combineReducers
} from 'redux';
// set default Redux state
const initialState = {
  currentUser: {},
  friends: [],
  contactFriends: [],
  notifications: [],
  userDetail: {},
  chatMan: {},
  messages: [],
  filterKey: "",
};

// reducer with cases for Redux
function userReducer(state = initialState, action) {
  switch (action.type) {
    case "CURRENT_USER":
      return {
        ...state, currentUser: action.payload
      };
    case "SET_FRIENDS":
      let conFriends = action.payload.map(fri => {
        if (fri.status == 'added')
          return Object.assign({}, {
            name: fri.user.name
          }, {
            phone: fri.user.phone
          });
      })
      return {
        ...state, friends: action.payload, contactFriends: conFriends
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
      return {
        ...state, filterKey: action.payload
      };
    case "UPDATE_NOTIFICATION": {
      const {
        sender,
        isNotify,
        isSticky
      } = action.payload;
      let notifications = state.notifications.map(notification => {
        if (notification.senduser.phone == sender)
          return {
            ...{},
            ...notification,
            isNotify,
            isSticky
          };
        return notification;
      })
      return {
        ...state,
        notifications
      }
    }
    case "UPDATE_NOTIFICATION_CONTENT": {
      const {
        sender,
        count,
        content
      } = action.payload;
      if(state.notifications.find(notification => notification.senduser.phone == sender)){
        let notifications = state.notifications.map(notification => {
          if (notification.senduser.phone == sender)
            return {
              ...{},
              ...notification,
              count,
              content
            };
          return notification;
        })
        return {
          ...state,
          notifications
        }
      }
      else {
        state.notifications.push(action.payload);
        return state;
      }
    }
    case "APPEND_NOTIFICATION": {
      state.notifications.push(action.payload);
      return state;
    }
    default:
      return state;
  }
}

export default userReducer;