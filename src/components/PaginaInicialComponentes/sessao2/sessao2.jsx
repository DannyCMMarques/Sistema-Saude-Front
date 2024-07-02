import React from "react";
import styles from "./sessao2.module.css";
import CardsSessao2 from "../cardsSessao2/cardsSessao2";
import dataMockCard from "./mockCard.js";
const Sessao2 = () => {
  return (
    <div className={styles.containerSessao2}>
      <div>
        <div className={styles.tituloSessao2}>
          <h2> Nossos Serviços</h2>
        </div>
        <div className={styles.subtitulo2Sessao2}>
          <p>
            {" "}
            Nós providenciamos as melhores ferramentas para você otimizar o
            atendimento aos seus pacientes.{" "}
          </p>
        </div>
      </div>
      <div>
        <div className={styles.espacoCardsSessao2}>
          {dataMockCard.map((dados) => (
            <CardsSessao2
              key={dados.id}
              titulo={dados.titulo}
              subtitulo={dados.subtitulo}
              src={dados.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sessao2;
