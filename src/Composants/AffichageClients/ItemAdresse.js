import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function ItemAdresse({ adresse, idClient }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Col xs={12} md={6} lg={4}>
        <Card className="m-3">
          <Card.Body>
            <Card.Title>
              <h3>
                {adresse.numeroCivique} {adresse.typeVoie} {adresse.odonyme}
              </h3>
            </Card.Title>
            <Card.Text className="mt-3 text-end">
              <Button
                variant="primary"
                onClick={() =>
                  (navigate(`/modificationClient/${idClient}/modificationAdresse/${adresse.adresseId}`))
                }
              >
                {t("modifier")}
              </Button>
              <Button
                variant="danger"
                className="ms-3"
                onClick={() =>
                  (navigate(`/suppressionAdresse/${idClient}/${adresse.adresseId}`))
                }
              >
                {t("supprimer")}
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}