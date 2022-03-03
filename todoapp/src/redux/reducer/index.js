import {
  ADD_USER,
  FIND_CREATED_USER,
  GET_FOLDER_BY_ID,
  ADD_FOLDER,
  DELETE_FOLDER,
  GET_ITEMS_BY_ID,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ENABLE_EDIT,
} from "../action/index";
const initialState = {
  //user: {},
  user: JSON.parse(window.localStorage.getItem("logUser"))
    ? JSON.parse(window.localStorage.getItem("logUser"))
    : {},
  boolean: false,
  authToken: null, //"abc123",
  folders: [],
  items: [],
  message: null,
  itemMessage: null,
  edit: false,
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_USER:
      return { ...state };
    case FIND_CREATED_USER:
      window.localStorage.setItem("logUser", JSON.stringify(payload));
      return {
        ...state,
        boolean: payload.user ? true : false,
        user: payload,
        authToken: payload.user ? "abc123" : null,
      };
    case GET_FOLDER_BY_ID:
      return {
        ...state,
        folders: payload,
      };
    case ADD_FOLDER:
      return { ...state, message: payload };
    case DELETE_FOLDER:
      return { ...state, message: payload };
    case GET_ITEMS_BY_ID:
      return {
        ...state,
        items: payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        itemMessage: payload,
      };
    case DELETE_ITEM:
      return { ...state, itemMessage: payload };
    case UPDATE_ITEM:
      return { ...state, itemMessage: payload.message };
    case ENABLE_EDIT:
      return { ...state, edit: payload };
    default:
      return state;
  }
}

export default rootReducer;
