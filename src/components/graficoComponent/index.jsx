import React, { useContext, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import serviceConsultas from "../../service/serviceConsultas";
import servicePacientes from "../../service/servicePacientes";

const GraficoComponente = () => {
  const { metaConsultas, metaPacientes } = useContext(ThemeContext);
  const [dataConsulta, setDataConsulta] = useState([]);
  const [dataPaciente, setDataPaciente] = useState([]);

  const useConsultService = serviceConsultas();
  const usePacienteService = servicePacientes();

  const { data: consultasData } = useQuery({
    queryKey: ["getConsultas"],
    queryFn: async () => {
      const data = await useConsultService.getConsultas();
      return data;
    },
  });

  const { data: pacientesData } = useQuery({
    queryKey: ["getPacientes"],
    queryFn: async () => {
      const data = await usePacienteService.getPacientes();
      return data;
    },
    enabled: true,
  });

  useEffect(() => {
    if (consultasData && consultasData.data && consultasData.data.consulta) {
      setDataConsulta(consultasData.data.consulta);
    }
    if (pacientesData && pacientesData.data && pacientesData.data.pacientes) {
      setDataPaciente(pacientesData.data.pacientes);
    }
  }, [consultasData, pacientesData]);

  const dataTabela = [
    {
      name: "Pacientes",
      quantidade: dataPaciente.length,
      meta: metaPacientes,
    },
    {
      name: "Consultas",
      quantidade: dataConsulta.length,
      meta: metaConsultas,
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const width = windowWidth > 450 ? 500 : 300;
  const height = windowWidth > 450 ? 300 : 400;

  return (
    <AreaChart
      width={width}
      height={height}
      data={dataTabela}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="quantidade"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="meta"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
    </AreaChart>
  );
};

export default GraficoComponente;
