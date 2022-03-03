import styles from "./Folder.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder, getItemsById } from "../../redux/action";

export default function Folder({ name, id, getItemId }) {
  const dispatch = useDispatch();
  function handleView(e) {
    e.preventDefault();
    dispatch(getItemsById(id));
    getItemId(id, name);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteFolder(id));
  }
  return (
    <div className={styles.container}>
      <p className={styles.text}>- {name}</p>
      <button className={styles.button} onClick={(e) => handleView(e)}>
        View Items
      </button>
      <button className={styles.button} onClick={(e) => handleDelete(e)}>
        Remove
      </button>
    </div>
  );
}
