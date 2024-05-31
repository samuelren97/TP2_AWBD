import React, { useEffect, useState } from 'react';

import ItemClient from '../Composants/AffichageClients/ItemClient.js';
import { Row } from 'react-bootstrap';

function PageClients() {
    const [ clients, setClients] = useState([]);
    
    useEffect(() => {
        const requeteClients = async () => {
            const reponse = await fetch ('/api/clients', {
                method: 'GET'
            });

            if (reponse.status == 200) {
                const reponseJSON = await reponse.json();
                setClients(reponseJSON);
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
                <i></i>
            </h3>
        </div>
    );
    
    return (
        <Row>
        {
            clients.length > 0 ? 
                clients.map(client => {
                    return <ItemClient key={client.clientId} client={client} />
                }) : 
                titreAucunClient
        }
        </Row>
    )
}

export default PageClients;