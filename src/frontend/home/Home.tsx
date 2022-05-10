import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "@portal/lib/routes";
import { Container } from "@portal/UI";

export const Home = () => {
  return (
    <div>
      <Container>
        <div className="grid grid-cols-4">
          {ROUTES.map((route) => (
            <div key={route.to}>
              <Link to={route.to}>{route.name}</Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
