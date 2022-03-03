import axios from "axios";
export const ADD_USER = "ADD_USER";
export const FIND_CREATED_USER = "FIND_CREATED_USER";
export const GET_FOLDER_BY_ID = "GET_FOLDER_BY_ID";
export const ADD_FOLDER = "ADD_FOLDER";
export const DELETE_FOLDER = "DELETE_USER";
export const GET_ITEMS_BY_ID = "GET_ITEMS_BY_ID";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const ENABLE_EDIT = "ENABLE_EDIT";

//const URL = "http://localhost:3001/";
//const URL = "https://todoappnest.herokuapp.com/";

export function addUser({ name, lastName, mail, password }) {
  return async function (dispatch) {
    try {
      const postUser = await axios.post("/users", {
        name,
        lastName,
        mail,
        password,
      });
      return postUser;
    } catch (error) {
      console.log(error);
    }
  };
}

export function findCreatedUser(mail, password) {
  return async function (dispatch) {
    try {
      await axios
        .get(`/users?mail=${mail}&password=${password}`)
        .then((resolve) => {
          console.log(resolve.data);
          dispatch({
            type: FIND_CREATED_USER,
            payload: resolve.data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFolderById(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/folders/${id}`).then((resolve) => {
        dispatch({
          type: GET_FOLDER_BY_ID,
          payload: resolve.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFolder(id, name) {
  return async function (dispatch) {
    try {
      const postFolder = await axios.post(`/folders/${id}`, {
        name,
      });
      dispatch({
        type: ADD_FOLDER,
        payload: postFolder.data.success,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteFolder(folderId) {
  return async function (dispatch) {
    try {
      const message = await axios.delete("/folders/" + folderId);
      dispatch({
        type: DELETE_FOLDER,
        payload: message.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getItemsById(folderId) {
  return async function (dispatch) {
    try {
      await axios.get(`/items/${folderId}`).then((resolve) => {
        dispatch({
          type: GET_ITEMS_BY_ID,
          payload: resolve.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addItem(folderId, description, status) {
  return async function (dispatch) {
    try {
      const postItem = await axios.post(`/items/${folderId}`, {
        description,
        status,
      });
      dispatch({
        type: ADD_ITEM,
        payload: postItem.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteItem(itemId) {
  return async function (dispatch) {
    try {
      const message = await axios.delete("/items/" + itemId);
      dispatch({
        type: DELETE_ITEM,
        payload: message.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateItem(itemId, { status, description }) {
  return async function (dispatch) {
    try {
      const newInfo = await axios.put("/items/" + itemId, {
        status,
        description,
      });
      console.log("update", newInfo);
      dispatch({
        type: UPDATE_ITEM,
        payload: newInfo.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const enableEdit = (boolean) => (dispatch) => {
  console.log("action", boolean);
  return dispatch({
    type: ENABLE_EDIT,
    payload: boolean,
  });
};
