import React from "react";

import CircularLoading from "@portal/components/Circular";
import {
  useCloseToExpireDocumentsQuery,
  useExpiredDocumentsQuery,
} from "@portal/graphql";

import Homepage from "../components/Homepage";

import { getDates } from "./utils";

export const Home = () => {
  const { today, tomorrow, nextWeek } = getDates();

  const { data: expired, loading: loading1 } = useExpiredDocumentsQuery({
    variables: { today },
  });

  const { data: closeToExpire, loading: loading2 } =
    useCloseToExpireDocumentsQuery({
      variables: { tomorrow, nextWeek },
    });

  if (loading1 || loading2) return <CircularLoading />;

  return (
    <Homepage
      expired={expired.documents}
      closeToExpire={closeToExpire.documents}
    />
  );
};

export default Home;