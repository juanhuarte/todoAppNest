import styles from "./Item.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem, enableEdit } from "../../redux/action";

export default function Item({ name, id, status }) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(status);
  const { edit } = useSelector((state) => state);

  function handleEdit(e) {
    e.preventDefault();
    dispatch(enableEdit(true));
  }

  function handleCancel(e) {
    e.preventDefault();
    dispatch(enableEdit(false));
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteItem(id));
  }

  const handleStatus = (e) => {
    setCheck(e.target.value);
    dispatch(updateItem(e.target.name, { status: !check, description: name }));
  };

  const [changeDescription, setChangeDescription] = useState({
    description: "",
  });

  function handleEditChange(e) {
    setChangeDescription((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      return newInput;
    });
  }

  function onSubmitEditItem(e) {
    e.preventDefault();
    dispatch(
      updateItem(id, {
        status: status,
        description: changeDescription.description,
      })
    );
    dispatch(enableEdit(false));
    setChangeDescription({ description: "" });
  }

  return !edit ? (
    <div className={styles.container}>
      <input
        className={styles.checkbox}
        type="checkbox"
        name={id}
        value={status}
        defaultChecked={status}
        onChange={handleStatus}
      />
      <p className={styles.text}>{name}</p>
      <button className={styles.button} onClick={(e) => handleEdit(e)}>
        Edit
      </button>
      <button className={styles.button} onClick={(e) => handleDelete(e)}>
        Remove
      </button>
    </div>
  ) : (
    <div className={styles.items}>
      <h3 className={styles.title}>Editing Task: "{name}"</h3>
      <form className={styles.editForm} onSubmit={onSubmitEditItem}>
        <input
          className={styles.input}
          name="description"
          type="text"
          placeholder={name}
          onChange={handleEditChange}
          value={changeDescription.description}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.btn} type="submit">
            Save
          </button>
          <button className={styles.btn} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
