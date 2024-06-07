import React, {useState} from 'react';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export function FormulaireClient({ handleClick, nomBouton, nom, prenom, dateNaissance, setNom, setPrenom, setDateNaissance}) {
    const [erreurs, setErreurs] = useState({});
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (validerChampsClient()) {
            handleClick({
                nom: nom,
                prenom: prenom,
                dateNaissance: dateNaissance
            });
            setNom('');
            setPrenom('');
            setDateNaissance('');
        }
    }

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

    return (
        <>
            <Row className='mt-3'>
                <Col xs={12} md={6}> 
                    <Form.Group>
                        <Form.Label  className="mb-1">{t('nom')}</Form.Label>
                        <Form.Control  
                            type="text" 
                            value={nom} 
                            onChange={(e) => setNom(e.target.value)}
                        />
                        {erreurs.nom && <p className='text-danger'>{erreurs.nom}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('prenom')}</Form.Label>
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
                <Col xs={6} md={4}>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('dateNaissance')}</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={dateNaissance} 
                            onChange={(e) => setDateNaissance(e.target.value)}
                        />
                        {erreurs.dateNaissance && <p className='text-danger'>{erreurs.dateNaissance}</p>}
                    </Form.Group>
                    <Button className='mt-3' variant='success' onClick={handleSubmit}>{t(nomBouton)}</Button>
                </Col>
            </Row>
        </>
    )
}
