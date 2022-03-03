import styles from "./Items.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsById, addItem } from "../../redux/action";
import Item from "../Item/Item";

export default function Items({ itemId }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state);
  const { itemMessage } = useSelector((state) => state);

  useEffect(() => {
    if (itemId.id) dispatch(getItemsById(itemId.id));
  }, [itemMessage]);

  const [input, setInput] = useState({
    itemName: "",
  });

  const handleChange = (e) => {
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      return newInput;
    });
  };

  function onSubmitItem(event) {
    event.preventDefault();
    dispatch(addItem(itemId.id, input.itemName, false));
    setInput({ ...input, itemName: "" });
  }
  return (
    <div className={styles.items}>
      <h2>Folder: {itemId.name} </h2>
      <div className={styles.list}>
        {items.length !== 0 ? (
          items?.map((item) => (
            <Item
              key={item.id}
              name={item.description}
              status={item.status}
              id={item.id}
              folderId={itemId.id}
            />
          ))
        ) : itemId.id === null ? (
          <p>Please select folder</p>
        ) : (
          <p className={styles.text}>This folder is empty</p>
        )}
      </div>
      <form className={styles.form} onSubmit={onSubmitItem}>
        <input
          className={styles.input}
          name="itemName"
          type="text"
          placeholder="New Task"
          onChange={handleChange}
          value={input.itemName}
        />
        <button className={styles.btn} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
