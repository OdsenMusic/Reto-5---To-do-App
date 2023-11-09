import React from "react";
export default function AddTaskButton({}) {
  return (
    <button class="add-task" onClick={clickHandlerAddTask}>
      <img class="add-task" src="/icons/plus-circle-svgrepo-com.svg" alt="" />
    </button>
  );
}
