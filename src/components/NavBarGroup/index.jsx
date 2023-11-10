import React from "react";
import { useState } from "react";

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
    <div className="group-frame">
      <button className="delete-group-button" onClick={deleteGroup}>
        <img src="src/assets/icons/cross-circle-svgrepo-com.svg" alt="" />
      </button>
      <input onChange={saveGroupName} type="text" value={groupName} />
    </div>
  );
}
