import React, { useContext, useEffect, useState } from "react";
import styles from "./ConsultaForm.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Botoes from "./../BotoesComponentes/Botoes";
import serviceConsultas from "../../service/serviceConsultas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerMaster from "../../components/container";
import servicePacientes from "../../service/servicePacientes";
import { Search } from "lucide-react";
import { ConsultaContext } from "../../context/ConsultaContext";
import { useLocation } from "react-router-dom";

const errorValidator = (data) =>
  toast(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    type: "error",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const successValidation = (data) =>
  toast(`${data}`, {
    position: "top-right",
    autoClose: 1500,
    type: "success",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });




const ConsultaForm = () => {
 const validationSchemaLogin = z.object({
    diagnostico: z.string(),
    queixas: z.string(),
    historico: z.string(),
    historicopassado: z.string(),
    quais: z.string(),
    peso: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    altura: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    imc: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    pressaoD: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    pressaoS: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    temperatura: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    observacoes: z.string(),
    observacoes2: z.string().optional(),
    FR: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    FC: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    id_paciente: z.string(),
  });

 const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      diagnostico: "",
      queixas: "",
      historico: "",
      historicopassado: "",
      quais: "",
      antecendentes: "",
      peso: "",
      altura: "",
      imc: "",
      pressaoD: "",
      pressaoS: "",
      temperatura: "",
      observacoes: "",
      observacoes2: "",
    },
  });



  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part);

//   const [mode,setMode]= useState("")
//  const [id,setId] =useState("")
let mode = ""
let id = ""
if (pathParts.length >=3 && pathParts[1] === "editar") {
    mode = "editar"
    id = pathParts[2]
    console.log(id)
  } else if (pathParts.length === 3 && pathParts[1] === "exibir") {
   mode= "exibir";
    id=pathParts[2]
  } else {
    mode ="registrar";
    id=""
  }
  
  const [resultado, setResultado] = useState("");
   const [mudanca, setMudanca] = useState(true);

  const mudarSessao = () => {
    setMudanca(!mudanca);
  };
  const useServiceConsultas = serviceConsultas();
  const usePacienteService = servicePacientes();

  //  const [dataCon, setDataCon] = useState([])

  // const { tipoForm, setTipoForm } = useContext(ConsultaContext);
  const [formData, setFormData] = useState("");
 

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["getPacientes"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
    enabled: true,
  });
  const nomesFiltrados =
    data?.data.pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().includes(resultado.toLowerCase())
    ) || [];

    const { isPendingCon, isErrorCon, dataCon, errorCon, refetchCon } = useQuery({
      queryKey: ["getConsultasId"],
      queryFn: async () => {
        const dataCon = await useServiceConsultas.getConsultasId(id);
        return dataCon;
      },
      enabled: true,
    });
 console.log(dataCon)
  const fazerRegistroConsultas = useMutation({
    mutationFn: (payload) => useServiceConsultas.registrarConsulta(payload, payload.id_consulta),

    // id ===null    : useServiceConsultas.editarConsultas(payload, payload.id_consulta),
    onSuccess: (response) => {
      if (response) {
        successValidation("Consulta feita com sucesso!");
      }
    },
    onError: (err) => {
      console.log(err);
      errorValidator(err.data.msg ? err.data.msg : err.data.error);
    },
  });

  const editarConsultas = useMutation({
    mutationFn: (payload) =>
      useServiceConsultas.editarConsultas(payload, payload.id_consulta),
    onError: (err) => {
      console.log(err);
    },
  });

 

  // so vc agora jogar os valores assim

  const onSubmit = (data) => {
    console.log(data);
    const datas = {
      ...data,
      imc: parseInt(data.imc),
      peso: parseInt(data.peso),
      pressaoD: parseInt(data.pressaoD),
      pressaoS: parseInt(data.pressaoS),
      temperatura: parseInt(data.temperatura),
      altura: parseInt(data.altura),
      fr: parseInt(data.FR),
      fc: parseInt(data.FC),
      id_paciente: parseInt(data.id_paciente),
    };
    mode === "registrar" ?  fazerRegistroConsultas.mutate(datas) : 
    mode === 'editar' ? editarConsultas.mutate(datas, datas.id_consulta) : ""
   
    setFormData(datas);
    console.log(formData);
  // reset();
  };

  useEffect(() => {
    if (formData && mode === "editar") {
       reset(dataCon);
    }
  }, [formData, mode]);
console.log(formData);
//  useEffect(() => {
  
//     mode === "editar" ? editarConsultas.mutate(formData, formData.id_consulta) : 
//     mode === "exibir" ? 
//     mode === ' editar' ? console.log("AHHHHHHHHHH") : ""
//   }, [tipoForm, data]);


  return (
    <ContainerMaster>
      <div className={styles.consultaForm}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className={styles.pesquisarNome}>
          <input
            type="text"
            placeholder="Buscar Paciente"
            onChange={(e) => setResultado(() => e.target.value)}          />
          <p className={styles.icon_pesquisarNome}>
            <Search />
          </p>
        </div>
        <div className={styles.container}>
          <form
            className={styles.formConsultas}
            onSubmit={handleSubmit(onSubmit)}
          >
            {mudanca === true ? (
              <>
                <div style={{ display: "flex" }}>
                  <div className={styles.namePaciente}>
                    <label htmlFor="id_paciente">Nome do Paciente: </label>
                    <select
                    
                      defaultValue={dataCon?.id_paciente || ""}
                      {...register("id_paciente")}
                      
                    >
                      {nomesFiltrados.map((paciente) => (
                        <option
                          value={paciente.id_paciente}
                          key={paciente.id_paciente}
                        >
                          {paciente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.nameMedico}>
                    <label htmlFor="id_paciente">Nome do Médico(a): </label>
                    <input type="text" />
                  </div>
                </div>

                <div className={styles.sessao1}>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="diagnostico">Diagnóstico Clínico</label>
                    <textarea
                      id="diagnostico"
                      rows="7"
                      cols="50"
                      {...register("diagnostico")}
                      defaultValue={dataCon?.diagnostico || ""}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="queixas">Queixas principais</label>
                    <textarea
                      id="queixas"
                      rows="7"
                      cols="50"
                      defaultValue={dataCon?.queixas || ""}
                      {...register("queixas")}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="historico">Histórico de doença</label>
                    <textarea
                      id="historico"
                      rows="7"
                      cols="50"
                      defaultValue={dataCon?.historico || ""}
                      {...register("historico")}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="historicopassado">
                      Hist. de doença pregressa
                    </label>
                    <textarea
                      id="historicopassado"
                      rows="7"
                      cols="50"
                      defaultValue={dataCon?.historicopassado || ""}
                      {...register("historicopassado")}
                    />
                  </div>
                  <div>
                    <label htmlFor="quais">Já realizou alguma cirurgia?</label>
                    <textarea
                      id="quais"
                      rows="7"
                      cols="50"
                      defaultValue={dataCon?.quais || ""}
                      {...register("quais")}
                    />
                  </div>
                  <div>
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                      id="observacoes"
                      rows="7"
                      cols="50"
                      defaultValue=""
                      {...register("observacoes")}
                    />
                  </div>
                </div>
                <div className={styles.botaoMudar}>
                  <Botoes background="azul" cor="branca" onClick={mudarSessao}>
                    Ir para Exame Físico
                  </Botoes>
                </div>
              </>
            ) : (
              <>
                <div className={styles.sessao2}>
                  <div>
                    <label htmlFor="peso">Peso</label>
                    <input id="peso" type="number" {...register("peso")} />
                  </div>
                  <div>
                    <label htmlFor="altura">Altura</label>
                    <input id="altura" type="number" {...register("altura")} />
                  </div>
                  <div>
                    <label htmlFor="imc">IMC</label>
                    <input id="imc" type="number" {...register("imc")} />
                  </div>
                  <div>
                    <label htmlFor="temperatura">Temperatura</label>
                    <input
                      id="temperatura"
                      type="number"
                      {...register("temperatura")}
                    />
                  </div>
                  <div>
                    <label htmlFor="FR">Frequência Respiratória</label>
                    <input id="FR" type="number" {...register("FR")} />
                  </div>
                  <div>
                    <label htmlFor="FC">Frequência Cardíaca</label>
                    <input id="FC" type="number" {...register("FC")} />
                  </div>
                  <div>
                    <label htmlFor="pressaoS">Pressão Sistólica</label>
                    <input
                      id="pressaoS"
                      type="number"
                      {...register("pressaoS")}
                    />
                  </div>
                  <div>
                    <label htmlFor="pressaoD">Pressão Diastólica</label>
                    <input
                      id="pressaoD"
                      type="number"
                      {...register("pressaoD")}
                    />
                  </div>
                </div>
                <div className={styles.botoesSessao2}>
                  <div>
                    <Botoes
                      background="branco"
                      cor="azul"
                      onClick={mudarSessao}
                    >
                      Voltar
                    </Botoes>
                  </div>
                  <div>
                    <Botoes type="submit" cor="branco" background="azul">
                      Salvar Alterações
                    </Botoes>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </ContainerMaster>
  );
};

export default ConsultaForm;
