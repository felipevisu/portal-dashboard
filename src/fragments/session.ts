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

export const sessionDetailsFragment = gql`
  fragment SessionDetails on Session {
    id
    name
    slug
    content
    date
    time
    isPublished
  }
`;
