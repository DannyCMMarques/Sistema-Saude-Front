import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cadastrar.module.css";
import serviceUsuarios from "./../../service/serviceUsuarios";

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

const handleVoltar = () => {
  window.location.href = "/login";
};
const Cadastrar = () => {
  const validationSchemaLogin = z.object({
    username: z.string().email({ message: "E-mail obrigatório" }),
    password: z.string().min(6, { message: "Senha obrigatória" }),
    nome: z.string().min(3, { message: "Nome obrigatório" }),
    sobrenome: z.string().min(3, { message: "Sobrenome obrigatório" }),
    endereco: z.string().min(3, { message: "Endereço obrigatório" }),
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
      username: "",
      password: "",
      nome: "",
      sobrenome: "",
      endereco: "",
    },
  });
  const useServiceUsuario = serviceUsuarios();
  const fazerRegistro = useMutation({
    mutationFn: (payload) => useServiceUsuario.registrarUsuários(payload),

    onSuccess: (response) => {
      if (response) {
        successValidation("Usuário cadastrado com sucesso!");
      }
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    },
    onError: (err) => {
      errorValidator("Ocorreu um erro interno");
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    fazerRegistro.mutate(data);
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
      <div className={styles.ContainerLogin}>
        <div className={styles.formularioLogin}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.textoFormulario}>
              <h1>Cadastra-se</h1>
            </div>
            <div className={styles.formGrupoLogin}>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="Nome">Nome:</label>
                <input
                  type="text"
                  placeholder="Insira seu nome"
                  {...register("nome")}
                  id="nome"
                />
                {errors?.nome && (
                  <p className={styles.error}> {errors.nome.message}</p>
                )}
              </div>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="sobrenome">SobreNome:</label>
                <input
                  type="text"
                  placeholder="Insira seu sobrenome"
                  {...register("sobrenome")}
                  id="sobrenome"
                />
                {errors?.sobrenome && (
                  <p className={styles.error}> {errors.sobrenome.message}</p>
                )}
              </div>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="endereço">Endereço:</label>
                <input
                  type="text"
                  placeholder="Insira seu endereço"
                  {...register("endereco")}
                  id="endereco"
                />
                {errors?.endereco && (
                  <p className={styles.error}> {errors.endereco.message}</p>
                )}
              </div>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="E-mail">E-mail:</label>
                <input
                  type="email"
                  placeholder="Insira seu e-mail"
                  {...register("username")}
                  id="username"
                />
                {errors?.username && (
                  <p className={styles.error}> {errors.username.message}</p>
                )}
              </div>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="Senha">Senha:</label>
                <input
                  type="password"
                  placeholder="Insira sua senha"
                  {...register("password")}
                  id="password"
                />
                {errors?.password && (
                  <p className={styles.error}> {errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <button type="submit" className={styles.btnLogin}>
                Cadastrar
              </button>
            </div>
          </form>
          <div>
            <p onClick={() => handleVoltar()} className={styles.btnLoginVoltar}>
              Voltar
            </p>
          </div>
        </div>
        <div className={styles.imagemLogin}>
          <h1></h1>
        </div>
      </div>
    </>
  );
};

export default Cadastrar;
