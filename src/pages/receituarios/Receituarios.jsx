import React, { useContext, createContext, useState, useRef } from "react";
import styles from "./receitas.module.css";
import ContainerMaster from "../../components/container/index.jsx";
import { Search } from "lucide-react";
import servicePacientes from "../../service/servicePacientes.js";
import { useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import Botoes from "../../components/BotoesComponentes/Botoes.jsx";
import { ReceitaContext } from "../../context/ReceituarioContext.jsx";
import { ConsultaContext } from "../../context/ConsultaContext";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import ReceitasImpressoes from "./receitasImpressões.jsx";
import SideMenu from "../../components/sideMenu/index.jsx";

const Receituarios = () => {
  const {
    nomePacientes,
    setNomePacientes,
    nomeMedico,
    setNomeMedico,
    crm,
    setCrm,
    dataReceita,
    setDataReceita,
    receita,
    setReceita,
  } = useContext(ConsultaContext);
  const [resultadoNome, setResultadoNome] = useState("");
  const [formData, setFormData] = useState({
    nomePaciente: "",
    nomeMedico: "",
    crm: "",
    dataReceita: "",
    receita: "",
  });

  const [exibirFiltro, setExibirFiltro] = useState(false);

  const componentRef = useRef(); // Adicione esta linha
  const usePacienteService = servicePacientes();

  const validationSchemaLogin = z.object({
    nomePaciente: z.string({ message: "Nome Obrigatório" }),
    nomeMedico: z.string().min(2, { message: "Nome obrigatório" }),
    crm: z.string().min(2, { message: "insira seu CRM" }),
    dataReceita: z.string().min(2, { message: "insira a data da receita" }),
    receita: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      nomePaciente: "",
      nomeMedico: "",
      crm: "",
      dataReceita: "",
      receita: "",
    },
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["getPacientes"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
    enabled: true,
  });

  const nomesFiltrados =
    data?.data.pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().includes(resultadoNome.toLowerCase())
    ) || [];
  console.log(nomesFiltrados);
  console.log(nomesFiltrados.length);
  const onSubmit = (data) => {
    setFormData(data);
    setNomePacientes(data.nomePaciente);
    setNomeMedico(data.nomeMedico);
    setCrm(data.crm);
    setDataReceita(data.dataReceita);
    setReceita(data.receita);
    console.log(data);
    console.log(data);
  };

  const handleExibirFiltro = () => {
    setExibirFiltro(!exibirFiltro);
    console.log(exibirFiltro);
  };
  return (
    <ContainerMaster>

      <ToastContainer />
          <SideMenu />

      <div className={styles.receitaForm}>
        <div className={styles.pesquisarNome}>
          {exibirFiltro ? (
            <div>
              <input
                type="text"
                placeholder="Buscar Paciente"
                onChange={(e) => setResultadoNome(e.target.value)}
              />
              <p className={styles.icon_pesquisarNome}>
                <Search />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.containerReceita}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formReceita}
          >
            <div className={styles.topoFormulario}>
              <div className={styles.namePaciente}>
                <label htmlFor="id_paciente">
                  Nome do Paciente:
                  <button onClick={handleExibirFiltro}>
                    {" "}
                    <Search size={20} />{" "}
                  </button>{" "}
                </label>
                <select
                  {...register("nomePaciente")}
                  onChange={(e) => setNomePacientes(e.target.value)}
                >
                  {nomesFiltrados.length === 0 ? (
                    <option value="null"> Nome não Encontrado</option>
                  ) : (
                    nomesFiltrados.map((paciente) => (
                      <option value={paciente.nome} key={paciente.id_paciente}>
                        {paciente.nome}
                      </option>
                    ))
                  )}
                </select>
                {errors.nomePaciente && (
                  <p className={styles.errors}>{errors.nomePaciente.message}</p>
                )}
              </div>
              <div className={styles.nameMedico}>
                <label htmlFor="id_medico">Nome do Médico(a): </label>
                <input type="text" {...register("nomeMedico")} />
                {errors.nomeMedico && (
                  <p className={styles.errors}>{errors.nomeMedico.message}</p>
                )}
              </div>
            </div>
            <div className={styles.sessao2}>
              <div className={styles.crm}>
                <label htmlFor="numero do CRM">N° do CRM: </label>
                <input type="text" {...register("crm")} />
                {errors.crm && (
                  <p className={styles.errors}>{errors.crm.message}</p>
                )}
              </div>
              <div className={styles.dataReceita}>
                <label htmlFor="data da Receita"> Data da Receita:</label>
                <InputMask
                  type="text"
                  mask="99/99/9999"
                  {...register("dataReceita")}
                  placeholder="DD/MM/AAAA"
                />
                {errors.dataReceita && (
                  <p className={styles.errors}>{errors.dataReceita.message}</p>
                )}
              </div>
            </div>
            <div className={styles.textareaReceita}>
              <textarea
                {...register("receita")}
                placeholder="Faça aqui sua receita"
              />
            </div>
            <div style={{ display: "flex", marginTop: 20 }}>
              <ReactToPrint content={() => componentRef.current}>
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <Botoes
                      type="submit"
                      cor="branco"
                      background="azul"
                      onClick={handlePrint}
                    >
                      Imprimir
                    </Botoes>
                  )}
                </PrintContextConsumer>
              </ReactToPrint>
            </div>
            <div style={{ display: "none" }}>
              <ReceitasImpressoes ref={componentRef} data={formData} />
            </div>
            <div className={styles.baixarArq}>
              <small> Baixar Arquivos </small>
            </div>
          </form>
        </div>
      </div>
    </ContainerMaster>
  );
};

export default Receituarios;
