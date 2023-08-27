import Tela404 from "./telas/Tela404";
import TelaCadProfessor from "./telas/TelaCadProfessor";
import TelaMenu from "./telas/TelaMenu";
import TelaCadCurso from "./telas/TelaCadCurso";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastroProfessor" element={<TelaCadProfessor/>}/>
          <Route path="/cadastroCurso" element={<TelaCadCurso/>}/>
          <Route path="/" element={<TelaMenu/>}/>
          <Route path="*" element={<Tela404/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;