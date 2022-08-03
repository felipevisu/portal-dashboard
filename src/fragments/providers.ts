import { gql } from "@apollo/client";

export const documentFragment = gql`
  fragment Document on Document {
    id
    name
    created
  }
`;

export const documentDetailsFragment = gql`
  fragment DocumentDetails on Document {
    name
    description
    isPublished
    expires
    file
    publicationDate
    beginDate
    expirationDate
  }
`;

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
  }
`;
