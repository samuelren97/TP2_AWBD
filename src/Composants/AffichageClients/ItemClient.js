import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ItemClient({ client }) {
    const { t } = useTranslation();

    return (
        <>
        <Col xs={12} md={6} lg={4}>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>
                        <h3>{client.nom}, {client.prenom}</h3>
                    </Card.Title>
                    <Card.Text className='mt-3 text-end'>
                        <Button 
                            variant='primary'
                            onClick={()=> window.location.href=`/modificationClient/${client.clientId}`}
                        >
                            {t('modifier')}
                        </Button>
                        <Button
                            variant='danger'
                            className='ms-3'
                            onClick={() => window.location.href=`/suppressionClient/${client.clientId}`}
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