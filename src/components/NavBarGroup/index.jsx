import React from "react";
import { useState } from "react";
import ColorSelector from "../ColorSelector";
import style from "../NavBar/styles.module.css";
import { motion } from "framer-motion";

export default function NavBarGroup({ onChange, onClick, id }) {
  const [groupName, setGroupName] = useState("");
  const [objectId, setObjectId] = useState(id);

  function saveGroupName(event) {
    setGroupName(event.target.value);
    onChange(groupName, id);
  }

  function deleteGroup(value) {
    onClick?.(value, id);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: 50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className={style.groupFrame}
    >
      <button className={style.deleteGroupButton} onClick={deleteGroup}>
        <img src="src/assets/icons/cross-circle-svgrepo-com.svg" alt="" />
      </button>
      <input onChange={saveGroupName} type="text" value={groupName} />
    </motion.div>
  );
}
