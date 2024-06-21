import React, { useState, useContext } from "react";
import styles from "./Pesquisar.module.css";
import mockEstado from "../ContainerForm/mock";
import Botoes from "../BotoesComponentes/Botoes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FilterContext } from "../../context/useFilterContext";
import { UserRoundSearch } from "lucide-react";

const Pesquisar = ({ data, onClick }) => {
  const { filter, setFilter, setCancelar } = useContext(FilterContext);
  const estados = mockEstado;
  const validationSchemaLogin = z.object({
    nome: z.string(),
   
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
                <div className={styles.buscarIconPes}>
                <UserRoundSearch />
                </div>
        </div>
      </div>
      <div style={{marginRight:75}}>
        <Botoes background="azul" cor="branca" type="submit" onClick={onClick} style={{marginRight:15}}>
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
