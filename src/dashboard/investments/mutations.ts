import { gql } from "@apollo/client";

export const investmentBulkDeleteMutation = gql`
  mutation InvestmentBulkDelete($ids: [ID!]!) {
    investmentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
