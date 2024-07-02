import React, { useEffect, useState } from "react";
import styles from "./cards.module.css";
import { BookOpenText, LineChart, UsersRound } from "lucide-react";
const cards = ({ tipo, onClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let corFundo = "";
  tipo === "paciente"
    ? (corFundo = "corAzul")
    : tipo === "consulta"
    ? (corFundo = "corVerde")
    : "";
  tipo === "metas" ? (corFundo = "corLaranja") : "";

  const size = windowWidth > 450 ? 55 : 40;

  return (
    <button
      className={`${styles.containerCards} ${styles[corFundo]}`}
      onClick={onClick}
    >
      <div className={styles.iconCard}>
        {tipo === "consulta" ? (
          <BookOpenText size={size} />
        ) : tipo === "paciente" ? (
          <UsersRound size={size} />
        ) : tipo === "metas" ? (
          <LineChart size={size} />
        ) : (
          ""
        )}
      </div>

      <div className={styles.textCard}>
        {tipo === "consulta" ? (
          <p>Nova Consulta </p>
        ) : tipo === "paciente" ? (
          <p>Novo Paciente </p>
        ) : tipo === "metas" ? (
          <p>Adicionar Meta</p>
        ) : (
          ""
        )}
      </div>
    </button>
  );
};

export default cards;
