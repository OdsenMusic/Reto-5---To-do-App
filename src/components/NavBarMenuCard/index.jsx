import React from "react";
import style from "../NavBar/styles.module.css";

export default function NavBarMenuCard({ icon, text }) {
  return (
    <section>
      <img src={icon} />
      {text}
    </section>
  );
}
