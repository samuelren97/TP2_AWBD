import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const TIMEOUT_REDIRECTION = 3000;

function PageSuppressionClient() {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ messageConfirmation, setMessageConfirmation ] = useState({
        variant: '',
        message: ''
    });

    const obtenirClient = async () => {
        const reponse = await fetch(`/api/Clients/${id}`, {
            method: 'GET'
        });
        
        console.log(messageConfirmation.variant);

        if (reponse.status != 200 && messageConfirmation.variant.length == 0) {
            navigate('/404');
        }
    };
    obtenirClient();

    const supprimerClient = async () => {
        const reponse = await fetch(`/api/Clients/${id}`, {
           method: 'DELETE' 
        });

        const message = {
            variant: 'danger',
            message: t('messageErreurSuppression')
        }

        if (reponse.status == 204) {
            message.variant = 'success';
            message.message = t('messageConfirmationSuppression');
        }

        setMessageConfirmation(message);
    }

    let composantAAfficher = (
        <div className='mt-3 text-center'>
            <h3>{t('messageSuppression')}{id}?</h3>
            <div className='mt-3'>
                <Button
                    variant='primary'
                    className='me-2 ps-5 pe-5'
                    onClick={() => navigate('/clients')}
                >
                    {t('non')}
                </Button>
                <Button
                    variant='danger'
                    className='ms-2 ps-5 pe-5'
                    onClick={supprimerClient}
                >
                    {t('oui')}
                </Button>
            </div>
        </div>
    )

    if (messageConfirmation.variant.length > 0) {
        setTimeout(() => navigate('/clients'), TIMEOUT_REDIRECTION);
        composantAAfficher = (
            <Alert variant={messageConfirmation.variant}>
                {messageConfirmation.message}
            </Alert>
        )
    }

    return composantAAfficher;
}

export default PageSuppressionClient;