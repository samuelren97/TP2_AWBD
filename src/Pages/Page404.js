import React from 'react'
import { Link } from 'react-router-dom'
import { BsEmojiFrown } from 'react-icons/bs';

function Page404() {
    return (
        <div className='mt-3 text-center'>
            <BsEmojiFrown size={90} />
            <h3>Oops... La page demandée n'est pas valide</h3>
            <Link to={"/"}>Retour à la page d'acceuil</Link>
        </div>
    )
}

export default Page404;