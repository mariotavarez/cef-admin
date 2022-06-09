// Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css";
// Components
import LoginCEF from "./components/features/LoginCEF";
import EstadosFinancieros from "./components/features/EstadosFinancieros";
import Solicitantes from "./components/features/Solicitantes";
// Router
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="admin-estados-financieros/" element={<LoginCEF />} />
      <Route
        path="admin-estados-financieros/listado"
        element={<EstadosFinancieros />}
      />
      <Route
        path="admin-estados-financieros/listado-solicitantes"
        element={<Solicitantes />}
      />
    </Routes>
  );
}

export default App;
