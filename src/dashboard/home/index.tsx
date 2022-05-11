import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/admin/vehicles">Veículos</Link>
    </div>
  );
};

export default Home;
