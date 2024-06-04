import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import ItemClient from '../Composants/AffichageClients/ItemClient.js';
import FiltresClients from '../Composants/AffichageClients/FiltresClients.js';

const obtenirAdressesUniques = (clients, champ) => {
    return clients.reduce((nouvTab, client) => {
        let aEteRajoute = false;

        client.adresses.forEach(adresse => {
            const objUnique = nouvTab.find(obj => obj.nom == adresse[champ]);

            if (objUnique) {
                if (!aEteRajoute) {
                    objUnique.nbClients++;
                    aEteRajoute = true;
                }
            } else {
                nouvTab.push({
                    nom: adresse[champ],
                    nbClients: 1
                });
                aEteRajoute = true;
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

    const titreAucunClient = (
        <div className='text-center'>
            <h3>
                Aucun client pour le moment...
                {/* <i>TODO: Ajouter icone</i> */}
            </h3>
        </div>
    );

    const clientsAAfficher = filtrerClients();
    
    return (
        <Row>
            <Col xs={12} md={2}>
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
            <Col xs={12} md={10}>
                <Row>
                    {
                        clientsAAfficher.length > 0 
                            ? 
                                clientsAAfficher.map(client => {
                                    return <ItemClient key={client.clientId} client={client} />
                                }) 
                            : 
                                titreAucunClient
                    }
                </Row>
            </Col>
        </Row>
    )
}

export default PageClients;