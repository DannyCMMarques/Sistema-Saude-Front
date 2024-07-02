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
import Login from "./pages/Login/Login";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import ReceitasImpressões from "./pages/receituarios/receitasImpressões";
import PaginaPrincipal from "./pages/PaginaPrincipal/index";
import ConsultaForm from "./components/ConsultaForm/ConsultaForm";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="removepadding">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FilterProvider>
            <ConsultaProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<PaginaPrincipal />} />
                  <Route
                    path="/home"
                    element={
                      isAuthenticated() ? (
                        <Home />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/pacientes"
                    element={
                      isAuthenticated() ? (
                        <Pessoas />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/consultas"
                    element={
                      isAuthenticated() ? (
                        <Consultas />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/receituario"
                    element={
                      isAuthenticated() ? (
                        <Receituarios />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />
                  <Route
                    path="/consultas/*"
                    element={
                      isAuthenticated() ? (
                        <ConsultaForm />
                      ) : (
                        <Navigate to="/login" replace />
                      )
                    }
                  />

                  <Route
                    path="/login"
                    element={isAuthenticated() ? <Home /> : <Login />}
                  />
                  <Route path="/cadastrar" element={<Cadastrar />} />
                </Routes>
              </BrowserRouter>
            </ConsultaProvider>
          </FilterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  return !!accessToken;
};

export default App;
