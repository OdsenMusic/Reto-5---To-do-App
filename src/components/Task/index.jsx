import React, { useState } from "react";

import ColorSelector from "../ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "./styles.module.css";

export default function Task({ onSave, id }) {
  const [taskText, setTaskText] = useState("");
  const [taskId, setTaskId] = useState(id);

  const handleTaskText = (event) => {
    setTaskText(event.target.value);
    onSave(taskText, id);
    console.log("hijo " + id);
  };

  return (
    <div className={style.taskWrapper}>
      <ColorSelector />
      <TaskMenu />
      <article>
        <textarea onChange={handleTaskText} />
      </article>
      <input className={style.checkbox} type="checkbox" />
    </div>
  );
}
