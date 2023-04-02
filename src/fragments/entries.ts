import { gql } from "@apollo/client";

export const entryFragment = gql`
  fragment Entry on Entry {
    id
    name
    slug
    category {
      id
      name
    }
    documents {
      totalCount
    }
    isPublished
    active
  }
`;

export const entryDetailsFragment = gql`
  fragment EntryDetails on Entry {
    id
    name
    slug
    documentNumber
    isPublished
    active
    category {
      id
      name
    }
    email
    phone
    address
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
  }
`;
