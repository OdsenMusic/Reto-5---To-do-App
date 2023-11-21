import React from "react";
import style from "../AddTaskButton/styles.module.css";

export default function AddTaskButton() {
  return (
    <button className={style.addTask} onClick={clickHandlerAddTask}>
      <img
        className={style.addTask}
        src="/icons/plus-circle-svgrepo-com.svg"
        alt=""
      />
    </button>
  );
}
