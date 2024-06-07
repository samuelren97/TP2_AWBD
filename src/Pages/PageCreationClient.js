import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BoutonRetour } from '../Composants/BoutonRetour.js';
import { FormulaireClient } from '../Composants/Formulaires/FormulaireClient.js';

export function PageCreationClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

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

        if (response.status === 201) {
            setNom('');
            setPrenom('');
            setDateNaissance('');
            navigate('/clients');
        } else {
            console.error('Impossible d\'ajouter le client');
        }
    }

    return (
        <Container className='mt-3'>
            <h1>{<BoutonRetour lienPrecedent='/clients' />}  {t('ajouterClient')}</h1>
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