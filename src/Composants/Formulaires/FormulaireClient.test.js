import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { FormulaireClient } from "./FormulaireClient.js";

test('Affichage sans erreurs', () => {
    // arrange
    render(
        <FormulaireClient
            handleClick={() => {}}
            nomBouton={'creer'}
            nom={''}
            prenom={''}
            dateNaissance={''}
            setNom={()=>{}}
            setPrenom={() => {}}
            setDateNaissance={() => {}}
        />
    );
});