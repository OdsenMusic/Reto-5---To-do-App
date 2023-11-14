import React from "react";
import style from "../NavBar/styles.module.css";

export default function AddGroupButton({}) {
  return (
    <button className="add-group">
      <img src="/icons/plus-circle-svgrepo-com.svg" alt="" />
      Crear grupo
    </button>
  );
}
