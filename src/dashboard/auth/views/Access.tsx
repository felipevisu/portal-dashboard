import React, { useState } from "react";

import Login from "./Login";
import RequestPasswordReset from "./RequestPasswordReset";

export const Access = () => {
  const [page, setPage] = useState("login");

  const request = () => setPage("request");
  const login = () => setPage("login");

  if (page === "login") return <Login action={request} />;
  if (page === "request") return <RequestPasswordReset action={login} />;

  return null;
};

export default Access;
