import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

function PageAcceuil() {
    const { t } = useTranslation();
    const { isAuthenticated,loginWithRedirect } = useAuth0();

    return (
        <>
        <h1 className='mt-3'>{t('acceuil')}</h1>
        <hr />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Sodales ut etiam sit amet nisl purus. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. 
            Nullam non nisi est sit amet. Tincidunt tortor aliquam nulla facilisi cras. Nibh tellus molestie nunc non. Pellentesque eu tincidunt 
            tortor aliquam nulla facilisi cras. Velit aliquet sagittis id consectetur purus. Sit amet nulla facilisi morbi tempus iaculis.
            Auctor neque vitae tempus quam. Fringilla ut morbi tincidunt augue interdum velit euismod in. Sed id semper risus in. Feugiat 
            pretium nibh ipsum consequat nisl vel pretium lectus. Senectus et netus et malesuada fames ac turpis egestas. Elit pellentesque
            habitant morbi tristique senectus et netus et. Purus sit amet luctus venenatis lectus magna. Arcu non odio euismod lacinia at.
            Id faucibus nisl tincidunt eget. Turpis in eu mi bibendum. Sem nulla pharetra diam sit amet nisl suscipit adipiscing.
        </p>
        <div className='text-end'>
            {!isAuthenticated && <Button onClick={loginWithRedirect} variant='success'>{t('connexion')}</Button>}
        </div>
        </>
    )
}

export default PageAcceuil;