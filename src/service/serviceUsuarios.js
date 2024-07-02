import apiInterceptor from "../utils/shared/apiInterceptor";

const serviceUsuarios = () => {
  const api = apiInterceptor();

  async function registrarUsuários(payload) {
    return api.post("usuarios/criarUsuario", payload);
  }
  async function editarUsuários(payload, id) {
    return api.put(`usuarios/editarUsuario/${id}`, payload);
  }
  async function deletarUsuarios(payload, id) {
    return api.delete(`usuarios/deletarUsuario/${id}`, payload);
  }
  async function listarUsuarios(payload) {
    return api.get("usuaurios/listarUsuarios", payload);
  }

  return { registrarUsuários, editarUsuários, deletarUsuarios, listarUsuarios };
};
export default serviceUsuarios;
