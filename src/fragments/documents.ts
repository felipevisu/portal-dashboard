import { gql } from "@apollo/client";

export const documentFragment = gql`
  fragment Document on Document {
    id
    name
    created
    expired
    isPublished
  }
`;

export const documentDetailsFragment = gql`
  fragment DocumentDetails on Document {
    id
    name
    description
    isPublished
    expires
    file
    fileUrl
    fileName
    publicationDate
    beginDate
    expirationDate
    vehicle {
      id
      name
    }
    provider {
      id
      name
    }
  }
`;

export const documentHomeFragment = gql`
  fragment DocumentHome on Document {
    id
    name
    publicationDate
    beginDate
    expirationDate
    vehicle {
      id
      name
    }
    provider {
      id
      name
    }
  }
`;
