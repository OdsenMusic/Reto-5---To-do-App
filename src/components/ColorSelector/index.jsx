import React from "react";
import styles from "./styles.module.css";

function ColorSelector({ key, id, forceReload }) {
  const changeTaskColor = async (color) => {
    let payload = {
      color: color,
    };

    console.log(color);
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${styles.colorSelectorContainer} ${styles.taskColorSelector}`}
    >
      <button
        onClick={() => changeTaskColor("white")}
        className={`${styles.color} ${styles.white}`}
      ></button>
      <button
        onClick={() => changeTaskColor("green")}
        className={`${styles.color} ${styles.green}`}
      ></button>
      <button
        onClick={() => changeTaskColor("yellow")}
        className={`${styles.color} ${styles.yellow}`}
      ></button>
      <button
        onClick={() => changeTaskColor("blue")}
        className={`${styles.color} ${styles.blue}`}
      ></button>
      <button
        onClick={() => changeTaskColor("orange")}
        className={`${styles.color} ${styles.orange}`}
      ></button>
      <button
        onClick={() => changeTaskColor("purple")}
        className={`${styles.color} ${styles.purple}`}
      ></button>
    </div>
  );
}

export default ColorSelector;
