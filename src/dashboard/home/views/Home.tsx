import React from "react";

import CircularLoading from "@portal/components/Circular";
import { useDocumentsQuery } from "@portal/graphql";

import Homepage from "../components/Homepage";

import { getDates } from "./utils";

export const Home = () => {
  const { today, tomorrow, nextWeek } = getDates();

  const { data: expired, loading: loading1 } = useDocumentsQuery({
    variables: {
      first: 10,
      filter: {
        expires: true,
        isPublished: true,
        expirationDate: { lte: today },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: closeToExpire, loading: loading2 } = useDocumentsQuery({
    variables: {
      first: 10,
      filter: {
        expires: true,
        isPublished: true,
        expirationDate: { gte: tomorrow, lte: nextWeek },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const expiredFilter = `/admin/documents?expirationDate_Lte=${today}`;
  const closeToExpireFilter = `/admin/documents?expirationDate_Gte=${tomorrow}&expirationDate_Lte=${nextWeek}`;

  if (loading1 || loading2) return <CircularLoading />;

  return (
    <Homepage
      expired={expired.documents}
      closeToExpire={closeToExpire.documents}
      expiredFilter={expiredFilter}
      closeToExpireFilter={closeToExpireFilter}
    />
  );
};

export default Home;
