import React from "react";
export default function NavBarMenuCard({ icon, text }) {
  return (
    <section>
      <img src={icon} />
      {text}
    </section>
  );
}
