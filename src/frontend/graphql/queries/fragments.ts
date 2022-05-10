import { gql } from "@apollo/client";

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;

export const CATEGORY = gql`
  fragment Category on Category {
    id
    name
    slug
  }
`;

export const VEHICLE = gql`
  ${CATEGORY}
  fragment Vehicle on Vehicle {
    id
    name
    slug
    documentNumber
    category {
      ...Category
    }
  }
`;

export const SEGMENT = gql`
  fragment Segment on Segment {
    id
    name
    slug
  }
`;

export const PROVIDER = gql`
  ${SEGMENT}
  fragment Segment on Segment {
    id
    name
    slug
    segment {
      ...Segment
    }
  }
`;
