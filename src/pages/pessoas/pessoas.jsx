import React, { useEffect, useState } from "react";
import styles from "./pessoa.module.css";
import ContainerForm from "../../components/ContainerForm/ContainerForm";
import TabelaComponent from "../../components/TabelaComponent/TabelaComponent";
import ContainerMaster from "../../components/container";
import {
  FilePenLine,
  NotepadText,
  Search,
  Trash2,
  UserRoundPlus,
  UserRoundSearch,
} from "lucide-react";
import Modal from "./../../components/Modal/Modal";
import Pesquisar from "../../components/Pesquisar/Pesquisar.jsx";
import servicePacientes from "../../service/servicePacientes.js";
import { useQuery } from "@tanstack/react-query";
import SideMenu from "../../components/sideMenu/index.jsx";
const Pessoas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const usePacienteService = servicePacientes();

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["getPaciente"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  function handleCloseModal() {
    refetch();
    setModalOpen(false);
  }

  useEffect(() => {}, [data]);

  return (
    <ContainerMaster>
      <SideMenu />

      <Modal size="small" isOpen={modalOpen} onClose={handleCloseModal}>
        <ContainerForm onClick={handleCloseModal} type="Registrar" />
      </Modal>
      <div className={styles.pacientes}>
        <div className={styles.containerInfoTitleButton}>
          <h5>PACIENTES</h5>

          <button className={styles.buttonPaciente} onClick={handleOpenModal}>
            <UserRoundPlus />
            NOVO PACIENTE
          </button>
        </div>

        <div className={styles.espacoTabela}>
          <TabelaComponent />
        </div>
      </div>
    </ContainerMaster>
  );
};

export default Pessoas;
