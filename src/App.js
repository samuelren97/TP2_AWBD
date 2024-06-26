import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import PageAcceuil from './Pages/PageAcceuil.js';
import { PageCreationClient } from './Pages/PageCreationClient.js';
import { PageModificationClient } from './Pages/PageModificationClient.js';
import { PageModificationAdresse } from './Pages/PageModificationAdresse.js';
import { PageSuppressionAdresse } from './Pages/PageSuppressionAdresse.js';
import { RoutePrive } from './RoutePrive.js';
import PageClients from './Pages/PageClients.js';
import PageSuppressionClient from './Pages/PageSuppressionClient.js';
import Page404 from './Pages/Page404.js'

import BarreDeNavigation from './Composants/BarreDeNavigation.js';

function App() {
  const { isAuthenticated, logout } = useAuth0();
  return (
      <BrowserRouter>
          <BarreDeNavigation estAuthentifie={isAuthenticated} deconnexion={logout}/>
          <Container>
              <Routes>
                  <Route path='/' element={<PageAcceuil />} />
                  <Route element={<RoutePrive />}>
                      <Route path='/clients' element={<PageClients />} />
                      <Route path='/suppressionClient/:id' element={<PageSuppressionClient />} />

                      {/* Separateur */}
                      <Route path='/creationClient' element={<PageCreationClient />} />
                      <Route path='/modificationClient/:idClient' element={<PageModificationClient />} />
                      <Route path='/modificationClient/:idClient/modificationAdresse/:idAdresse' element={<PageModificationAdresse />} />
                      <Route path='/suppressionAdresse/:idClient/:idAdresse' element={<PageSuppressionAdresse />} />
                  </Route>
                  <Route path='*' element={<Page404 />} />
              </Routes>
          </Container>
      </BrowserRouter>
  );
}

export default App;
