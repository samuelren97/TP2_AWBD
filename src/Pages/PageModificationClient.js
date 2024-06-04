import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FormulaireAdresse } from '../Composants/FormulaireAdresse.js';
import { FormulaireClient } from '../Composants/FormulaireClient.js';
import { ItemAdresse } from '../Composants/AffichageClients/ItemAdresse.js';

export function PageModificationClient() {
    const { idClient } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [adresses, setAdresses] = useState([]);
    const [numeroCivique, setNumeroCivique] = useState('');
    const [odonyme, setOdonyme] = useState('');
    const [typeVoie, setTypeVoie] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [nomMunicipalite, setNomMunicipalite] = useState('');
    const [etat, setEtat] = useState('');
    const [pays, setPays] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const chercherClient = async () => {
            const response = await fetch(`/api/Clients/${idClient}`);
            if (response.status === 404) {
                window.location.href = '/404';
            }
            else {
                const body = await response.json();
                setNom(body.nom);
                setPrenom(body.prenom);
                setDateNaissance(body.dateNaissance.toString().split('T')[0]);
                setAdresses(body.adresses);
                console.log(body.adresses);
            }
        }
        chercherClient();
    }, []);

    const modifierClient = async () => {
        const response = await fetch(`/api/Clients/${idClient}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: idClient,
                nom: nom,
                prenom: prenom,
                dateNaissance: dateNaissance,
                adresses: []
            })
        });
        console.log(response);
        window.location.href = '/clients';
    }

    const ajouterAdresse = async (adresse) => {
        const response = await fetch(`/api/Clients/${idClient}/Adresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adresse)
        });
        console.log(response);
        const reponseAdresses = await fetch(`/api/Clients/${idClient}/Adresses`);
        const body = await reponseAdresses.json();
        setAdresses(body);
    }

    return (
        <Container>
            <h1>{t('modificationClient')}</h1>
            <hr />
            <FormulaireClient
                handleClick={modifierClient}
                nomBouton='modifier'
                nom={nom}
                prenom={prenom}
                dateNaissance={dateNaissance}
                setNom={setNom}
                setPrenom={setPrenom}
                setDateNaissance={setDateNaissance}

            />
            <FormulaireAdresse
                handleClick={ajouterAdresse}
                nomBouton='ajouterAdresse'
                adresse={{
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
                }}
            />
            <h2>{t('adresses')}</h2>
            <Row>
                {adresses.map((adresse, index) => {
                    console.log(adresse)
                    return <ItemAdresse key={index} adresse={adresse} idClient={idClient} />

                })
                }

            </Row>
        </Container>
    )
}


