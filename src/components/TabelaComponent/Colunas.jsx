import React from "react";

const columnsPacientes = (emojisPac) => [
  {
    name: "Pacientes",
    selector: (row) => row.nome,
    sortable: true,
  },
  {
    name: "Telefone",
    selector: (row) => row.telefone,
    sortable: true,
  },
  {
    name: "E-mail",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Idade",
    selector: (row) => row.idade,
    sortable: true,
  },
  {
    name: "Cidade",
    selector: (row) => row.cidade,
    sortable: true,
  },
  {
    name: emojisPac,
  },
];

const columnsConsultas = [
  {
    name: "Consulta",
    selector: (row) => row.consulta,
    sortable: true,
  },
  {
    name: "Data",
    selector: (row) => row.data,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Ações",
    selector: (row) => row.acoes,
    sortable: true,
  },
];

export default { columnsPacientes, columnsConsultas };
