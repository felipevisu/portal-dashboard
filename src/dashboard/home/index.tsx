import useAuth from "../auth/hook";
import React, { useEffect } from "react";

export const Home = () => {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return <div>dashboard</div>;
};

export default Home;
