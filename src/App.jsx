import "./App.css";
import SideMenu from "./components/sideMenu";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Pessoas from "./pages/pessoas/pessoas";
import Home from "./pages/Home/Home";
import Receituarios from "./pages/receituarios/Receituarios";
import Consultas from "./pages/consultas/Consultas";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "./context/useFilterContext";
import { ConsultaProvider } from "./context/ConsultaContext";
import { ReceitaProvider } from "./context/ReceituarioContext";
// import ConsultaForm from "./components/ConsultaForm/ConsultaForm";
import Login from "./pages/Login/Login";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import ConsultaForm from "./components/ConsultaForm/formConsultaModal";
import ReceitasImpressões from "./pages/receituarios/receitasImpressões";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="removepadding">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FilterProvider>
            <ConsultaProvider>
                {/* <SideMenu /> */}
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/pacientes" element={<Pessoas />} />
                    <Route path="/consultas" element={<Consultas />} />
                    <Route path="/receituario" element={<Receituarios />} />
                    <Route path="/consultas/*" element={<ConsultaForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />
                    {/* <Route path="/imprimir" element={<ReceitasImpressões/>}/> */}
                  </Routes>
                </BrowserRouter>
            </ConsultaProvider>
          </FilterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
