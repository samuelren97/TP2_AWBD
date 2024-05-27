import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Langages from './i18n/Langages.js'
import PageAcceuil from './Pages/PageAcceuil.js';
import { PageCreationClient } from './Pages/PageCreationClient.js';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Langages />
        <Routes>
          <Route path='/' element={<PageAcceuil />} />

          {/* Separateur */}
          <Route path='/creationClient' element={<PageCreationClient />} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
