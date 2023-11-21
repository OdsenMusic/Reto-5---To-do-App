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
  const baseUrl = `http://localhost:3000/groups/${id}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const updateGroup = async (payload) => {
    try {
      const response = await fetch(baseUrl, {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeGroupName = (event) => updateGroup({ name: event.target.value });

  const changeGroupColor = () => {
    const colors = ["white", "green", "yellow", "blue", "orange", "purple"];
    const nextColor = colors[(colors.indexOf(color) + 1) % colors.length];
    updateGroup({ color: nextColor });
  };

  const deleteGroup = async () => {
    try {
      const response = await fetch(baseUrl, { method: "DELETE" });
      if (response.ok) {
        forceReload();
      }
    } catch (error) {
      console.error(error);
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
      onClick={() => filterTasks(name)}
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
      ></textarea>
    </motion.div>
  );
}
