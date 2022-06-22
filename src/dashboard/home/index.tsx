import { Typography } from "@mui/material";
import Container from "@portal/components/Container";
import React from "react";

export const Home = () => {
  return (
    <Container>
      <Typography variant="h4" fontWeight={700}>
        Dashboard
      </Typography>
    </Container>
  );
};

export default Home;
