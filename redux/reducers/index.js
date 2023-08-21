import { combineReducers, createStore } from "redux";

const initialState = {
  isLogin: false,
  token: null,
  userInfo: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case "IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "AUTH_CODE_EXPIRE":
      return { ...state, authCodeExpire: action.payload };
    case "REGISTER_DATA":
      return { ...state, registerData: action.payload };

    default:
      return state;
  }
}

function init(state = initialState, action) {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
}

function params(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED":
      return { ...state, selecttedData: action.payload };
    default:
      return state;
  }
}
function sendData(state = initialState, action) {
  switch (action.type) {
    case "SET_SENDDATA":
      return { ...state, selecttedData: action.payload };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  init,
  auth,
  params,
  sendData,
});
export const store = createStore(AppReducer);
export default AppReducer;
