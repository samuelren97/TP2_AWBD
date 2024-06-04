import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function ItemClient({ client }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
        <Col xs={12} md={6} xl={4}>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>
                        <h3>{client.prenom} {client.nom}</h3>
                    </Card.Title>
                    <Card.Text className='mt-3 text-end'>
                        <Button 
                            variant='primary'
                            onClick={() => navigate(`/modificationClient/${client.clientId}`)}
                        >
                            {t('modifier')}
                        </Button>

                        <Button
                            variant='danger'
                            className='ms-3'
                            onClick={() => navigate(`/suppressionClient/${client.clientId}`)}
                        >
                            {t('supprimer')}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
        </>
    )
}

export default ItemClient;