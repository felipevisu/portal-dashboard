import { gql } from "@apollo/client";

export const sessionFragment = gql`
  fragment Session on Session {
    id
    name
    slug
    date
    time
    isPublished
  }
`;
