import { gql } from "@apollo/client";

export const documentFragment = gql`
  fragment Document on Document {
    id
    name
    created
    beginDate
    expirationDate
    isPublished
    expired
    expires
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

export const documentDetailsFragment = gql`
  fragment DocumentDetails on Document {
    id
    name
    description
    isPublished
    expires
    file {
      url
    }
    created
    updated
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
