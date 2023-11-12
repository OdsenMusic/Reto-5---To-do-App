import React from "react";
import styles from "./styles.module.css";

function ColorSelector() {
  return (
    <div
      className={`${styles.colorSelectorContainer} ${styles.taskColorSelector}`}
    >
      <button className={`${styles.color} ${styles.white}`}></button>
      <button className={`${styles.color} ${styles.green}`}></button>
      <button className={`${styles.color} ${styles.yellow}`}></button>{" "}
      <button className={`${styles.color} ${styles.blue}`}></button>{" "}
      <button className={`${styles.color} ${styles.grey}`}></button>
      <button className={`${styles.color} ${styles.purple}`}></button>
    </div>
  );
}

export default ColorSelector;
