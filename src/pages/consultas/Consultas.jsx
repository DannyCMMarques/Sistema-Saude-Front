import React, { useEffect, useState } from "react";
import ConsultaForm from "./../../components/ConsultaForm/ConsultaForm";
import styles from "./consultas.module.css";
import ContainerMaster from "../../components/container";
import { UserRoundPlus } from "lucide-react";
import TabelaComponent from "./../../components/TabelaComponent/TabelaComponent";
import { useQuery } from "@tanstack/react-query";
import servicePacientes from "../../service/servicePacientes";
import SideMenu from "../../components/sideMenu";
const Consultas = () => {
  return (
    <ContainerMaster>
      <SideMenu />

      <div className={styles.titleButton}>
        <h5>CONSULTAS</h5>
        <a href="/consultas/registrar">
          <button className={styles.buttonConsulta}>NOVA CONSULTA</button>
        </a>
      </div>

      <div className={styles.espacoTabela}>
        <TabelaComponent />
      </div>
    </ContainerMaster>
  );
};

export default Consultas;
