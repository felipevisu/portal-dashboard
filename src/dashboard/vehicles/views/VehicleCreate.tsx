import { useVehicleCreateMutation } from "@portal/graphql";
import React from "react";
import { Link } from "react-router-dom";

export const VehicleCreate = () => {
  const [createVehicle, createVehicleResult] = useVehicleCreateMutation();

  const handleSubmit = async () => {
    await createVehicle({ variables: { input: {} } });
  };

  return (
    <div>
      <h1>Novo veículo</h1>
      <Link to="/admin/vehicles">Voltar</Link>
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default VehicleCreate;
