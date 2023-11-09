import React, { useState } from "react";

export default function Task({ onSave }) {
  const [taskText, setTaskText] = useState("");

  const handleTaskText = (event) => {
    setTaskText(event.target.value);
    onSave(taskText);
  };

  return <textarea onChange={handleTaskText} />;
}
