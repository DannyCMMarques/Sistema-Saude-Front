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
const Pessoas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [mostrar, setMostrar] = useState(false);
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
  // const handleMostrar = () => {
  //   setMostrar(!mostrar);
  // };

  function handleCloseModal() {
    refetch();
    setModalOpen(false);
  }

  useEffect(() => {
    // refetch();
  }, [data]);

  return (
    <ContainerMaster>
      <Modal size="small" isOpen={modalOpen} onClose={handleCloseModal}>
        <ContainerForm onClick={handleCloseModal} />
      </Modal>
      <div className={styles.pacientes}>
        <div className={styles.containerInfoTitleButton}>
          <h5>PACIENTES</h5>

          <button className={styles.buttonPaciente} onClick={handleOpenModal}>
            <UserRoundPlus />
            NOVO PACIENTE
          </button>
        </div>
        {/* {mostrar && <Pesquisar data={data}  />} */}

        <div className={styles.espacoTabela}>
          <TabelaComponent  />
        </div>
      </div>
    </ContainerMaster>
  );
};

export default Pessoas;
