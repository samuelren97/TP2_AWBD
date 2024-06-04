import React from "react";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

const TIMEOUT_REDIRECTION = 3000;

export function PageSuppressionAdresse() {
    const { idClient, idAdresse } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [messageConfirmation, setMessageConfirmation] = useState({
        variant: "",
        message: "",
    });

    const obtenirAdresse = async () => {
        const reponse = await fetch(`/api/Clients/${idClient}/Adresses/${idAdresse}`, {
            method: "GET",
        });

        if (reponse.status !== 200 && messageConfirmation.variant.length === 0) {
            navigate("/404");
        }
    };
    obtenirAdresse();

    const supprimerAdresse = async () => {
        const reponse = await fetch(`/api/Clients/${idClient}/Adresses/${idAdresse}`, {
            method: "DELETE",
        });

        const message = {
            variant: "danger",
            message: t("messageErreurSuppressionAdresse"),
        };

        if (reponse.status === 204) {
            message.variant = "success";
            message.message = t("messageConfirmationSuppressionAdresse");
        }

        setMessageConfirmation(message);
    };

    let composantAAfficher = (
        <div className="mt-3 text-center">
            <h3>
                {t("messageSuppressionAdresse")}
                {idAdresse}?
            </h3>
            <div className="mt-3">
                <Button
                    variant="primary"
                    className="me-2 ps-5 pe-5"
                    onClick={() => navigate(`/modificationClient/${idClient}`)}
                >
                    {t("non")}
                </Button>
                <Button variant="danger" className="ms-2 ps-5 pe-5" onClick={supprimerAdresse}>
                    {t("oui")}
                </Button>
            </div>
        </div>
    );

    if (messageConfirmation.variant.length > 0) {
        setTimeout(() => {
            navigate(`/modificationClient/${idClient}`);
        }, TIMEOUT_REDIRECTION);
        composantAAfficher = (
            <Alert variant={messageConfirmation.variant} className="mt-3">
                {messageConfirmation.message}
            </Alert>
        );
    }

    return <div>{composantAAfficher}</div>;
}
