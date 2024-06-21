import { createContext, useState } from "react";
export const ConsultaContext = createContext()

export const ConsultaProvider = ({ children }) => {
    const [nomePacientes, setNomePacientes] = useState("teste");
    const [nomeMedico, setNomeMedico] = useState("teste");
    const [crm, setCrm] = useState("teste");
    const [dataReceita, setDataReceita] = useState("teste");
    const [receita, setReceita] = useState("");
    return (
        <ConsultaContext.Provider value={{ nomePacientes, setNomePacientes,
            nomeMedico, setNomeMedico,
            crm, setCrm,
            dataReceita, setDataReceita,
            receita, setReceita }}>{children}</ConsultaContext.Provider>

    )

}