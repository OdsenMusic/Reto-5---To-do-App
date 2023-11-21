import React from "react";
import styles from "../GroupSelector/styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function GroupSelector({
  groupList,
  group,
  changeTaskAttribute,
  forceReload,
}) {
  const handleGroupChange = (event) => {
    changeTaskAttribute("group", event.target.value);
    forceReload();
  };

  const getButtonStyle = (groupName) => {
    return group === groupName ? styles.assignedGroup : "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, translateY: -50 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: [0.24, 0.46, 0.42, 1] }}
      exit={{ opacity: 0, scale: 0.5, translateY: -50 }}
      className={styles.groupSelectorContainer}
    >
      <button
        value="none"
        className={`${styles.groupSelectorButton} ${getButtonStyle("none")}`}
        onClick={handleGroupChange}
      >
        Ninguno
      </button>
      {groupList.map((e) => (
        <button
          key={e.name}
          onClick={handleGroupChange}
          className={`${styles.groupSelectorButton} ${getButtonStyle(e.name)}`}
          value={e.name}
        >
          {e.name}
        </button>
      ))}
    </motion.div>
  );
}
