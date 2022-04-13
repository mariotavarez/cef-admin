import "bootstrap/dist/css/bootstrap.min.css";
import EstadosFinancieros from "./components/features/EstadosFinancieros";
// Components
import FormCEF from "./components/features/FormCEF";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="estados-financieros/" element={<FormCEF />} />
      <Route
        path="estados-financieros/listado"
        element={<EstadosFinancieros />}
      />
    </Routes>
  );
}

export default App;
