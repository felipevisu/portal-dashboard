import { gql } from "@apollo/client";

export const consultFragment = gql`
  fragment Consult on Consult {
    id
    created
    plugin
    response
  }
`;
