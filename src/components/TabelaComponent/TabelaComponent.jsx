import styles from "./TabelaComponent.module.css";
import DataTable from "react-data-table-component";
import { FilePenLine, NotepadText, Search, Trash2 } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import servicePacientes from "../../service/servicePacientes";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import ContainerForm from "../ContainerForm/ContainerForm";
import Pesquisar from "../Pesquisar/Pesquisar";
import { FilterContext } from "../../context/useFilterContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import serviceConsultas from "../../service/serviceConsultas";
import ConsultaForm from "../ConsultaForm/ConsultaForm";
import { ConsultaContext } from "../../context/ConsultaContext";

const TabelaComponent = ({ onClick }) => {


  const navegar = useNavigate();
  const { filter, setCancelar, cancelar } = useContext(FilterContext);

  const [pacientes, setPacientes] = useState([]);

  const usePacienteService = servicePacientes();
  const useConsultService = serviceConsultas();

  const [mostrar, setMostrar] = useState(false);
  const [buscar, setBuscar] = useState(false);

  const location = useLocation();
  console.log(location.pathname);
  const handleMostrar = () => {
    setMostrar(!mostrar);
    setCancelar(false);
    setBuscar(false); // Resetar o estado buscar
  };

  const [dataTable, setDataTable] = useState([]);
  let { isPending, isError, data, error, refetch } = "";
  location.pathname === "/consultas"
    ? ({ isPending, isError, data, error, refetch } = useQuery({
        queryKey: ["getConsultas"],
        queryFn: async () => {
          const data = await useConsultService.getConsultas();
          return data;
        },
      }))
    : ({ isPending, isError, data, error, refetch } = useQuery({
        queryKey: ["getPaciente"],
        queryFn: async () => {
          const data = await usePacienteService.getPacientes();
          return data;
        },
        enabled: false,
      }));

  const handleBuscar = () => {
    setBuscar(true);
  };
  
 

  useEffect(() => {
    if (data) {
      let filteredData = "";
      location.pathname === "/consultas"
        ? (filteredData = data.data.consulta)
        : (filteredData = data.data.pacientes);

      if (mostrar && buscar) {
        filteredData = filteredData.filter(
          (paciente) => paciente.nome === filter.nome
        );
      }
      setDataTable(filteredData);
      setPacientes(filteredData);
      console.log(filteredData);
    }
  }, [data, filter, mostrar, buscar]);

  useEffect(() => {
    if (cancelar && data) {
      location.pathname === "/consultas"
        ? setDataTable(data.data.consulta)
        : setDataTable(data.data.pacientes);

      setBuscar(false); // Resetar o estado buscar
    }
  }, [cancelar, data]);
console.log(dataTable);
  const deletarPaciente = useMutation({
    mutationFn: async (payload) => {
      await usePacienteService.deletarPacientes(payload);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const deletarConsulta = useMutation({
    mutationFn: async (payload) => {
      await useConsultService.deletarConsultas(payload);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleCloseSeach = () => {
    setCancelar(true);
    setBuscar(false); // Resetar o estado buscar
  };

   const handleEditar = (id) =>{
  navegar(`/consultas/editar/${id}`)
 }
  const columnsPaciente = [
    {
      name: "Pacientes",
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: (row) => row.telefone,
      sortable: true,
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Idade",

      selector: (row) => row.idade,
      sortable: true,
    },
    {
      name: "Cidade",
      selector: (row) => row.cidade,
      sortable: true,
    },
    {
      name: (
        <>
          {cancelar && (
            <button className={styles.buttonSearch} onClick={handleMostrar}>
              <Search />
            </button>
          )}
        </>
      ),
      cell: (row) => (
        <div className={styles.iconesTabela}>
          <button
            className={styles.buttonIconEdit}
            onClick={() => handleOpenModal(row, "Editar")}
          >
            <FilePenLine size={20} color="white" />
          </button>
          <button
            className={styles.buttonIconDelete}
            onClick={() => deletarPaciente.mutate(row.id_paciente)}
          >
            <Trash2 size={20} color="white" />
          </button>
          <button
            className={styles.buttonIconExibir}
            onClick={() => handleOpenModal(row, "Exibir")}
          >
            <NotepadText size={20} color="white" />
          </button>
        </div>
      ),
    },
  ];
  const columnsConsulta = [
    {
      name: "Pacientes",
      selector: (row) => row.paciente.nome,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: (row) => row.paciente.telefone,
      sortable: true,
    },
    {
      name: "Queixas",
      selector: (row) => row.consulta.queixas,
      sortable: true,
    },
    {
      name: "Data",
      selector: "",
      sortable: true,
    },
    {
      name: "Médicos",
      selector: "",
      sortable: true,
    },

    {
      name: (
        <>
          {cancelar && (
            <button className={styles.buttonSearch} onClick={handleMostrar}>
              <Search />
            </button>
          )}
        </>
      ),
      cell: (row) => (
        <div className={styles.iconesTabela}>
         

            <button className={styles.buttonIconEdit} onClick={()=>handleEditar(row.consulta.id_consulta)} >
              <FilePenLine size={20} color="white" />
            </button>
          
          <button
            className={styles.buttonIconDelete}
            onClick={() => deletarConsulta.mutate(row.consulta.id_consulta)}
          >
            <Trash2 size={20} color="white" />
          </button>
          <button
            className={styles.buttonIconExibir}
            onClick={() => handleOpenModal(row, "Exibir")}
          >
            <NotepadText size={20} color="white" />
          </button>
        </div>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [dataPaciente, setDataPaciente] = useState({});
  const [type, setType] = useState(null);

  const handleOpenModal = (data, type) => {
    setType(type);
    setModalOpen(true);
    setDataPaciente(data);
  };

  function handleCloseModal() {
    setTimeout(() => {
      setModalOpen(false);
      refetch();
    }, 100);
  }

  return (
    <>
      <Modal size="small" isOpen={modalOpen} onClose={handleCloseModal}>
        <ContainerForm
          onClick={handleCloseModal}
          data={dataPaciente}
          type={type}
        />
      </Modal>
      {!cancelar && <Pesquisar data={data} onClick={handleBuscar} />}

      <DataTable
        pointerOnHover
        direction="auto"
        subHeaderAlign="right"
        columns={
          location.pathname === "/consultas" ? columnsConsulta : columnsPaciente
        }
        data={dataTable}
        responsive={true}
        pagination
        theme="solarized"
        noDataComponent="Registro não encontrado"
        customStyles={{
          rows: {
            style: {
              "&:hover": {
                backgroundColor: "#e9ecef",
                cursor: "pointer",
                "& .iconesTabela": {
                  display: "flex",
                },
              },
            },
          },
        }}
      />
    </>
  );
};

export default TabelaComponent;
