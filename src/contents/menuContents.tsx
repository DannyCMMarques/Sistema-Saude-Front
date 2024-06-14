import MenuProps from "../Interface/MenuProps";

const MenuContents = ({ home, paciente, consulta, receituarios }) => {
  const menuCardContent = [
    {
      id: 1,
      href: "/",
      titulo: "Home",
      icones: home,
    },
    {
      id: 2,
      href: "/pacientes",
      titulo: "Pacientes",
      icones: paciente,
    },
    {
      id: 3,
      href: "/consultas",
      titulo: "Consultas",
      icones: consulta,
    },
    {
      id: 4, 
      href: "/receituario",
      titulo: "Receituários",
      icones: receituarios,
    },
  ];

  return menuCardContent;
};

export default MenuContents;
