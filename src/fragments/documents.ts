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
      id
      beginDate
      expirationDate
    }
    entry {
      id
      name
      type
    }
  }
`;

export const documentFileFragment = gql`
  fragment DocumentFile on DocumentFile {
    id
    created
    beginDate
    expirationDate
    status
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
    loadType
    defaultFile {
      ...DocumentFile
    }
    files {
      ...DocumentFile
    }
    events {
      ...Event
    }
    entry {
      id
      name
      type
    }
  }
`;

export const documentLoadFragment = gql`
  fragment DocumentLoad on DocumentLoad {
    id
    document {
      id
      name
    }
    documentFile {
      id
    }
    status
    errorMessage
  }
`;
