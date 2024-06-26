import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FormulaireAdresse } from '../Composants/Formulaires/FormulaireAdresse.js';
import { BoutonRetour } from '../Composants/BoutonRetour.js';

export function PageModificationAdresse() {
    const { idClient, idAdresse } = useParams();
    const [numeroCivique, setNumeroCivique] = useState('');
    const [odonyme, setOdonyme] = useState('');
    const [typeVoie, setTypeVoie] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [nomMunicipalite, setNomMunicipalite] = useState('');
    const [etat, setEtat] = useState('');
    const [pays, setPays] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const adresse = {
        numeroCivique: numeroCivique,
        odonyme: odonyme,
        typeVoie: typeVoie,
        codePostal: codePostal,
        nomMunicipalite: nomMunicipalite,
        etat: etat,
        pays: pays,
        setNumeroCivique: setNumeroCivique,
        setOdonyme: setOdonyme,
        setTypeVoie: setTypeVoie,
        setCodePostal: setCodePostal,
        setNomMunicipalite: setNomMunicipalite,
        setEtat: setEtat,
        setPays: setPays
    }

    useEffect(() => {
        const chercherAdresse = async () => {
            const response = await fetch(`/api/clients/${idClient}/adresses/${idAdresse}`);
            if (response.status === 404) {
                navigate('/404');
            }

            if (response.status === 200) {
                const body = await response.json();
                setNumeroCivique(body.numeroCivique);
                setOdonyme(body.odonyme);
                setTypeVoie(body.typeVoie);
                setCodePostal(body.codePostal);
                setNomMunicipalite(body.nomMunicipalite);
                setEtat(body.etat);
                setPays(body.pays);
            }
            else {
                console.error('Impossible de charger l\'adresse');
            }
        }
        chercherAdresse();
    }, [idAdresse, idClient, navigate]); // warning si on enlève navigate idClient et idAdresse


    const modifierAdresse = async (nouvAdresse) => {
        await fetch(`/api/clients/${idClient}/adresses/${idAdresse}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adresseId: idAdresse,
                numeroCivique: nouvAdresse.numeroCivique,
                odonyme: nouvAdresse.odonyme,
                typeVoie: nouvAdresse.typeVoie,
                codePostal: nouvAdresse.codePostal,
                nomMunicipalite: nouvAdresse.nomMunicipalite,
                etat: nouvAdresse.etat,
                pays: nouvAdresse.pays
            })
        });
        navigate(`/modificationClient/${idClient}`);
    }

    return (
        <Container>
            <h1>{<BoutonRetour lienPrecedent={'/clients'} />} {t('modificationAdresse')}</h1>
            {console.log(adresse)}
            {
                adresse == null ?
                    <p>{t('chargement')}</p> :
                    <FormulaireAdresse
                        adresse={adresse}
                        nomBouton='modifier'
                        handleClick={modifierAdresse}
                    />
            }
        </Container>
    );
}