import styles from "./TabelaComponent.module.css";
import DataTable from "react-data-table-component";
import { FilePenLine, NotepadText, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import serviceConsultas from "../../service/serviceConsultas";
import { useQuery } from "@tanstack/react-query";

const ConsultaTable = ({ onClick }) => {
  const [consultas, setConsultas] = useState([]);
  const useConsultService = serviceConsultas();

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['getConsultas'],
    queryFn: async () => {
      const data = await useConsultService.getConsultas();
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setConsultas(data?.data?.consulta || []); // Garanta que os dados existem e estão na estrutura correta
    }
  }, [data]);

  const columns = [
    {
      name: "Diagnostico",
      selector: (row) => row.consulta.queixas, // Garanta que isso corresponde à estrutura dos dados
      sortable: true,
    },
    {
      name: (
        <button className={styles.buttonSearch} onClick={onClick}>
          <Search />
        </button>
      ),
      cell: (row) => (
        <div className={styles.iconesTabela}>
          <button className={styles.buttonIconEdit}>
            <FilePenLine size={20} color="white" />
          </button>
          <button className={styles.buttonIconDelete}>
            <Trash2 size={20} color="white" />
          </button>
          <button className={styles.buttonIconExibir}>
            <NotepadText size={20} color="white" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      pointerOnHover
      direction="auto"
      subHeaderAlign="right"
      columns={columns}
      data={consultas} 
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
  );
};


export default ConsultaTable;
