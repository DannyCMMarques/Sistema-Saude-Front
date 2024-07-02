import React from "react";
import styles from "./sessao1.module.css";
import Botoes from "./../../BotoesComponentes/Botoes";
const Sessao1 = () => {
  return (
    <div className={styles.containerSessao1}>
      <div className={styles.sessao1Texto}>
        <div className={styles.sessao1Titulo}>
          <h2> Sistema Para Consultório Médico</h2>
        </div>
        <div className={styles.subtituloSessao1}>
          <p>
            {" "}
            Com a MedicalPlus, você pode gerenciar e otimizar cadastros,
            prontuários e receituários de maneira digital. Nossa plataforma
            disponibiliza ferramentas inovadoras e acessíveis, que simplificam a
            rotina dos profissionais de saúde.
          </p>
        </div>
        <div className={styles.botoesSessao1Principal}>
          <a href="/login">
            <Botoes background="azul" cor="branca" size="100">
              Entre Gratuitamente
            </Botoes>
          </a>
        </div>
      </div>
      <div className={styles.sessao1Imagem}></div>
    </div>
  );
};

export default Sessao1;
