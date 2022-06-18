import { gql } from "@apollo/client";

export const providerFragment = gql`
  fragment Provider on Provider {
    id
    name
    slug
    segment {
      id
      name
    }
    isPublished
  }
`;

export const providerDetailsFragment = gql`
  fragment ProviderDetails on Provider {
    id
    name
    slug
    documentNumber
    segment {
      id
      name
    }
    isPublished
  }
`;
