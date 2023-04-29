import { gql } from "@apollo/client";

export const channelListingEntryFragment = gql`
  fragment ChannelListingEntry on EntryChannelListing {
    isPublished
    isActive
    channel {
      id
      name
    }
  }
`;

export const entryFragment = gql`
  fragment Entry on Entry {
    id
    name
    slug
    updated
    category {
      id
      name
    }
    channelListings {
      ...ChannelListingEntry
    }
  }
`;

export const entryDetailsFragment = gql`
  fragment EntryDetails on Entry {
    id
    name
    slug
    documentNumber
    category {
      id
      name
    }
    email
    attributes {
      attribute {
        ...Attribute
      }
      values {
        ...AttributeValue
      }
    }
    consult {
      ...Consult
    }
    channelListings {
      ...ChannelListingEntry
    }
  }
`;
