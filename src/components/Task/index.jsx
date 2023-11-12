import React, { useState } from "react";

import ColorSelector from "/src/components/ColorSelector";
import TaskMenu from "../TaskMenu";
import style from "src/components/Task/styles.module.css";

export default function Task({ onSave, id }) {
  const [taskText, setTaskText] = useState("");
  const [taskId, setTaskId] = useState(id);

  const handleTaskText = (event) => {
    setTaskText(event.target.value);
    onSave(taskText, id);
    console.log("hijo " + id);
  };

  return (
    <article>
      <input className={style.task - checkbox} type="checkbox" />
      <textarea onChange={handleTaskText} />
      <ColorSelector />
      <TaskMenu />
    </article>
  );
}
