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

function PageClients() {
    const [ clients, setClients] = useState([]);
    const [ municipalites, setMunicipalites] = useState([]);
    const [ etats, setEtats ] = useState([]);
    const [ pays, setPays ] = useState([]);

    const [ filtresMunicipalites, setFiltresMunicipalites ] = useState([]);
    const [ filtresEtats, setFiltresEtats ] = useState([]);
    const [ filtresPays, setFiltresPays ] = useState([]);

    const handleCheckMunicipalite = nomMunicipalite => {
        let nouvFiltres = [...filtresMunicipalites];
        const indiceMunicipalite = nouvFiltres.indexOf(nomMunicipalite);
        if (indiceMunicipalite >= 0) {
            nouvFiltres.splice(indiceMunicipalite, 1);
        } else {
            nouvFiltres.push(nomMunicipalite);
        }

        console.log(nouvFiltres);

        setFiltresMunicipalites(nouvFiltres);
    };

    const handleCheckEtat = nomEtat => {
        let nouvFiltres = [...filtresEtats];
        const indiceEtat = nouvFiltres.indexOf(nomEtat);
        if (indiceEtat >= 0) {
            nouvFiltres.splice(indiceEtat, 1);
        } else {
            nouvFiltres.push(nomEtat);
        }

        console.log(nouvFiltres);

        setFiltresEtats(nouvFiltres);
    };

    const handleCheckPays = nomPays => {
        let nouvFiltres = [...filtresPays];
        const indicePays = nouvFiltres.indexOf(nomPays);
        if (indicePays >= 0) {
            nouvFiltres.splice(indicePays, 1);
        } else {
            nouvFiltres.push(nomPays);
        }

        console.log(nouvFiltres);

        setFiltresPays(nouvFiltres);
    };

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

    let titreAucunClient = (
        <div className='text-center'>
            <h3>
                Aucun client pour le moment...
                {/* <i>TODO: Ajouter icone</i> */}
            </h3>
        </div>
    );
    
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
                    checkMunicipalite={handleCheckMunicipalite}
                    checkEtat={handleCheckEtat}
                    checkPays={handleCheckPays}
                />
            </Col>
            <Col xs={12} md={10}>
                <Row>
                    {
                        clients.length > 0 
                            ? 
                                clients.map(client => {
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