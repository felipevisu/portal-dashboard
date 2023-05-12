import React from "react";

import CircularLoading from "@portal/components/Circular";
import { useDocumentsQuery, useEventsQuery } from "@portal/graphql";
import { mapEdgesToItems } from "@portal/utils/maps";

import Homepage from "../components/Homepage";

import { getDates } from "./utils";

export const Home = () => {
  const { today, tomorrow, nextWeek } = getDates();

  const { data: events, loading: eventsLoading } = useEventsQuery({
    variables: { first: 5 },
    fetchPolicy: "network-only",
  });

  const { data: expired, loading: expiredLoading } = useDocumentsQuery({
    variables: {
      first: 10,
      filter: {
        expires: true,
        isPublished: true,
        expirationDate: { lte: today },
        waiting: false,
      },
    },
    fetchPolicy: "network-only",
  });

  const { data: closeToExpire, loading: expiringLoading } = useDocumentsQuery({
    variables: {
      first: 10,
      filter: {
        expires: true,
        isPublished: true,
        expirationDate: { gte: tomorrow, lte: nextWeek },
        waiting: false,
      },
    },
    fetchPolicy: "network-only",
  });

  const expiredFilter = `/documents?expirationDateTo=${today}`;
  const closeToExpireFilter = `/documents?expirationDateForm=${tomorrow}&expirationDateTo=${nextWeek}`;

  if (eventsLoading || expiredLoading || expiringLoading) {
    return <CircularLoading />;
  }

  return (
    <Homepage
      events={mapEdgesToItems(events.events)}
      expired={mapEdgesToItems(expired.documents)}
      closeToExpire={mapEdgesToItems(closeToExpire.documents)}
      expiredFilter={expiredFilter}
      closeToExpireFilter={closeToExpireFilter}
    />
  );
};

export default Home;
