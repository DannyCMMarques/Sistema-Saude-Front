import apiInterceptor from './../utils/shared/apiInterceptor'

function useLoginService() {
    const api = apiInterceptor();
  
    async function logar(payload) {
      return api.post("/login/login", payload);
    }
  
    return { logar };
  }
  
  export default useLoginService;