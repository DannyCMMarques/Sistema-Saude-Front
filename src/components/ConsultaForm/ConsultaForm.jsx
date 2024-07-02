import React, { useContext, useEffect, useState } from "react";
import styles from "./ConsultaForm.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Botoes from "../BotoesComponentes/Botoes";
import serviceConsultas from "../../service/serviceConsultas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerMaster from "../container";
import servicePacientes from "../../service/servicePacientes";
import { Search } from "lucide-react";
import { ConsultaContext } from "../../context/ConsultaContext";
import { useLocation } from "react-router-dom";
import SideMenu from "../sideMenu";

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

const ConsultaForm = ({ type }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part);
  const [dataCon, setDataCon] = useState({});
  const [exibirFiltro, setExibirFiltro] = useState(false);

  let mode = "registrar";
  let id = null;

  if (pathParts.length === 3 && pathParts[1] === "editar") {
    mode = "editar";
    id = pathParts[2];
  } else if (pathParts.length === 3 && pathParts[1] === "exibir") {
    mode = "exibir";
    id = pathParts[2];
  }
  if (pathParts.length === 2 && pathParts[1] === "registrar") {
    mode = "registrar";
    id = "";
  }

  const { tipoForm, setTipoForm } = useContext(ConsultaContext);

  const [mudanca, setMudanca] = useState(true);

  const mudarSessao = () => {
    setMudanca(!mudanca);
  };

  const [resultado, setResultadoNome] = useState("");

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
    fr: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    fc: z.union([z.number(), z.string().regex(/^\d*$/)]).optional(),
    id_paciente: z.string(),
    nome_medico: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
  });

  const useServiceConsultas = serviceConsultas();
  const usePacienteService = servicePacientes();

  const { data } = useQuery({
    queryKey: ["getPacientes"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
    enabled: true,
  });

  const { data: consultaData, refetch: refetchConsulta } = useQuery({
    queryKey: ["getConsultasId", id],
    queryFn: async () => {
      if (id !== null) {
        const dataConsulta = await useServiceConsultas.getConsultasId(id);
        setDataCon(dataConsulta.data[0]);
        for (const key in dataConsulta.data[0]) {
          setValue(key, dataConsulta.data[0][key]);
        }
        return dataConsulta.data;
      }
    },
    enabled: !!id,
  });

  const nomesFiltrados =
    data?.data.pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().includes(resultado.toLowerCase())
    ) || [];

  const fazerRegistro = useMutation({
    mutationFn: (payload) =>
      useServiceConsultas.registrarConsulta(payload, payload.id_paciente),
    onSuccess: (response) => {
      if (response) {
        successValidation("Consulta feita com sucesso!");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const editarConsultas = useMutation({
    mutationFn: (payload) => useServiceConsultas.editarConsultas(payload, id),
    onSuccess: (response) => {
      successValidation("Edição feita com sucesso!");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    const datas = {
      ...data,
      imc: parseInt(data.imc),
      peso: parseInt(data.peso),
      pressaoD: parseInt(data.pressaoD),
      pressaoS: parseInt(data.pressaoS),
      temperatura: parseInt(data.temperatura),
      altura: parseInt(data.altura),
      fr: parseInt(data.fr),
      fc: parseInt(data.fc),
      id_paciente: parseInt(data.id_paciente),
    };
    if (mode === "editar") {
      editarConsultas.mutate(datas);
    } else if (mode === "registrar") {
      fazerRegistro.mutate(datas);
      reset();
    } else {
      return datas;
    }
  };

  const handleExibirFiltro = () => {
    setExibirFiltro(!exibirFiltro);
  };

  return (
    <ContainerMaster>
      <SideMenu />
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
          {exibirFiltro ? (
            <div className={styles.containerPesquisar}>
              <input
                type="text"
                placeholder="Buscar Paciente"
                onChange={(e) => setResultadoNome(e.target.value)}
                className={styles.input}
              />
              <span className={styles.icon}>
                <Search size={20} />
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.container}>
          <form
            className={styles.formConsultas}
            onSubmit={handleSubmit(onSubmit)}
          >
            {mudanca ? (
              <>
                <div className={styles.containerSessao1}>
                  <div className={styles.nomePacMedico}>
                    <label htmlFor="id_paciente">
                      Nome do Paciente:
                      <button
                        className={styles.buttonSearch}
                        onClick={handleExibirFiltro}
                      >
                        <Search size={15} />
                      </button>
                    </label>
                    <div style={{ width: "100%" }}>
                      <select
                        {...register("id_paciente")}
                        readOnly={mode === "exibir"}
                        onChange={(e) => console.log(e.target.value)}
                      >
                        {nomesFiltrados.length === 0 ? (
                          <option value="null"> Nome não Encontrado</option>
                        ) : (
                          nomesFiltrados.map((paciente) => (
                            <option
                              value={paciente.id_paciente}
                              key={paciente.id_paciente}
                            >
                              {paciente.nome}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className={styles.nameMedico}>
                    <label htmlFor="id_paciente">Nome do Médico(a): </label>
                    <input
                      type="text"
                      readOnly={mode === "exibir"}
                      {...register("nome_medico")}
                    />
                  </div>
                </div>
                <div className={styles.sessao1}>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="diagnostico">Diagnóstico Clínico</label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="diagnostico"
                      rows="7"
                      cols="50"
                      {...register("diagnostico")}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="queixas">Queixas principais</label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="queixas"
                      rows="7"
                      cols="50"
                      {...register("queixas")}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="historico">Histórico de doença</label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="historico"
                      rows="7"
                      cols="50"
                      {...register("historico")}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="historicopassado">
                      Hist. de doença pregressa
                    </label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="historicopassado"
                      rows="7"
                      cols="50"
                      {...register("historicopassado")}
                    />
                  </div>
                  <div>
                    <label htmlFor="quais">Já realizou alguma cirurgia?</label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="quais"
                      rows="7"
                      cols="50"
                      {...register("quais")}
                    />
                  </div>
                  <div>
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                      readOnly={mode === "exibir"}
                      id="observacoes"
                      rows="7"
                      cols="50"
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
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="peso">Peso</label>
                    <input
                      id="peso"
                      type="number"
                      {...register("peso")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="altura">Altura</label>
                    <input
                      id="altura"
                      type="number"
                      {...register("altura")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="imc">IMC</label>
                    <input
                      id="imc"
                      type="number"
                      {...register("imc")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="temperatura">Temperatura</label>
                    <input
                      id="temperatura"
                      type="number"
                      {...register("temperatura")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="Frequência Respiratória">
                      Frequência Respiratória
                    </label>
                    <input
                      id="FR"
                      type="number"
                      {...register("fr")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="FC">Frequência Cardíaca</label>
                    <input
                      id="FC"
                      type="number"
                      {...register("fc")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="pressaoS">Pressão Sistólica</label>
                    <input
                      id="pressaoS"
                      type="number"
                      {...register("pressaoS")}
                      readOnly={mode === "exibir"}
                    />
                  </div>
                  <div className={styles.formGrupoConsulta}>
                    <label htmlFor="pressaoD">Pressão Diastólica</label>
                    <input
                      readOnly={mode === "exibir"}
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
                  {
                    <div>
                      <Botoes type="submit" cor="branco" background="azul">
                        {mode === "exibir" ? (
                          <a
                            href="/consultas"
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {" "}
                            Listar Consultas{" "}
                          </a>
                        ) : (
                          "Salvar Alterações"
                        )}
                      </Botoes>
                    </div>
                  }
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
