import React from "react";
import { useState } from "react";

export default function NavBarGroup({ onChange, id }) {
  const [groupName, setGroupName] = useState("");
  const [objectId, setObjectId] = useState(id);

  function saveGroupName(event) {
    setGroupName(event.target.value);
    onChange(groupName, id);
  }

  return (
    <div className="group-frame">
      <input onChange={saveGroupName} type="text" value={groupName} />
    </div>
  );
}
