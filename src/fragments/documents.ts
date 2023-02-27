import { gql } from "@apollo/client";

export const documentFragment = gql`
  fragment Document on Document {
    id
    name
    created
    isPublished
    expired
    expires
    defaultFile {
      beginDate
      expirationDate
    }
    entry {
      id
      name
    }
  }
`;

export const documentFileFragment = gql`
  fragment DocumentFile on DocumentFile {
    id
    created
    beginDate
    expirationDate
  }
`;

export const documentDetailsFragment = gql`
  fragment DocumentDetails on Document {
    id
    name
    description
    isPublished
    expires
    created
    updated
    defaultFile {
      beginDate
      expirationDate
      file {
        url
      }
    }
    entry {
      id
      name
    }
  }
`;
