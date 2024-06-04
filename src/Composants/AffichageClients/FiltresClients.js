import React from 'react';

import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function FiltresClients({
    municipalites,
    etats,
    pays,
    filtresMunicipalites,
    filtresEtats,
    filtresPays,
    checkMunicipalite,
    checkEtat,
    checkPays
}) {
    const { t } = useTranslation();

    return (
        <>
        <h5>{t('municipalites')}</h5>
        <hr />
        {
            municipalites.map(municipalite => {
                const checked = filtresMunicipalites.includes(municipalite.nom);
                return <Form.Check type='checkbox'
                            key={municipalite.nom}
                            label={`${municipalite.nom} (${municipalite.nbClients})`}
                            checked={checked}
                            onChange={() => checkMunicipalite(municipalite.nom)}
                        />
            })
        }

        <h5 className='mt-5'>{t('etats')}</h5>
        <hr />
        {
            etats.map(etat => {
                const checked = filtresEtats.includes(etat.nom);
                return <Form.Check type='checkbox'
                            key={etat.nom}
                            label={`${etat.nom} (${etat.nbClients})`}
                            checked={checked}
                            onChange={() => checkEtat(etat.nom)}
                        />
            })
        }

        <h5 className='mt-5'>{t('Pays')}</h5>
        <hr />
        {
            pays.map(paysCourant => {
                const checked = filtresPays.includes(paysCourant.nom);
                return <Form.Check type='checkbox'
                            key={paysCourant.nom}
                            label={`${paysCourant.nom} (${paysCourant.nbClients})`}
                            checked={checked}
                            onChange={() => checkPays(paysCourant.nom)}
                        />
            })
        }
        </>
    )
}

export default FiltresClients;