import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import FiltresClients from './FiltresClients.js';

test('Affichage sans erreurs', () => {
    render(
        <FiltresClients
            municipalites={[]}
            etats={[]}
            pays={[]}
            filtresMunicipalites={[]}
            filtresEtats={[]}
            filtresPays={[]}
            checkMunicipalite={() => {}}
            checkEtat={() => {}}
            checkPays={() => {}}
        />
    );
})