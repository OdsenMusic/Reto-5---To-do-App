import React from "react";
import { motion } from "framer-motion";
import style from "../NavBarGroup/styles.module.css";

export default function NavBarGroup({
  id,
  name,
  color,
  forceReload,
  filterTasks,
}) {
  const changeGroupName = async (event) => {
    let payload = {
      name: event.target.value,
    };
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
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
  const changeGroupColor = async () => {
    const colors = ["white", "green", "yellow", "blue", "orange", "purple"];
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    let nextColor = colors[nextIndex];

    let payload = {
      color: nextColor,
    };
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
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

  const deleteGroup = async () => {
    try {
      const response = await fetch(`http://localhost:3000/groups/${id}`, {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: 50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0, scale: 0.5, translateY: 25 }}
      layout
      className={`${style.groupFrame} ${style[color]}`}
      onClick={() => {
        filterTasks(name);
      }}
    >
      <button className={style.deleteGroupButton} onClick={deleteGroup}>
        <img
          className={style.deleteGroupImg}
          src="src/assets/icons/cross-circle-svgrepo-com.svg"
          alt=""
        />
      </button>
      <button onClick={changeGroupColor} className={style.personalizeColor}>
        <img src="src/assets/icons/brush-svgrepo-com.svg" alt="" />
      </button>
      <textarea
        className={style.groupName}
        defaultValue={name}
        onBlur={changeGroupName}
        maxLength="13"
        type="text"
      ></textarea>
    </motion.div>
  );
}
