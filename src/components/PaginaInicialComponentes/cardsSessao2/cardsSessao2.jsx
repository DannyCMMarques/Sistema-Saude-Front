import React from "react";
import styles from "./cardsSessao2.module.css";
const CardsSessao2 = ({ src, titulo, subtitulo }) => {
  return (
    <div className={styles.containerCardsSessao2}>
      <div className={styles.sessaoImagemCard}>
        <img src={src} />
      </div>
      <div className={styles.sessaoTextoCard}>
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>
    </div>
  );
};

export default CardsSessao2;
