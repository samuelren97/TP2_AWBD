import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function BoutonRetour({lienPrecedent}) {
  const navigate = useNavigate();

  return (
    <FaRegArrowAltCircleLeft
      onClick={() => navigate(lienPrecedent)}
      style={{ cursor: 'pointer' }}
    />
  );
}