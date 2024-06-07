import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { FormulaireAdresse } from '../Composants/Formulaires/FormulaireAdresse.js';
import { FormulaireClient } from '../Composants/Formulaires/FormulaireClient.js';
import { ItemAdresse } from '../Composants/AffichageClients/ItemAdresse.js';
import { BoutonRetour } from '../Composants/BoutonRetour.js';

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
    const navigate = useNavigate();

    useEffect(() => {
        const chercherClient = async () => {
            const response = await fetch(`/api/Clients/${idClient}`);
            if (response.status === 404) {
                navigate('/404');
            }
            if (response.status === 200){
                const body = await response.json();
                setNom(body.nom);
                setPrenom(body.prenom);
                setDateNaissance(body.dateNaissance === null ? '' : body.dateNaissance.toString().split('T')[0]);
                setAdresses(body.adresses);
                console.log(body.adresses);
            }
            else {
                console.error('Impossible de charger le client');
            }
        }
        chercherClient();
    }, [idClient]);

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
        navigate('/clients');
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
        <Container className='mt-3'>
            <h1>{<BoutonRetour lienPrecedent={'/clients'} />} {t('modificationClient')}</h1>
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
            
            <div className='mt-3 p-3 border rounded'>
                <h2 className='mt-3'>{t('adresses')}</h2>
                <Row>
                    {adresses.map((adresse, index) => {
                        console.log(adresse)
                        return <ItemAdresse key={index} adresse={adresse} idClient={idClient} />
                    })
                    }
                    {
                        adresses.length === 0 ? <h5>{t('messageAucuneAdresse')}</h5> : ''
                    }
                <hr className='mt-3'/>

                </Row>
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
            </div>
        </Container>
    )
}