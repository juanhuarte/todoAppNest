import frontPage from "../../Images/todoList.jpg";
import styles from "./Login.module.css";
import React, { useState, useEffect } from "react";
import Register from "../Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { findCreatedUser } from "../../redux/action/index";
import { useHistory } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allReadyCreated = useSelector((state) => state.boolean);
  const [loading, setLoading] = useState(false);
  const [press, setPress] = useState(false);
  const [input, setInput] = useState({
    mail: "",
    password: "",
  });
  const [pressed, setPressed] = useState(true);
  function handlePress(e) {
    e.preventDefault();
    setLoading(true);
    setPress(true);
  }

  useEffect(() => {
    let timer;

    if (loading) {
      dispatch(findCreatedUser(input.mail, input.password));

      timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  const user = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.authToken);

  function onPress(e, boolean) {
    e.preventDefault();
    setPressed(boolean);
  }

  function onChange(e) {
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      return newInput;
    });
  }

  if (authToken) {
    history.push("/home");
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src={frontPage} alt="login" />
      {pressed ? (
        <form className={styles.form}>
          <h1 className={styles.title}>To-Do-List</h1>
          <input
            type="mail"
            name="mail"
            placeholder="Mail"
            className={styles.input}
            value={input.mail}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            value={input.password}
            onChange={onChange}
          />
          {user.message && press && (
            <p className={styles.text}>Usuario o contraseña incorrectos</p>
          )}
          <button onClick={(e) => handlePress(e)} className={styles.btn}>
            Sign in
          </button>
          <div className={styles.account}>
            <p>Don't have an account?</p>
            <button
              className={styles.button}
              onClick={(e) => onPress(e, false)}
            >
              Sign up
            </button>
          </div>
        </form>
      ) : (
        <Register onPress={onPress} />
      )}
    </div>
  );
}
