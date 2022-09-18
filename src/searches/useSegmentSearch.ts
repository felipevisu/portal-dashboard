import { gql } from "@apollo/client";
import {
  SearchSegmentsDocument,
  SearchSegmentsQuery,
  SearchSegmentsQueryVariables,
} from "@portal/graphql";
import { makeTopLevelSearch } from "@portal/hooks";

export const searchSegments = gql`
  query SearchSegments($after: String, $first: Int!, $query: String!) {
    search: segments(after: $after, first: $first, filter: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchSegmentsQuery,
  SearchSegmentsQueryVariables
>(SearchSegmentsDocument);
