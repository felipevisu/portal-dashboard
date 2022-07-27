import { gql } from "@apollo/client";

export const providerCreateMutation = gql`
  mutation ProviderCreate($input: ProviderInput!) {
    providerCreate(input: $input) {
      provider {
        ...ProviderDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const providerUpdateMutation = gql`
  mutation ProviderUpdate($id: ID, $input: ProviderInput!) {
    providerUpdate(id: $id, input: $input) {
      provider {
        ...ProviderDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const providerDeleteMutation = gql`
  mutation ProviderDelete($id: ID!) {
    providerDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const providerBulkDeleteMutation = gql`
  mutation ProviderBulkDelete($ids: [ID!]!) {
    providerBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;

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
