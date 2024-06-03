import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FormulaireAdresse } from '../Composants/FormulaireAdresse.js';
import { FormulaireClient } from '../Composants/FormulaireClient.js';

export function PageModification() {
    const { id } = useParams();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const chercherClient = async () => {
            const response = await fetch(`/api/Clients/${id}`);
            if(response.status === 404) {
                window.location.href = '/404';
            }
            else {
                const body = await response.json();
                setNom(body.nom);
                setPrenom(body.prenom);
                setDateNaissance(body.dateNaissance.toString().split('T')[0]);
            }
        }
        chercherClient();
    }, []);

    const modifierClient = async () => {
        const response = await fetch(`/api/Clients/${id}`, { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: id,
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
        const response = await fetch(`/api/Clients/${id}/Adresses`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adresse)
        });
        console.log(response);
    }

    const listerAdresses = async () => {    
        const response = await fetch(`/api/Clients/${id}/Adresses`);
        const body = await response.json();
        return body;
    }

    console.log('afiichage :' + nom + prenom + dateNaissance);
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
                nomBouton='ajouter' 
                adresse={null} 
            />
            <h2>{t('adresses')}</h2>
            <Row>
                <Col xs={6} md={2}>
                    <Button onClick={listerAdresses}>Lister adresses</Button>
                </Col>
            </Row>
        </Container>
    )
}


