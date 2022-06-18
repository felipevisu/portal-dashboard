import { gql } from "@apollo/client";

export const segmentFragment = gql`
  fragment Segment on Segment {
    id
    name
    slug
  }
`;
