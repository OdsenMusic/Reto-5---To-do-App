import React from "react";
import style from "./styles.module.css";
import recoverIcon from "../../assets/icons/reply-svgrepo-com.svg";
import brushIcon from "../../assets/icons/brush-svgrepo-com.svg";
import groupIcon from "../../assets/icons/tag-2-svgrepo-com.svg";
import trashIcon from "../../assets/icons/trash-svgrepo-com.svg";
import detailIcon from "../../assets/icons/align-bottom-svgrepo-com (1).svg";

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

  const toggleDeleted = async (deleted) => {
    let payload = {
      deleted: !deleted,
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
      toggleDeleted();
    }
  };

  if (!deleted) {
    return (
      <div className={style.taskMenuContainer}>
        <button className="taskBarMenuButton">
          <img className={style.icon} src={detailIcon} alt="" />
        </button>
        <button className="taskBarMenuButton" key={key} onClick={handleDelete}>
          <img className={style.icon} src={trashIcon} alt="" />
        </button>

        <button
          onClick={handleGroupSelectorVisibility}
          className="taskBarMenuButton"
        >
          <img className={style.icon} src={groupIcon} alt="" />
        </button>

        <button
          onClick={handleColorSelectorVisibility}
          className="taskBarMenuButton"
        >
          <img className={style.icon} src={brushIcon} alt="" />
        </button>
      </div>
    );
  } else {
    return (
      <div className={style.taskMenuContainer}>
        <button onClick={toggleDeleted} className="taskBarMenuButton">
          <img className={style.icon} src={recoverIcon} alt="" />
        </button>
        <button className="taskBarMenuButton" key={key} onClick={handleDelete}>
          <img
            className={style.icon}
            src="src/assets/icons/trash-svgrepo-com.svg"
            alt=""
          />
        </button>
      </div>
    );
  }
}

export default TaskMenu;
