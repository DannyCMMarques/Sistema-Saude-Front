import React from 'react';
import apiInterceptor from './../utils/shared/apiInterceptor'

const serviceConsultas = () => {
    const api = apiInterceptor();
    console.log(api)
    async function registrarConsulta(payload,id) {
        return api.post(`consulta/cadastrarConsulta/${id}`, payload);
      }
    
      async function getConsultas() {
        return api.get("/consulta/listarConsultas");
      }
    
      async function deletarConsultas(id) {
        return api.delete(`/consulta/deletarConsulta/${id}`);
      }
    
      async function getEditarConsultas(id) {
        return api.get(`/usuarios/editarUsuario/${id}`);
      }
    
      return { registrarConsulta,getConsultas, deletarConsultas,getEditarConsultas}
}

export default serviceConsultas;
