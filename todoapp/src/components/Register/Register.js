import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { validationFunc } from "./validationFunc";
import { addUser, findCreatedUser } from "../../redux/action/index";

export default function Register({ onPress }) {
  const dispatch = useDispatch();
  const allReadyCreated = useSelector((state) => state.boolean);
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
    rePassword: "",
  });

  const [inputFullfilled, setInputFullfilled] = useState(false);
  const [readyToDispatch, setReadyToDispatch] = useState(false);
  const [errors, setErrors] = useState({});

  function onChange(e) {
    setInput((input) => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const errors = validationFunc(newInput);
      setErrors(errors);
      if (newInput.mail && newInput.password) {
        dispatch(findCreatedUser(newInput.mail, newInput.password));
      }
      if (!Object.keys(errors).length) {
        setReadyToDispatch(true);
      } else setReadyToDispatch(false);
      return newInput;
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (readyToDispatch === true) {
      if (!allReadyCreated) {
        dispatch(addUser(input));
        setReadyToDispatch(false);
        alert("Usuario Creado");
        onPress(event, true);
      } else {
        setInput((input) => {
          const newInput = {
            ...input,
            mail: "",
          };
          return newInput;
        });
        alert("Email no valido");
      }
    } else {
      setInputFullfilled(true);
      const errors = validationFunc(input);
      setErrors(errors);
      alert("Todos los casilleros son obligatorios");
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h1 className={styles.title}>To-Do-List</h1>
      <input
        type="text"
        name="name"
        placeholder="First Name"
        className={styles.input}
        value={input.name}
        onChange={onChange}
      />
      {inputFullfilled && errors.name && (
        <p className={styles.text}>{errors.name}</p>
      )}
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className={styles.input}
        value={input.lastName}
        onChange={onChange}
      />
      {inputFullfilled && errors.lastName && (
        <p className={styles.text}>{errors.lastName}</p>
      )}
      <input
        type="email"
        name="mail"
        placeholder="Mail"
        className={styles.input}
        value={input.mail}
        onChange={onChange}
      />
      {inputFullfilled && errors.mail && (
        <p className={styles.text}>{errors.mail}</p>
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        className={styles.input}
        value={input.password}
        onChange={onChange}
      />
      {inputFullfilled && errors.password && (
        <p className={styles.text}>{errors.password}</p>
      )}
      <input
        type="password"
        name="rePassword"
        placeholder="Repeat Password"
        className={styles.input}
        value={input.rePassword}
        onChange={onChange}
      />
      {inputFullfilled && errors.rePassword && (
        <p className={styles.text}>{errors.rePassword}</p>
      )}
      <button
        disabled={
          !input.name ||
          !input.lastName ||
          !input.mail ||
          !input.password ||
          !input.rePassword
            ? true
            : false
        }
        type="submit"
        className={styles.btn}
      >
        Sign up
      </button>
      <div className={styles.account}>
        <p>Already have an account?</p>
        <button className={styles.button} onClick={(e) => onPress(e, true)}>
          Sign in
        </button>
      </div>
    </form>
  );
}
