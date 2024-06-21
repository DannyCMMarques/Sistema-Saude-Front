import React, { createContext, useState } from "react";

export const ReceitaContext = createContext();

export const ReceitaProvider = ({ children }) => {
    const [nomePacientes, setNomePacientes] = useState("teste");
    const [nomeMedico, setNomeMedico] = useState("teste");
    const [crm, setCrm] = useState("teste");
    const [dataReceita, setDataReceita] = useState("teste");
    const [receita, setReceita] = useState("");

    return (
        <ReceitaContext.Provider value={{
            nomePacientes, setNomePacientes,
            nomeMedico, setNomeMedico,
            crm, setCrm,
            dataReceita, setDataReceita,
            receita, setReceita
        }}>
            {children}
        </ReceitaContext.Provider>
    );
};
