import { gql } from "@apollo/client";

export const eventsQuery = gql`
  query Events($first: Int, $last: Int, $after: String, $before: String) {
    events(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          ...EventDetails
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
