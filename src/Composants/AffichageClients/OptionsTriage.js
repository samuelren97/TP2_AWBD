import React from 'react';

import { Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function OptionsTriage({ optionTrie, setOptionTrie, ordreTrie, setOrdreTrie }) {
    const { t } = useTranslation();
    
    return (
        <div className='mt-3 mb-5 p-3 border rounded'>
            <h4>{t('trierPar')}</h4>
            <hr/>
            
            <Row>
                <Col xs={12}>
                    <Form.Check type='radio'
                        checked={optionTrie === 'nom'}
                        name='optionTrie'
                        label={t('nom')}
                        onChange={() => setOptionTrie('nom')} 
                    />
                </Col>
                <Col xs={12}>
                    <Form.Check type='radio'
                        checked={optionTrie === 'prenom'}
                        name='optionTrie'
                        label={t('prenom')}
                        onChange={() => setOptionTrie('prenom')}
                    />
                </Col>
                <Col xs={12}>
                    <hr />
                    <Form.Check type='switch'
                        checked={ordreTrie == 'decroissant'}
                        label={t(ordreTrie)}
                        onChange={() => setOrdreTrie(ordreTrie == 'decroissant' ? 'croissant' : 'decroissant')} />
                </Col>
            </Row>
        </div>
    )
}

export default OptionsTriage;