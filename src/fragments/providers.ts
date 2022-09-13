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
    documents {
      totalCount
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
    isPublished
    segment {
      id
      name
    }
    email
    phone
    address
  }
`;
