import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


import { FormulaireClient } from '../Composants/FormulaireClient.js';

export function PageCreationClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const { t } = useTranslation();

    const ajouterClient = async () => {
        const response = await fetch('/api/Clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: null,
                nom: nom,
                prenom: prenom,
                dateNaissance: dateNaissance,
                adresses: []
            })
        });
        console.log(response);

        if (response.ok) {
            setNom('');
            setPrenom('');
            setDateNaissance('');
        } else {
            console.error('Impossible d\'ajouter le client');
        }
    }

    return (
        <Container>
            <h1>{t('creationClient')}</h1>
            <hr />
            <FormulaireClient
                handleClick={ajouterClient}
                nomBouton='ajouter'
                nom={nom}
                prenom={prenom}
                dateNaissance={dateNaissance}
                setNom={setNom}
                setPrenom={setPrenom}
                setDateNaissance={setDateNaissance}
            />
        </Container>
    )
}


