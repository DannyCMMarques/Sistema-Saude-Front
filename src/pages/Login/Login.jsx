import React from "react";
import styles from "./Login.module.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import serviceLogin from "./../../service/serviceLogin.js";

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

const Login = () => {
  const validationSchemaLogin = z.object({
    username: z.string().email({ message: "E-mail obrigatório" }),
    password: z.string().min(6, { message: "Senha obrigatória" }),
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
    },
  });
  const useServiceLogin = serviceLogin();
  const fazerLogin = useMutation({
    mutationFn: (payload) => useServiceLogin.logar(payload),

    onSuccess: (response) => {
      if (response) {
        localStorage.setItem("access_token", response.data.token);
      }
      window.location.href = "/home";
    },
    onError: (err) => {
      errorValidator("Usuario ou senha inválido");
      console.log(err);
    },
  });

  const redirectRegister = () => {
    window.location.href = "/cadastrar";
  };

  const onSubmit = (data) => {
    fazerLogin.mutate(data);
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
        <div className={styles.imagemLogin}>
          <h1></h1>
        </div>
        <div className={styles.formularioLogin}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.textoFormulario}>
              <h1>
                Olá, <br /> Seja Bem-Vindo!
              </h1>
            </div>
            <div className={styles.formGrupoLogin}>
              <div className={styles.formGrupoLogin_div}>
                <label htmlFor="E-mail">E-mail:</label>
                <input
                  type="email"
                  placeholder="Insira seu e-mail"
                  {...register("username")}
                  id="username"
                />
                {errors?.username && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "left",
                      marginTop: -13,
                      marginBottom: 4,
                      fontSize: 13,
                      marginLeft: 24,
                    }}
                  >
                    {" "}
                    {errors.username.message}
                  </p>
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
                  <p
                    style={{
                      color: "red",
                      textAlign: "left",
                      marginTop: -13,
                      marginBottom: 4,
                      fontSize: 13,
                      marginLeft: 24,
                    }}
                  >
                    {" "}
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button type="submit" className={styles.btnLogin}>
                {" "}
                Entrar{" "}
              </button>
            </div>
          </form>
          <div className={styles.fraseRedirecionar}>
            <p>
              Ainda não tem uma conta?
              <a onClick={redirectRegister}>
                <span> Registra-se agora</span>
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
