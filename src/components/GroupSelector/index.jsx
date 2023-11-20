import React from "react";
import styles from "../GroupSelector/styles.module.css";

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
    <div className={styles.groupSelectorContainer}>
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
    </div>
  );
}
