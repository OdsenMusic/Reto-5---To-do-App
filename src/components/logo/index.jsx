import React from "react";
import style from "../NavBar/styles.module.css";

export default function Logo({}) {
  return (
    <div className={style.logo}>
      <img src="/icons/shop-svgrepo-com.svg" alt="" />
      Tasker
    </div>
  );
}
