import React from "react";
import { Link } from "react-router-dom";

export const VehicleCreate = () => {
  return (
    <div>
      <h1>Novo veículo</h1>
      <Link to="/admin/vehicles">Voltar</Link>
    </div>
  );
};

export default VehicleCreate;
