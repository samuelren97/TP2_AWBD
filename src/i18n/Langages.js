import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { useTranslation } from 'react-i18next';
import { Navbar } from 'react-bootstrap';

function Langages() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const changerLanguage = async () => {
            await i18n.changeLanguage('fr');
        }
        changerLanguage();
    }, [i18n]);

    function changerLangue(langue) {
        i18n.changeLanguage(langue);
    }

    return  (
        <Navbar.Text>
            <Form.Control as="select" className="mb-3  pe-3"
                onChange={(event) => changerLangue(event.target.value)} >
                <option value="fr">Français</option>
                <option value="en">English</option>
            </Form.Control>
        </Navbar.Text>
    );
}

export default Langages;