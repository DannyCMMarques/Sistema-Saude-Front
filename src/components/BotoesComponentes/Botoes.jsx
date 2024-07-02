import React from "react";
import styles from "./Botoes.module.css";

const Botoes = ({ children, background, cor, type, onClick, style, size }) => {
  let fundo = "";
  let corTexto = "";
  switch (background) {
    case "azul":
      fundo = styles.botaoAzul;
      break;
    case "verde":
      fundo = styles.botaoVerde;
      break;
    case "branco":
      fundo = styles.botaoBranco;
      break;
    default:
      fundo = "";
  }

  switch (cor) {
    case "branco":
    case "branca":
      corTexto = styles.corBranco;
      break;
    case "preto":
    case "preta":
      corTexto = styles.corPreto;
      break;
    case "azul":
      corTexto = styles.corAzul;
      break;
    case "cinza":
      corTexto = styles.corCinza;
      break;
    default:
      corTexto = "";
  }

  let tamanho = "";
  if (size == "100") {
    tamanho = styles.tamanho100;
  }
  return (
    <button
      className={`${styles.btn} ${fundo} ${corTexto} ${tamanho}`}
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Botoes;
