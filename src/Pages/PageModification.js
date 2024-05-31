import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FormulaireAdresse } from '../Composants/FormulaireAdresse.js';

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
                <Navigate to="/404"/>
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


    return (
        <Container>
            <h1>{t('modificationClient')}</h1>
            <hr />
            <h2>{t('modifierClient')}</h2>
            <Row>
                <Col xs={12} md={6}> 
                    <Form.Group>
                        <Form.Label  className="mb-3">{t('nom')}</Form.Label>
                        <Form.Control  type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="responsive-label">{t('prenom')}</Form.Label>
                        <Form.Control type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="responsive-label">{t('dateNaissance')}</Form.Label>
                        <Form.Control type="date" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                    </Form.Group>
                    <Button className='mt-3' variant='success' onClick={modifierClient}>{t('modifier')}</Button>
                </Col>
            </Row>
            <FormulaireAdresse nomBouton={t('ajouter')} handleClick={ajouterAdresse}/>
        </Container>
    )
}


