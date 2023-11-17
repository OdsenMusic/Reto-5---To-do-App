import React from "react";
import { useState } from "react";
import ColorSelector from "../ColorSelector";

import { motion, easeInOut } from "framer-motion";
import style from "../NavBarGroup/styles.module.css";

export default function NavBarGroup({ onChange, onClick, id, name, color }) {
  const [groupName, setGroupName] = useState("");

  function saveGroupName(event) {
    setGroupName(event.target.value);
    onChange(groupName, id);
  }

  function deleteGroup() {
    console.log(id);
    onClick(id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: 50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      layout
      className={`${style.groupFrame} ${style[color]}`}
    >
      <button className={style.deleteGroupButton} onClick={deleteGroup}>
        <img
          className={style.deleteGroupImg}
          src="src/assets/icons/cross-circle-svgrepo-com.svg"
          alt=""
        />
      </button>
      <input maxLength="13" onChange={saveGroupName} type="text" value={name} />
    </motion.div>
  );
}
