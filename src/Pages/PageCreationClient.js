import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function PageCreationClient() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [erreurs, setErreurs] = useState({});
    const { t } = useTranslation();

    const validerChampsClient = () => {
        const nouvellesErreurs = {};
        if (nom.length < 2 || nom.length > 50) {
            nouvellesErreurs.nom = t('erreurNom');
        }
        if (prenom.length < 2 || prenom.length > 50) {
            nouvellesErreurs.prenom = t('erreurPrenom');
        }
        if (dateNaissance === '' || new Date(dateNaissance) > new Date()){
            nouvellesErreurs.dateNaissance = t('erreurDateNaissance');
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    }



    const ajouterClient = async () => {
        const estValide = validerChampsClient();
        if (estValide) {
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
    }

    return (
        <Container>
            <h1>{t('creationClient')}</h1>
            <hr />
            <h2>{t('ajouterClient')}</h2>
            <Row>
                <Col xs={12} md={6}> 
                    <Form.Group>
                        <Form.Label  className="mb-3">{t('nom')}</Form.Label>
                        <Form.Control  
                            type="text" 
                            value={nom} 
                            onChange={(e) => setNom(e.target.value)}
                        />
                        {erreurs.nom && <p className='text-danger'>{erreurs.nom}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="responsive-label">{t('prenom')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={prenom} 
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                        {erreurs.prenom && <p className='text-danger'>{erreurs.prenom}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="responsive-label">{t('dateNaissance')}</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={dateNaissance} 
                            onChange={(e) => setDateNaissance(e.target.value)}
                        />
                        {erreurs.dateNaissance && <p className='text-danger'>{erreurs.dateNaissance}</p>}
                    </Form.Group>
                    <Button className='mt-3' variant='success' onClick={ajouterClient}>{t('ajouter')}</Button>
                </Col>
            </Row>
        </Container>
    )
}


