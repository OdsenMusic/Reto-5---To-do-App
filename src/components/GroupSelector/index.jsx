import React from "react";
import styles from "../GroupSelector/styles.module.css";
import { motion } from "framer-motion";

export default function GroupSelector({ id, groupList, group, forceReload }) {
  const handleGroupChange = async (groupName) => {
    let payload = {
      group: groupName,
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
        onClick={() => {
          handleGroupChange("none");
        }}
      >
        Ninguno
      </button>
      {groupList.map((e) => (
        <button
          key={e.name}
          onClick={() => {
            handleGroupChange(e.name);
          }}
          className={`${styles.groupSelectorButton} ${getButtonStyle(e.name)}`}
          value={e.name}
        >
          {e.name}
        </button>
      ))}
    </motion.div>
  );
}
