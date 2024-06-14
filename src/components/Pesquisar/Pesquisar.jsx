import React, { useState, useContext } from "react";
import styles from "./Pesquisar.module.css";
import mockEstado from "../ContainerForm/mock";
import Botoes from "../BotoesComponentes/Botoes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FilterContext } from "../../context/useFilterContext";

const Pesquisar = ({ data, onClick }) => {
  const { filter, setFilter, setCancelar } = useContext(FilterContext);
  const estados = mockEstado;
  const validationSchemaLogin = z.object({
    nome: z.string(),
    sexo: z.string().optional(),
    estado: z.string().optional(),
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
      nome: "",
      sexo: "",
      estado: "",
    },
  });
  const onSubmit = (formData) => {
    setFilter(formData);
    reset();
  };

  const handleCloseSeach = () => {
    setCancelar(true);
    reset();
  };

  return (
    <form className={styles.pesquisarGeral} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.pesquisarGrupo}>
        <div className={styles.divCompletaInput}>
          <input
            placeholder="Buscar por nome"
            type="text"
            {...register("nome")}
          />

          <select
            placeholder="Todos"
            {...register("sexo")}
            defaultValue="Todos"
          >
            <option value="Todos"> Todos</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>

          <select
            placeholder="Todos"
            {...register("estado")}
            defaultValue="Todos"
          >
            <option value="Todos"> Todos </option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Botoes background="azul" cor="branca" type="submit" onClick={onClick}>
          Buscar
        </Botoes>
        <Botoes
          background=""
          cor="preto"
          type="submit"
          onClick={handleCloseSeach}
        >
          Cancelar
        </Botoes>
      </div>
    </form>
  );
};

export default Pesquisar;
