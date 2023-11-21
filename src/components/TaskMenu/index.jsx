import React, { useState, useEffect } from "react";
import style from "./styles.module.css";
import GroupSelector from "../GroupSelector";
import { motion, AnimatePresence } from "framer-motion";

function TaskMenu({
  key,
  id,
  forceReload,
  groupList,
  group,
  changeTaskAttribute,
  handleColorSelectorVisibility,
}) {
  const [groupSelectorVisibility, setGrupSelectorVisibility] = useState(false);

  useEffect(() => {
    if (groupSelectorVisibility) {
      const timer = setTimeout(() => {
        setGrupSelectorVisibility(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [groupSelectorVisibility]);

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
      <div>
        <button
          onClick={() => {
            console.log("pasa por el listener");
            setGrupSelectorVisibility(!groupSelectorVisibility);
          }}
          className="taskBarMenuButton"
        >
          <img
            className={style.icon}
            src="src/assets/icons/tag-2-svgrepo-com.svg"
            alt=""
          />
        </button>
        <AnimatePresence>
          {groupSelectorVisibility && (
            <GroupSelector
              id={id}
              group={group}
              groupList={groupList}
              forceReload={forceReload}
              changeTaskAttribute={changeTaskAttribute}
            />
          )}
        </AnimatePresence>
      </div>
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
}

export default TaskMenu;
