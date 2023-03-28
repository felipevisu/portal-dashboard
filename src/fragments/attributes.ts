import { gql } from "@apollo/client";

export const attributeValueFragment = gql`
  fragment AttributeValue on AttributeValue {
    id
    name
    slug
    file {
      url
    }
    boolean
    date
    dateTime
    value
    plainText
  }
`;

export const attributeValueDetailsFragment = gql`
  ${attributeValueFragment}
  fragment AttributeValueDetails on AttributeValue {
    ...AttributeValue
    plainText
  }
`;

export const attributeFragment = gql`
  fragment Attribute on Attribute {
    id
    name
    slug
    type
    visibleInWebsite
    filterableInDashboard
    filterableInWebsite
    inputType
    valueRequired
  }
`;

export const attributeDetailsFragment = gql`
  fragment AttributeDetails on Attribute {
    ...Attribute
    inputType
    valueRequired
  }
`;

export const attributeValueListFragment = gql`
  fragment AttributeValueList on AttributeValueCountableConnection {
    pageInfo {
      ...PageInfo
    }
    edges {
      cursor
      node {
        ...AttributeValueDetails
      }
    }
  }
`;

export const availableAttributeFragment = gql`
  fragment AvailableAttribute on Attribute {
    id
    name
    slug
  }
`;
