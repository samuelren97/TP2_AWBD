import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function ItemAdresse({ adresse, idClient }) {
  const { t } = useTranslation();

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
                  (window.location.href = `/modificationClient/${idClient}/modificationAdresse/${adresse.adresseId}`)
                }
              >
                {t("modifier")}
              </Button>
              <Button
                variant="danger"
                className="ms-3"
                onClick={() =>
                  (window.location.href = `/modificationClient/${idClient}/suppressionAdresse/${adresse.adresseId}`)
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