import React, { useState } from "react";
import style from "./styles.module.css";
import GroupSelector from "../GroupSelector";

function TaskMenu({ key, id, forceReload, toggleEditMode, groupList, group }) {
  const [groupSelectorVisibility, setGrupSelectorVisibility] = useState(false);

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

  return (
    <div className={style.taskMenuContainer}>
      <button className="taskBarMenuButton">
        <img
          className={style.icon}
          src="src/assets/icons/align-bottom-svgrepo-com (1).svg"
          alt=""
        />
      </button>
      <button className="taskBarMenuButton" key={key} onClick={deleteTask}>
        <img
          className={style.icon}
          src="src/assets/icons/trash-svgrepo-com.svg"
          alt=""
        />
      </button>
      <button
        onClick={() => {
          setGrupSelectorVisibility(!groupSelectorVisibility);
        }}
        className="taskBarMenuButton"
      >
        <img
          className={style.icon}
          src="src/assets/icons/tag-2-svgrepo-com.svg"
          alt=""
        />
        {groupSelectorVisibility && (
          <GroupSelector id={id} group={group} groupList={groupList} />
        )}
      </button>
      <button onClick={toggleEditMode} className="taskBarMenuButton">
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
