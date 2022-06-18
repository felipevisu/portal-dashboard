import { gql } from "@apollo/client";

export const segmentsQuery = gql`
  query Segments(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
  ) {
    segments(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
    ) {
      edges {
        node {
          ...Segment
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const segmentDetailsQuery = gql`
  query SegmentDetails($id: ID!) {
    segment(id: $id) {
      ...Segment
    }
  }
`;
