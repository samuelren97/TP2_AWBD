// 	L’utilisateur doit pouvoir entrer le nom, le prénom et la date de naissance d’un nouveau client.
// 	Lorsque l’utilisateur soumet les informations, le client doit être ajouté à la liste.
//  	
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function PageCreationClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const { t } = useTranslation();

    const ajouterClient = async () => {
        const response = await fetch('/api/Clients', { // Change the URL to the correct API URL
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
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>{t('nom')}</Form.Label>
                            <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('prenom')}</Form.Label>
                            <Form.Control type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{t('dateNaissance')}</Form.Label>
                            <Form.Control type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                        </Form.Group>
                        <Button onClick={ajouterClient}>{t('ajouter')}</Button>
                    </Form>
                </Col>
                
            </Row>
        </Container>
    )
}


