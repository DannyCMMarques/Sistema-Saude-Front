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

const TabelaComponent = ({ onClick }) => {
  const { filter, setCancelar, cancelar } = useContext(FilterContext);
  const [pacientes, setPacientes] = useState([]);
  const usePacienteService = servicePacientes();
  const [mostrar, setMostrar] = useState(false);
  const [buscar, setBuscar] = useState(false);
  const handleMostrar = () => {
    setMostrar(!mostrar);
    setCancelar(false);
    setBuscar(false);  // Resetar o estado buscar
  };
  const [dataTable, setDataTable] = useState([]);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["getPaciente"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
    enabled: false,
  });

  const handleBuscar = () => {
    setBuscar(true);
  };

  useEffect(() => {
    if (data) {
      let filteredData = data.data.pacientes;
      if (mostrar && buscar) {
        filteredData = filteredData.filter(
          (paciente) =>
            paciente.nome === filter.nome || paciente.sexo === filter.sexo
        );
      }
      setDataTable(filteredData);
      setPacientes(filteredData);
    }
  }, [data, filter, mostrar, buscar]);

  useEffect(() => {
    if (cancelar && data) {
      setDataTable(data.data.pacientes);
      setBuscar(false);  // Resetar o estado buscar
    }
  }, [cancelar, data]);

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

  const handleCloseSeach = () => {
    setCancelar(true);
    setBuscar(false);  // Resetar o estado buscar
  };

  const columns = [
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
            onClick={() => handleOpenModal(row)}
          >
            <FilePenLine size={20} color="white" />
          </button>
          <button
            className={styles.buttonIconDelete}
            onClick={() => deletarPaciente.mutate(row.id_paciente)}
          >
            <Trash2 size={20} color="white" />
          </button>
          <button className={styles.buttonIconExibir}>
            <NotepadText size={20} color="white" />
          </button>
        </div>
      ),
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [dataPaciente, setDataPaciente] = useState({});
  const [type, setType] = useState(null);

  const handleOpenModal = (data) => {
    setType("Editar");
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
        columns={columns}
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
