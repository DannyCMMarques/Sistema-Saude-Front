import { useEffect } from "react";
import styles from "./ContainerForm.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import mockEstado from "./mock";
import InputMask from "react-input-mask";
import Botoes from "../BotoesComponentes/Botoes";
import servicePacientes from "../../service/servicePacientes";
import { useMutation } from "@tanstack/react-query";

const ContainerForm = ({ onClick, data, type }) => {
  const estados = mockEstado;
  const validationSchemaLogin = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    nome: z.string(),
    sexo: z.string(),
    telefone: z.string(),
    idade: z.string(),
    endereco: z.string(),
    cep: z.string(),
    ocupacao: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    local: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(validationSchemaLogin),
    defaultValues: {
      id: "",
      nome: "",
      sexo: "",
      email: "",
      telefone: "",
      idade: "",
      endereco: "",
      cep: "",
      ocupacao: "",
      bairro: "",
      cidade: "",
      estado: "",
      local: "",
    },
  });

  useEffect(() => {
    if (data && type === "Editar") {
      reset(data);
    }
  }, [data, type, reset]);

  const useServicePaciente = servicePacientes();
  const fazerRegistro = useMutation({
    mutationFn: (payload) => useServicePaciente.registrar(payload),
    onSuccess: (response) => {
      if (response) {
        onClick();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const editarRegistro = useMutation({
    mutationFn: (payload) =>
      useServicePaciente.editar(payload, data.id_paciente),
    onSuccess: (response) => {
      onClick();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (formData) => {
    if (type === "Editar") {
      editarRegistro.mutate(formData);
    } else {
      fazerRegistro.mutate(formData);
    }
  };

  const close = () => {
    clearErrors();
    reset();
    onClick();
  };

  return (
    <div className={styles.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formulario}>
          <input type="hidden" {...register("id")} />
          <div className={styles.formGroup}>
            <label htmlFor="Nome">Nome Completo: </label>
            <input type="text" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Sexo">Sexo: </label>
            <select {...register("sexo")} defaultValue={data?.sexo || ""}>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail: </label>
            <input type="email" {...register("email")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefone">Telefone: </label>
            <InputMask
              type="text"
              mask="(99)99999-9999"
              {...register("telefone")}
              placeholder="(99) 99999-9999"
              defaultValue={data?.telefone || ""}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ocupacao">Ocupação: </label>
            <input type="text" {...register("ocupacao")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="idade">Idade </label>
            <input type="text" {...register("idade")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endereco">Endereço Completo: </label>
            <input type="text" {...register("endereco")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bairro">Bairro: </label>
            <input type="text" {...register("bairro")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cidade">Cidade: </label>
            <input type="text" {...register("cidade")} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="estado">Estado: </label>
            <select {...register("estado")}>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cep">CEP: </label>
            <InputMask
              type="text"
              mask="99999-999"
              {...register("cep")}
              defaultValue={data?.cep || ""}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="local">Local de Atendimento: </label>
            <input
              type="text"
              {...register("local")}
              defaultValue={data?.local || ""}
            />
          </div>
        </div>
        <div className={styles.botao}>
          <div>
            <Botoes background="branco" cor="azul" onClick={close}>
              Cancelar
            </Botoes>
          </div>
          <div>
            <Botoes type="submit" cor="branco" background="azul">
              {type ? "Editar" : "Cadastrar"}
            </Botoes>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContainerForm;
