import styles from "./Logout.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
    window.localStorage.removeItem("logUser");
    window.location.reload(false);
  };
  return (
    <button onClick={handleClick} className={styles.btn}>
      Logout
    </button>
  );
}
