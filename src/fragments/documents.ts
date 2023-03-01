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
    file {
      url
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
    created
    updated
    defaultFile {
      ...DocumentFile
    }
    files {
      ...DocumentFile
    }
    entry {
      id
      name
    }
  }
`;
