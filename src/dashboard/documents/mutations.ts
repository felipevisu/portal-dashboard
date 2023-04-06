import { gql } from "@apollo/client";

export const documentCreateMutation = gql`
  mutation DocumentCreate($input: DocumentInput!) {
    documentCreate(input: $input) {
      document {
        ...Document
      }
      errors {
        ...Error
      }
    }
  }
`;

export const documentUpdateMutation = gql`
  mutation DocumentUpdate($id: ID!, $input: DocumentInput!) {
    documentUpdate(id: $id, input: $input) {
      document {
        ...DocumentDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const documentDeleteMutation = gql`
  mutation DocumentDelete($id: ID!) {
    documentDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const documentBulkDeleteMutation = gql`
  mutation DocumentBulkDelete($ids: [ID!]!) {
    documentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;

export const documentFileDeleteMutation = gql`
  mutation DocumentFileDelete($id: ID!) {
    documentFileDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const approveDocumentFileMutation = gql`
  mutation ApproveDocumentFile($id: ID!) {
    approveDocumentFile(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const refuseDocumentFileMutation = gql`
  mutation RefuseDocumentFile($id: ID!) {
    refuseDocumentFile(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const restoreDocumentFileMutation = gql`
  mutation RestoreDocumentFile($id: ID!) {
    restoreDocumentFile(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const requestNewDocumentMutation = gql`
  mutation RequestNewDocument($id: ID!) {
    requestNewDocument(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const loadNewDocumentFromApiMutation = gql`
  mutation LoadNewDocumentFromAPI($id: ID!) {
    loadNewDocumentFromApi(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;
