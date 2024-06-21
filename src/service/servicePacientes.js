import apiInterceptor from './../utils/shared/apiInterceptor';

const servicePacientes = () => {
  const api = apiInterceptor();

  async function registrar(payload) {
    return api.post("/paciente/criarPaciente", payload);
  }

  async function editar(payload, id) {
    return api.put(`/paciente/atualizarPaciente/${id}`, payload);
  }

  async function getPacientes() {
    return api.get("/paciente/listarPacientes");
  }
  async function getPacientesID(id) {
    return api.get(`/paciente/listarPacientes/${id}`);
  }

  async function deletarPacientes(id) {
    return api.delete(`/paciente/deletarPaciente/${id}`);
  }


  return { registrar, editar, getPacientes, deletarPacientes,getPacientesID };
}

export default servicePacientes;
