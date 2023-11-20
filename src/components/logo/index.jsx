import React from "react";
import styles from "./styles.module.css";

export default function Logo({}) {
  return (
    <div className={styles.logo}>
      <img src="/icons/shop-svgrepo-com.svg" alt="" />
      Tasker
    </div>
  );
}
