import React, { forwardRef } from "react";
import ContainerMaster from "../../components/container";
import styles from "./receitasImpressoes.module.css";

const ReceitasImpressoes = forwardRef((data, ref) => {
  return (
    <div ref={ref}>
      <div className={styles.containerReceitas}>
        <div>
          <h1 style={{ textAlign: "center" }}>RECEITUÁRIO SIMPLES </h1>
        </div>
        <div className={styles.sessao1}>
          <div
            className={styles.divSessao}
            style={{ display: "flex", justifyContent: "start", margin: 0 }}
          >
            <h4>PACIENTE:</h4>
            <p>{data?.data.nomePaciente}</p>
          </div>
          <div className={styles.divSessao} style={{ display: "flex" }}>
            <h4>DATA:</h4>
            <p>{data?.data.dataReceita}</p>
          </div>
        </div>
        <div className={styles.sessao2}>
          <h4>PRESCRIÇÃO:</h4>
          <div
            className={styles.areaPrescricao}
            style={{ minHeight: 500, backgroundColor: "#f4f4f4" }}
          >
            <p style={{ fontSize: 20 }}>{data?.data.receita}</p>
          </div>
        </div>
        <div className={styles.sessao3}>
          <div
            style={{ display: "flex", margin: 0 }}
            className={styles.divSessao}
          >
            <h4>NOME DO MÉDICO(A):</h4>
            <p>{data?.data.nomeMedico}</p>
          </div>
          <div
            style={{ display: "flex", marginLeft: 10, width: 20 }}
            className={styles.divSessao}
          >
            <h4>CRM:</h4>
            <p>{data?.data.crm}</p>
          </div>
        </div>
        <div className={styles.assinatura}></div>
        <div style={{ display: "flex", marginTop: 5 }}>
          <small>ASSINATURA DO MÉDICO(A)</small>
        </div>
        <div className={styles.sessao4}>
          <img src="./../../../logoHeal.png" />
          <p className={styles.LogoTitle}>MEDICALPLUS</p>
        </div>
      </div>
    </div>
  );
});

ReceitasImpressoes.displayName = "ReceitasImpressoes";

export default ReceitasImpressoes;
