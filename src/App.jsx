import "./App.css";
import SideMenu from "./components/sideMenu";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pessoas from "./pages/pessoas/pessoas";
import Home from "./pages/Home/Home";
import Receituarios from "./pages/receituarios/Receituarios";
import Consultas from "./pages/consultas/Consultas";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "./context/useFilterContext";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="removepadding">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FilterProvider>
            <SideMenu />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/pacientes" element={<Pessoas />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/receituarios" element={<Receituarios />} />
              </Routes>
            </BrowserRouter>
          </FilterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
