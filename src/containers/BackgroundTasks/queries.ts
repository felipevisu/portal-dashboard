import { gql } from "@apollo/client";

export const checkDocumentLoadStatus = gql`
  query CheckDocumentLoadStatus($id: ID!) {
    documentLoad(id: $id) {
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
  }
`;
