import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { FormulaireAdresse } from "./FormulaireAdresse";

test('Affichage sans erreurs', () => {
    // arrange
    render(
        <FormulaireAdresse
            handleClick={() => {}}
            nomBouton={'creer'}
            adresse={{
                numeroCivique: '',
                odonyme: '',
                typeVoie: '',
                codePostal: '',
                nomMunicipalite: '',
                etat: '',
                pays: '',
                setNumeroCivique: () => {},
                setOdonyme: () => {},
                setTypeVoie: () => {},
                setCodePostal: () => {},
                setNomMunicipalite: () => {},
                setEtat: ()=>{},
                setPays: () => {}
            }}
        />
    );
});