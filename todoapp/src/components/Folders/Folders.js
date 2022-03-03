import styles from "./Folders.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolderById, addFolder } from "../../redux/action";
import Folder from "../Folder/Folder";

export default function Folders({ getItemId }) {
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state);
  const { message } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);

  const [input, setInput] = useState({
    folderName: "",
  });

  useEffect(() => {
    dispatch(getFolderById(user.id));
  }, [message]);

  const handleChange = (e) => {
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      return newInput;
    });
  };

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addFolder(user.id, input.folderName));
    setInput({ ...input, folderName: "" });
  }

  return (
    <div className={styles.folders}>
      <h2>Folders</h2>
      <div className={styles.list}>
        {folders?.map((folder) => (
          <Folder
            key={folder.id}
            name={folder.name}
            id={folder.id}
            userId={user.id}
            getItemId={getItemId}
          />
        ))}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          name="folderName"
          type="text"
          placeholder="New Folder"
          onChange={handleChange}
          value={input.folderName}
        />
        <button className={styles.btn} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
