import React, { useState } from "react";
import styles from "./ConsultaForm.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Botoes from "./../BotoesComponentes/Botoes";
import serviceConsultas from "../../service/serviceConsultas";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [mudanca, setMudanca] = useState(true);

  const mudarSessao = () => {
    setMudanca(!mudanca);
  };

  const validationSchemaLogin = z.object({
    diagnostico: z.string(),
    queixas: z.string(),
    historico: z.string(),
    historicopassado: z.string(),
    quais: z.string(),
    antecendentes: z.string(),
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
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
  const useServiceConsultas = serviceConsultas()
  const fazerRegistroConsultas = useMutation({
    mutationFn: (payload) => useServiceConsultas.registrarConsulta(payload, 1),
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
  const onSubmit = (data) => {
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
    }
    fazerRegistroConsultas.mutate(datas)
    // reset();
  };

  return (
    <>
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
    <div className={styles.container}>
      <form className={styles.formConsultas} onSubmit={handleSubmit(onSubmit)}>
        {mudanca === true ? (
          <>
            <div className={styles.sessao1}>
              <div className={styles.formGrupoConsulta}>
                <label htmlFor="diagnostico">Diagnóstico Clínico</label>
                <textarea
                  id="diagnostico"
                  rows="7"
                  cols="50"
                  defaultValue=""
                  {...register("diagnostico")}
                />
              </div>
              <div className={styles.formGrupoConsulta}>
                <label htmlFor="queixas">Queixas principais</label>
                <textarea
                  id="queixas"
                  rows="7"
                  cols="50"
                  defaultValue=""
                  {...register("queixas")}
                />
              </div>
              <div className={styles.formGrupoConsulta}>
                <label htmlFor="historico">Histórico de doença</label>
                <textarea
                  id="historico"
                  rows="7"
                  cols="50"
                  defaultValue=""
                  {...register("historico")}
                />
              </div>
              <div className={styles.formGrupoConsulta}>
                <label htmlFor="historicopassado">Hist. de doença pregressa</label>
                <textarea
                  id="historicopassado"
                  rows="7"
                  cols="50"
                  defaultValue=""
                  {...register("historicopassado")}
                />
              </div>
              <div>
                <label htmlFor="quais">Já realizou alguma cirurgia?</label>
                <textarea
                  id="quais"
                  rows="7"
                  cols="50"
                  defaultValue=""
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
                <input id="temperatura" type="number" {...register("temperatura")} />
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
                <input id="pressaoS" type="number" {...register("pressaoS")} />
              </div>
              <div>
                <label htmlFor="pressaoD">Pressão Diastólica</label>
                <input id="pressaoD" type="number" {...register("pressaoD")} />
              </div>
            </div>
            <div className={styles.botoesSessao2}>
              <div>
                <Botoes background="branco" cor="azul" onClick={mudarSessao}>
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
    </>
  );
};

export default ConsultaForm;
