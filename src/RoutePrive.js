import React from "react";
import { Outlet, Navigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function RoutePrive()  {
    const { isAuthenticated, isLoading, error } = useAuth0();

    if(isLoading) {
        return <div>Chargement...</div>
    }

    if(error) {
        return <div>Erreur : {error.message}</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}