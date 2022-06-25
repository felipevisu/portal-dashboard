import { gql } from "@apollo/client";

export const sessionFragment = gql`
  fragment Session on Session {
    id
    name
    slug
    date
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
    isPublished
  }
`;
