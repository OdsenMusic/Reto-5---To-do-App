import React from "react";
import styles from "../GroupSelector/styles.module.css";

export default function GroupSelector({ id, groupList, group, forceReload }) {
  const changeTaskGroup = async (event) => {
    console.log(event.target.value);
    let payload = {
      group: event.target.value,
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
  let assignedGroupVar = "";
  let noAssignedGroup = "";

  if (group === "none") {
    noAssignedGroup = styles.assignedGroup;
  } else {
    noAssignedGroup = "";
  }

  return (
    <div className={styles.groupSelectorContainer}>
      <button className={`${styles.groupSelectorButton} ${noAssignedGroup}`}>
        Ninguno
      </button>
      {groupList.map((e) => {
        if (e.name === group) {
          assignedGroupVar = styles.assignedGroup;
        } else {
          assignedGroupVar = "";
        }
        return (
          <button
            onClick={changeTaskGroup}
            className={`${styles.groupSelectorButton} ${assignedGroupVar}`}
            value={e.name}
          >
            {e.name}
          </button>
        );
      })}
    </div>
  );
}
