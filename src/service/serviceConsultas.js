import React from 'react';
import apiInterceptor from './../utils/shared/apiInterceptor'

const serviceConsultas = () => {
    const api = apiInterceptor();
    async function registrarConsulta(payload,id) {
      console.log(id)
        return api.post(`consulta/cadastrarConsulta/${id}`, payload);
      }
    
      async function getConsultas() {
        return api.get("/consulta/listarConsultas");
      }
    
      async function deletarConsultas(id) {
        return api.delete(`/consulta/deletarConsulta/${id}`);
      }
    
      async function editarConsultas(payload, id) {
        return api.put(`/consulta/editarConsulta/${id}`, payload);
      }
    
      async function getConsultasId(id){
        return api.get(`/consulta/listarConsultaID/${id}`);
      }
   
      return { registrarConsulta,getConsultas, deletarConsultas,editarConsultas,getConsultasId}
}

export default serviceConsultas;
