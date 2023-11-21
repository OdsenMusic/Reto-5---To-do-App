import React from "react";
import style from "./styles.module.css";

function TaskMenu({
  key,
  id,
  forceReload,
  handleColorSelectorVisibility,
  handleGroupSelectorVisibility,
  changeTaskAttribute,
  deleted,
}) {
  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (deleted) {
      deleteTask();
    } else {
      changeTaskAttribute("deleted", true);
      forceReload();
    }
  };

  const handleRecover = () => {
    changeTaskAttribute("deleted", false);
    forceReload();
  };

  if (!deleted) {
    return (
      <div className={style.taskMenuContainer}>
        <button className="taskBarMenuButton">
          <img
            className={style.icon}
            src="src/assets/icons/align-bottom-svgrepo-com (1).svg"
            alt=""
          />
        </button>
        <button className="taskBarMenuButton" key={key} onClick={handleDelete}>
          <img
            className={style.icon}
            src="src/assets/icons/trash-svgrepo-com.svg"
            alt=""
          />
        </button>

        <button
          onClick={handleGroupSelectorVisibility}
          className="taskBarMenuButton"
        >
          <img
            className={style.icon}
            src="src/assets/icons/tag-2-svgrepo-com.svg"
            alt=""
          />
        </button>

        <button
          onClick={handleColorSelectorVisibility}
          className="taskBarMenuButton"
        >
          <img
            className={style.icon}
            src="src/assets/icons/brush-svgrepo-com.svg"
            alt=""
          />
        </button>
      </div>
    );
  } else {
    return (
      <button onClick={handleRecover} className="taskBarMenuButton">
        <img
          className={style.icon}
          src="src/assets/icons/reply-svgrepo-com.svg"
          alt=""
        />
      </button>
    );
  }
}

export default TaskMenu;
