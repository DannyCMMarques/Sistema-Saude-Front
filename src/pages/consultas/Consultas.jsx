import React from 'react'
import ConsultaForm from "./../../components/ConsultaForm/ConsultaForm"
import styles from "./consultas.module.css"
import ContainerMaster from '../../components/container'
import ConsultaTable from '../../components/consultaTable/TabelaComponent'
const Consultas = () => {
  return (
<ContainerMaster>     
   <div className={styles.espacoFormulario}>
      {/* <ConsultaForm/> */}

      </div>
      <ConsultaTable />
      </ContainerMaster>  
    
  )
}

export default Consultas
