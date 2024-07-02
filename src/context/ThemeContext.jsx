import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth < 760);
  const [toggle, setToggle] = useState(false);
  const [metaConsultas, setMetaConsultas] = useState("");
  const [metaPacientes, setMetaPacientes] = useState("");

  useEffect(() => {
    const savedMetaConsultas = localStorage.getItem("metaConsultas");
    const savedMetaPacientes = localStorage.getItem("metaPacientes");
    if (savedMetaConsultas) setMetaConsultas(savedMetaConsultas);
    if (savedMetaPacientes) setMetaPacientes(savedMetaPacientes);
  }, []);

  useEffect(() => {
    localStorage.setItem("metaConsultas", metaConsultas);
  }, [metaConsultas]);

  useEffect(() => {
    localStorage.setItem("metaPacientes", metaPacientes);
  }, [metaPacientes]);

  return (
    <ThemeContext.Provider
      value={{
        isOpen,
        toggle,
        setIsOpen,
        setToggle,
        metaConsultas,
        metaPacientes,
        setMetaConsultas,
        setMetaPacientes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
