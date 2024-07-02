import React, { useEffect, useState } from "react";
import ContainerMaster from "../../components/container";
import SideMenu from "../../components/sideMenu";
import styles from "./home.module.css";
import Cards from "../../components/cards/cards";
import Modal from "../../components/Modal/Modal";
import ContainerForm from "../../components/ContainerForm/ContainerForm";
import { useNavigate } from "react-router-dom";
import GraficoComponente from "../../components/graficoComponent";
import CalendarioComponent from "../../components/CalendarioComponent/CalendarioComponent";
import ComponenteMetas from "../../components/componenteMetas";
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  const handleConsultas = () => {
    navigate("/consultas/registrar");
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const width = windowWidth > 450 ? 500 : 200;
  const height = windowWidth > 450 ? 300 : 200;

  return (
    <ContainerMaster>
      <SideMenu />
      <Modal size="small" isOpen={modalOpen} onClose={handleCloseModal}>
        <ContainerForm onClick={handleCloseModal} type="Registrar" />
      </Modal>
      <Modal size="small" isOpen={modalOpen2} onClose={handleCloseModal2}>
        <ComponenteMetas onClick={handleCloseModal2} />
      </Modal>
      <div className={styles.containerDashboard}>
        <div className={styles.areaCards}>
          <Cards tipo="paciente" onClick={handleOpenModal} />
          <Cards tipo="consulta" onClick={handleConsultas} />
          <Cards tipo="metas" onClick={handleOpenModal2} />
        </div>
        <div className={styles.sessao2}>
          <div className={styles.grafico}>
            <GraficoComponente width={width} height={height} />
          </div>
          <div className={styles.calendario}>
            <CalendarioComponent />
          </div>
        </div>
      </div>
    </ContainerMaster>
  );
};

export default Home;
