import { gql } from "@apollo/client";

export const documentFragment = gql`
  fragment Document on Document {
    id
    name
    created
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
  }
`;
