import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function FormulaireAdresse({ handleClick, nomBouton, adresse }) {
    const [numeroCivique, setNumeroCivique] = useState(adresse == null ? '' : adresse.numeroCivique);
    const [odonyme, setOdonyme] = useState(adresse == null ? '' : adresse.odonyme);
    const [typeVoie, setTypeVoie] = useState(adresse == null ? '' : adresse.typeVoie);
    const [codePostal, setCodePostal] = useState(adresse == null ? '' : adresse.codePostal);
    const [nomMunicipalite, setNomMunicipalite] = useState(adresse == null ? '' : adresse.nomMunicipalite);
    const [etat, setEtat] = useState(adresse == null ? '' : adresse.etat);
    const [pays, setPays] = useState(adresse == null ? '' : adresse.pays);
    const { t } = useTranslation();

    const handleSubmit = () => {
        handleClick({
            adresseId: adresse?.adresseId,
            numeroCivique: numeroCivique,
            odonyme: odonyme,
            typeVoie: typeVoie,
            codePostal: codePostal,
            nomMunicipalite: nomMunicipalite,
            etat: etat,
            pays: pays
        });
        setNumeroCivique('');
        setOdonyme('');
        setTypeVoie('');
        setCodePostal('');
        setNomMunicipalite('');
        setEtat('');
        setPays('');
    }

    return (
        <>
            <h2>{t(nomBouton)}</h2>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('numeroCivique')}</Form.Label>
                        <Form.Control 
                            type="text"     
                            value={numeroCivique} 
                            onChange={(e) => setNumeroCivique(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('typeVoie')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={typeVoie} 
                            onChange={(e) => setTypeVoie(e.target.value)} 
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('odonyme')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={odonyme} 
                            onChange={(e) => setOdonyme(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('nomMunicipalite')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={nomMunicipalite} 
                            onChange={(e) => setNomMunicipalite(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('etat')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={etat} 
                            onChange={(e) => setEtat(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('pays')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={pays} 
                            onChange={(e) => setPays(e.target.value)} 
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="mb-3">{t('codePostal')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={codePostal} 
                            onChange={(e) => setCodePostal(e.target.value)} 
                        />
                    </Form.Group>
                    <Button className='mt-3' variant='success' onClick={handleSubmit}>{nomBouton}</Button>
                </Col>
            </Row>
        </>
    )
}

