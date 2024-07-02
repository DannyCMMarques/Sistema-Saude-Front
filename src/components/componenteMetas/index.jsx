import React, { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import Botoes from "../BotoesComponentes/Botoes";

const ComponenteMetas = ({ onClick }) => {
  const { metaConsultas, metaPacientes, setMetaConsultas, setMetaPacientes } =
    useContext(ThemeContext);

  const handleSubmit = () => {};

  return (
    <div>
      <div
        style={{ borderBottom: "1px solid gray" }}
        className={styles.tituloForm}
      >
        INSIRA SUAS METAS
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.corpoForm}>
          <div>
            <label>Meta Pacientes</label>
            <input
              type="number"
              value={metaPacientes}
              onChange={(e) => setMetaPacientes(e.target.value)}
            />
          </div>
          <div>
            <label>Meta Consultas</label>
            <input
              type="number"
              value={metaConsultas}
              onChange={(e) => setMetaConsultas(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.sessaoBotoesForm}>
          <Botoes
            cor="branca"
            background="azul"
            type="submit"
            className={styles.botao}
          >
            ATUALIZAR METAS
          </Botoes>
          <Botoes cor="azul" background="branco" onClick={onClick}>
            Voltar
          </Botoes>
        </div>
      </form>
    </div>
  );
};

export default ComponenteMetas;
