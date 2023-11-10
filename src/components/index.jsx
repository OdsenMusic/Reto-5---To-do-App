import React, { useState } from "react";
import ColorSelector from "/src/components/ColorSelector";

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
      <input className="task-checkbox" type="checkbox" />
      <textarea onChange={handleTaskText} />
      <ColorSelector />
    </article>
  );
}
