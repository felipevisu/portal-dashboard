import React from "react";

import {
  useCloseToExpireDocumentsQuery,
  useExpiredDocumentsQuery,
} from "@portal/graphql";
import { usePaginator } from "@portal/hooks";

import Homepage from "../components/Homepage";

import { getDates } from "./utils";

export const Home = () => {
  const { today, tomorrow, nextWeek } = getDates();

  const { data: expired } = useExpiredDocumentsQuery({
    variables: { today },
  });

  const { data: closeToExpire } = useCloseToExpireDocumentsQuery({
    variables: { tomorrow, nextWeek },
  });

  const expiredPaginator = usePaginator();
  const closeToExpiredPaginator = usePaginator();

  return (
    <Homepage
      expired={expired.documents}
      closeToExpire={closeToExpire.documents}
      expiredPaginator={expiredPaginator}
      closeToExpirePaginator={closeToExpiredPaginator}
    />
  );
};

export default Home;
