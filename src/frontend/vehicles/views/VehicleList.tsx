import React from "react";
import { useQuery } from "@apollo/client";

import { VEHICLE_LIST } from "../../graphql/queries";

export const VehicleList = () => {
  const { loading, error, data } = useQuery(VEHICLE_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>Relação de Veículos</div>;
};

export default VehicleList;
