import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function FormulaireAdresse({ handleClick, nomBouton, adresse }) {
    const [erreurs, setErreurs] = useState({});
    const { t } = useTranslation();
    
    const handleSubmit = () => {
        if (validerChampsAdresse()) {
            handleClick({
                numeroCivique: adresse.numeroCivique,
                odonyme: adresse.odonyme,
                typeVoie: adresse.typeVoie,
                codePostal: adresse.codePostal,
                nomMunicipalite: adresse.nomMunicipalite,
                etat: adresse.etat,
                pays: adresse.pays
            });
            adresse.setNumeroCivique('');
            adresse.setOdonyme('');
            adresse.setTypeVoie('');
            adresse.setCodePostal('');
            adresse.setNomMunicipalite('');
            adresse.setEtat('');
            adresse.setPays('');
        }
        }

    const validerChampsAdresse = () => {
        const nouvellesErreurs = {};
        if (isNaN(adresse.numeroCivique) || adresse.numeroCivique.length < 1 ) {
            nouvellesErreurs.numeroCivique = t('erreurNumeroCivique');
        }
        if (adresse.odonyme.length < 2 || adresse.odonyme.length > 50) {
            nouvellesErreurs.odonyme = t('erreurOdonyme');
        }
        if (adresse.typeVoie.length < 2 || adresse.typeVoie.length > 50) {
            nouvellesErreurs.typeVoie = t('erreurTypeVoie');
        }
        if (adresse.codePostal.length < 2 || adresse.codePostal.length > 10) {
            nouvellesErreurs.codePostal = t('erreurCodePostal');
        }
        if (adresse.nomMunicipalite.length < 2 || adresse.nomMunicipalite.length > 50) {
            nouvellesErreurs.nomMunicipalite = t('erreurNomMunicipalite');
        }
        if (adresse.etat.length < 2 || adresse.etat.length > 50) {
            nouvellesErreurs.etat = t('erreurEtat');
        }
        if (adresse.pays.length < 2 || adresse.pays.length > 50) {
            nouvellesErreurs.pays = t('erreurPays');
        }

        setErreurs(nouvellesErreurs);
        return Object.keys(nouvellesErreurs).length === 0;
    }

    return (
        <>
            <h2>{t(nomBouton)}</h2>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="mb-1">{t('numeroCivique')}</Form.Label>
                        <Form.Control 
                            type="text"     
                            value={adresse.numeroCivique} 
                            onChange={(e) => adresse.setNumeroCivique(e.target.value)} 
                        />
                        {erreurs.numeroCivique && <p className='text-danger'>{erreurs.numeroCivique}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('typeVoie')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.typeVoie} 
                            onChange={(e) => adresse.setTypeVoie(e.target.value)} 
                        />
                        {erreurs.typeVoie && <p className='text-danger'>{erreurs.typeVoie}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('odonyme')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.odonyme} 
                            onChange={(e) => adresse.setOdonyme(e.target.value)} 
                        />
                        {erreurs.odonyme && <p className='text-danger'>{erreurs.odonyme}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('nomMunicipalite')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.nomMunicipalite} 
                            onChange={(e) => adresse.setNomMunicipalite(e.target.value)} 
                        />
                        {erreurs.nomMunicipalite && <p className='text-danger'>{erreurs.nomMunicipalite}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('etat')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.etat} 
                            onChange={(e) => adresse.setEtat(e.target.value)} 
                        />
                        {erreurs.etat && <p className='text-danger'>{erreurs.etat}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('pays')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.pays} 
                            onChange={(e) => adresse.setPays(e.target.value)} 
                        />
                        {erreurs.pays && <p className='text-danger'>{erreurs.pays}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={2}>
                    <Form.Group>
                        <Form.Label className="mt-2">{t('codePostal')}</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={adresse.codePostal} 
                            onChange={(e) => adresse.setCodePostal(e.target.value)} 
                        />
                        {erreurs.codePostal && <p className='text-danger'>{erreurs.codePostal}</p>}
                    </Form.Group>
                    <Button className='mt-3' data-testid='btnEnvoyer' variant='success' onClick={handleSubmit}>{t(nomBouton)}</Button>
                </Col>
            </Row>
        </>
    )
}

