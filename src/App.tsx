import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

// BrowserRouter permite que o acesso das rotas seja feito pelo navegador.
// Exemplo localhost:300/repository

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
