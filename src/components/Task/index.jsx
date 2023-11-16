import React, { useState } from "react";
import Checkbox from "../Checkbox";
import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "./styles.module.css";
import { motion, easeInOut } from "framer-motion";

export default function Task({ onSave, id, text }) {
  const [taskText, setTaskText] = useState("");
  const [taskId, setTaskId] = useState(id);

  const handleTaskText = (event) => {
    setTaskText(event.target.value);
    onSave(taskText, id);
    console.log("hijo " + id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateX: 100 }}
      animate={{ opacity: 1, scale: 1, translateX: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      layout
      className={style.taskWrapper}
    >
      <ColorSelector />
      <article className={style.white}>
        <textarea maxLength="40" onChange={handleTaskText} value={text} />
        <TaskMenu />
      </article>
      <Checkbox />
    </motion.div>
  );
}
