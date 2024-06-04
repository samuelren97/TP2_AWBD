import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RiContactsLine } from 'react-icons/ri';

import Langages from '../i18n/Langages.js';

function BarreDeNavigation({ estAuthentifie, deconnexion }) {
    const { t } = useTranslation();

    let liens = (
        <Nav>
            <Nav.Link 
                href='/clients'
                active={window.location.pathname === '/clients'}
            >
                {t('clients')}
            </Nav.Link>

            <Nav.Link
                href='/creationClient'
                active={window.location.pathname === '/creationClient'}
            >
                {t('creerClient')}
            </Nav.Link>

            <Nav.Link onClick={deconnexion}>
                {t('deconnexion')}
            </Nav.Link>
        </Nav>
    );

    return (
        <Navbar className='bg-body-tertiary'>
                <Navbar.Brand href='/' className='ms-5'>
                    <RiContactsLine 
                        size={30}
                        className='d-inline-block align-top'
                    />
                    {' ' + t('titreApp')}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    { estAuthentifie && liens}
                </Navbar.Collapse>
                <Navbar.Collapse className='me-4 justify-content-end'>
                    <Langages />
                </Navbar.Collapse>
        </Navbar>
    )
}

export default BarreDeNavigation;