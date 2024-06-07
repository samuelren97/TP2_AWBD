import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PiMaskSad } from "react-icons/pi";

import ItemClient from '../Composants/AffichageClients/ItemClient.js';
import FiltresClients from '../Composants/AffichageClients/FiltresClients.js';
import OptionsTriage from '../Composants/AffichageClients/OptionsTriage.js';

const obtenirAdressesUniques = (clients, clef) => {
    return clients.reduce((nouvTab, client) => {
        let adressesUniquesClient = [];

        client.adresses.forEach(adresse => {
            const adresseUnique = nouvTab.find(obj => obj.nom.toLowerCase() == adresse[clef].toLowerCase());

            if (adresseUnique === undefined) {
                nouvTab.push({
                    nom: adresse[clef],
                    nbClients: 1
                });
                adressesUniquesClient.push(adresse[clef]);
            } else {
                if (!adressesUniquesClient.includes(adresse[clef])) {
                    adressesUniquesClient.push(adresse[clef]);
                    adresseUnique.nbClients++;
                }
            }
        });

        return nouvTab;
    }, []);
}

const handleCheckFiltre = (nomFiltre, filtres, setFiltres) => {
    let nouvFiltres = [...filtres];
    const indiceFiltre = nouvFiltres.indexOf(nomFiltre);
    if (indiceFiltre >= 0) {
        nouvFiltres.splice(indiceFiltre, 1);
    } else {
        nouvFiltres.push(nomFiltre);
    }

    setFiltres(nouvFiltres);
};

function PageClients() {
    const [ clients, setClients] = useState([]);
    const [ municipalites, setMunicipalites] = useState([]);
    const [ etats, setEtats ] = useState([]);
    const [ pays, setPays ] = useState([]);

    const [ filtresMunicipalites, setFiltresMunicipalites ] = useState([]);
    const [ filtresEtats, setFiltresEtats ] = useState([]);
    const [ filtresPays, setFiltresPays ] = useState([]);

    const [ optionTrie, setOptionTrie ] = useState('nom');
    const [ ordreTrie, setOrdreTrie ] = useState('croissant');

    const { t } = useTranslation();
    const navigate = useNavigate();

    const filtrerClients = () => {
        if (filtresMunicipalites.length == 0 && 
            filtresEtats.length == 0 &&
            filtresPays.length == 0) 
        {
            return clients;
        }

        return clients.reduce((nouvClients, client) => {
            let aEteRajoute = false
            client.adresses.forEach(adresse => {
                if (!aEteRajoute && 
                    (filtresMunicipalites.includes(adresse.nomMunicipalite) ||
                    filtresEtats.includes(adresse.etat) ||
                    filtresPays.includes(adresse.pays))) 
                {
                    nouvClients.push(client);
                    aEteRajoute = true;
                }
            });

            return nouvClients;
        }, []);
    }

    const trierClients = clients => {
        const optionContraire = optionTrie === 'nom' ? 'prenom' : 'nom';
        clients.sort((clientGauche, clientDroite) => {
            if (clientGauche[optionTrie] === clientDroite[optionTrie]) {
                return clientGauche[optionContraire].localeCompare(clientDroite[optionContraire]);
            }
            return clientGauche[optionTrie].localeCompare(clientDroite[optionTrie]);
        });

        if (ordreTrie === 'decroissant') {
            clients.reverse();
        }
    }

    useEffect(() => {
        const requeteClients = async () => {
            const reponse = await fetch ('/api/clients', {
                method: 'GET'
            });

            if (reponse.status == 200) {
                const reponseJSON = await reponse.json();

                setClients(reponseJSON);

                const nouvMunicipalites = obtenirAdressesUniques(reponseJSON, 'nomMunicipalite');
                setMunicipalites(nouvMunicipalites);

                const nouvEtats = obtenirAdressesUniques(reponseJSON, 'etat');
                setEtats(nouvEtats);

                const nouvPays = obtenirAdressesUniques(reponseJSON, 'pays');
                setPays(nouvPays);
            } else {
                console.error('Erreur de la requete fetch');
            }
        };
        requeteClients();
    }, []);

    const clientsAAfficher = filtrerClients();
    trierClients(clientsAAfficher);
    
    return (
        <>
        <h1 className='mt-3'>Clients</h1>
        <hr />

        <Row>
            <Col xs={12} lg={2}>
                <Button 
                    variant='success'
                    className='mt-3 w-100'
                    onClick={() => navigate('/creationClient')}
                >
                    {t('creerClient')}
                </Button>
                <OptionsTriage
                    optionTrie={optionTrie}
                    setOptionTrie={setOptionTrie}
                    ordreTrie={ordreTrie}
                    setOrdreTrie={setOrdreTrie}
                />
                <FiltresClients
                    municipalites={municipalites}
                    etats={etats}
                    pays={pays}
                    filtresMunicipalites={filtresMunicipalites}
                    filtresEtats={filtresEtats}
                    filtresPays={filtresPays}
                    checkMunicipalite={nomFiltre => handleCheckFiltre(nomFiltre, filtresMunicipalites, setFiltresMunicipalites)}
                    checkEtat={nomFiltre => handleCheckFiltre(nomFiltre, filtresEtats, setFiltresEtats)}
                    checkPays={nomFiltre => handleCheckFiltre(nomFiltre, filtresPays, setFiltresPays)}
                />
            </Col>
            <Col xs={12} lg={10}>
                <Row>
                    {
                        clientsAAfficher.length > 0 
                            ? 
                                clientsAAfficher.map(client => {
                                    return <ItemClient key={client.clientId} client={client} />
                                }) 
                            : 
                                (
                                    <div className='text-center'>
                                        <h3>
                                            {t('messageAucunClient')}
                                            <div className='text-center'>
                                                <PiMaskSad size={70} />
                                            </div>
                                        </h3>
                                    </div>
                                )
                    }
                </Row>
            </Col>
        </Row>
        </>
    )
}

export default PageClients;