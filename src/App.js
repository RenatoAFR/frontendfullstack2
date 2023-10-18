import Tela404 from "./telas/Tela404";
import TelaMenu from "./telas/TelaMenu";
import TelaCadProfessor from "./telas/TelaCadProfessor";
import TelaCadTurmas from "./telas/TelaCadTurma";
import TelaCadastroCursos from "./telas/TelaCadCurso";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroProfessores" element={<TelaCadProfessor/>}/>
          <Route path="/cadastroTurmas" element={<TelaCadTurmas/>}/>
          <Route path="/cadastroCursos" element={<TelaCadastroCursos/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
