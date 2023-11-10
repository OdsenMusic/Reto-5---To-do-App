import React from "react";
export default function AddTaskButton({}) {
  return (
    <button className="add-task" onClick={clickHandlerAddTask}>
      <img
        className="add-task"
        src="/icons/plus-circle-svgrepo-com.svg"
        alt=""
      />
    </button>
  );
}
