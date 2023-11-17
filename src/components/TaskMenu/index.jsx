import React, { useState } from "react";
import style from "./styles.module.css";

function TaskMenu({ key, id }) {
  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.taskMenuContainer}>
      <button>
        <img
          className={style.icon}
          src="src/assets/icons/align-bottom-svgrepo-com (1).svg"
          alt=""
        />
      </button>
      <button key={key} onClick={deleteTask}>
        <img
          className={style.icon}
          src="src/assets/icons/trash-svgrepo-com.svg"
          alt=""
        />
      </button>
      <button>
        <img
          className={style.icon}
          src="src/assets/icons/tag-2-svgrepo-com.svg"
          alt=""
        />
      </button>
      <button>
        <img
          className={style.icon}
          src="src/assets/icons/brush-svgrepo-com.svg"
          alt=""
        />
      </button>
    </div>
  );
}

export default TaskMenu;
