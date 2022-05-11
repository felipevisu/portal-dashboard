import React from "react";
import { Link } from "react-router-dom";
import { useVehiclesQuery } from "@portal/graphql";

export const VehicleList = () => {
  const { data, loading, refetch } = useVehiclesQuery();

  return (
    <div>
      <h1>Veículos</h1>
      <Link to="/admin/vehicles/create">Novo veículo</Link>
    </div>
  );
};

export default VehicleList;
