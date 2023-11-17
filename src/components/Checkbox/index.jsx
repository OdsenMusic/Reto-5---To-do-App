import React from "react";
import style from "./styles.module.css";

export default function Checkbox({ key, id, done }) {
  let isChecked = done;

  return (
    <label>
      <input checked={isChecked} type="checkbox" />
      <span></span>
    </label>
  );
}
