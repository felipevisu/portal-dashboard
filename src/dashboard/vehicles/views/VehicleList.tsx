import React from "react";
import { Header } from "../../components";

export const VehicleList = () => {
  return (
    <div>
      <Header
        title="Veículos"
        buttonLabel="Novo veículo"
        buttonPath="/admin/vehicles/create"
      />
    </div>
  );
};

export default VehicleList;
