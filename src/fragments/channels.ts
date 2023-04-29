import { gql } from "@apollo/client";

export const channelFragment = gql`
  fragment Channel on Channel {
    id
    name
    slug
    isActive
  }
`;
