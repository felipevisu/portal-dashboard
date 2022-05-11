import React from "react";
import { Link } from "react-router-dom";

import { Container } from "@portal/UI";

export const Home = () => {
  return (
    <div>
      <Container>
        <Link to="/veiculos">Veículos</Link>
      </Container>
    </div>
  );
};

export default Home;
