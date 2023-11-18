import React, { useState } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "./styles.module.css";
import { motion, easeInOut } from "framer-motion";

export default function Task({
  id,
  text,
  color,
  done,
  group,
  forceReload,
  toggleEditMode,
  groupList,
}) {
  const changeTaskText = async (event) => {
    let payload = {
      text: event.target.value,
    };
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeTaskGroup = async (event) => {
    let payload = {
      group: event.target.value,
    };
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
      animate={{ opacity: 1, scale: 1, translateX: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      layout
      className={style.taskWrapper}
    >
      <ColorSelector id={id} forceReload={forceReload} />
      <article className={style[color]}>
        <textarea
          defaultValue={text}
          onBlur={changeTaskText}
          className={style.taskText}
        ></textarea>
        <TaskMenu
          id={id}
          forceReload={forceReload}
          toggleEditMode={toggleEditMode}
          groupList={groupList}
          group={group}
        />
      </article>
      <Checkbox id={id} done={done} forceReload={forceReload} />
    </motion.div>
  );
}
