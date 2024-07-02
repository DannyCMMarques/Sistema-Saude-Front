import React from "react";
import styles from "./sessao3.module.css";
import Botoes from "../../BotoesComponentes/Botoes";
const Sessao3 = () => {
  return (
    <div className={styles.containerSessao3}>
      <div className={styles.sessao3Imagem}></div>

      <div className={styles.sessao3Texto}>
        <div className={styles.sessao3Titulo}>
          <h2> Gere rapidamente seus receituários</h2>
        </div>

        <div className={styles.subtituloSessao3}>
          <p>
            Você pode gerar e imprimir receituários de forma rápida e segura,
            proporcionando praticidade tanto para você quanto para seus
            pacientes. Nossa solução é segura e fácil de usar, ajudando você a
            manter todas as informações organizadas e ao seu alcance
          </p>
        </div>
        <div className={styles.botoesSessao3Principal}>
          <a href="/login">
            <Botoes background="azul" cor="branca" size="300">
              Entre Gratuitamente
            </Botoes>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sessao3;
