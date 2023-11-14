import React from "react";
import { useState } from "react";
import ColorSelector from "../ColorSelector";
import style from "../NavBar/styles.module.css";

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
    <div className={style.groupFrame}>
      <button className={style.deleteGroupButton} onClick={deleteGroup}>
        <img src="src/assets/icons/cross-circle-svgrepo-com.svg" alt="" />
      </button>
      <input onChange={saveGroupName} type="text" value={groupName} />
      <ColorSelector />
    </div>
  );
}
