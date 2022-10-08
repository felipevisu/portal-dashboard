import * as Types from './types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  isStaff
}
    `;
export const UserBaseFragmentDoc = gql`
    fragment UserBase on User {
  id
  firstName
  lastName
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
  slug
  type
  entries {
    totalCount
  }
}
    `;
export const DocumentFragmentDoc = gql`
    fragment Document on Document {
  id
  name
  created
  beginDate
  expirationDate
  isPublished
  expired
  expires
  entry {
    id
    name
  }
}
    `;
export const DocumentDetailsFragmentDoc = gql`
    fragment DocumentDetails on Document {
  id
  name
  description
  isPublished
  expires
  file {
    url
  }
  created
  updated
  beginDate
  expirationDate
  entry {
    id
    name
  }
}
    `;
export const EntryFragmentDoc = gql`
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
}
    `;
export const EntryDetailsFragmentDoc = gql`
    fragment EntryDetails on Entry {
  id
  name
  slug
  documentNumber
  isPublished
  category {
    id
    name
  }
  email
  phone
  address
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on Error {
  code
  field
  message
}
    `;
export const BulkItemErrorFragmentDoc = gql`
    fragment BulkItemError on BulkItemError {
  code
  field
  message
  index
}
    `;
export const InvestmentFragmentDoc = gql`
    fragment Investment on Investment {
  id
  year
  month
  isPublished
}
    `;
export const ItemFragmentDoc = gql`
    fragment Item on Item {
  id
  name
  value
}
    `;
export const InvestmentDetailsFragmentDoc = gql`
    fragment InvestmentDetails on Investment {
  id
  year
  month
  isPublished
  items {
    ...Item
  }
}
    ${ItemFragmentDoc}`;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}
    `;
export const SessionFragmentDoc = gql`
    fragment Session on Session {
  id
  name
  slug
  date
  isPublished
}
    `;
export const SessionDetailsFragmentDoc = gql`
    fragment SessionDetails on Session {
  id
  name
  slug
  content
  date
  isPublished
}
    `;
export const TokenAuthDocument = gql`
    mutation tokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    errors {
      message
      field
      code
    }
    token
    user {
      email
      firstName
      lastName
    }
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<Types.TokenAuthMutation, Types.TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<Types.TokenAuthMutation, Types.TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.TokenAuthMutation, Types.TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<Types.TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<Types.TokenAuthMutation, Types.TokenAuthMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<Types.MeQuery, Types.MeQueryVariables>;
export const CategoryCreateDocument = gql`
    mutation CategoryCreate($input: CategoryInput!) {
  categoryCreate(input: $input) {
    category {
      ...Category
    }
    errors {
      ...Error
    }
  }
}
    ${CategoryFragmentDoc}
${ErrorFragmentDoc}`;
export type CategoryCreateMutationFn = Apollo.MutationFunction<Types.CategoryCreateMutation, Types.CategoryCreateMutationVariables>;

/**
 * __useCategoryCreateMutation__
 *
 * To run a mutation, you first call `useCategoryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryCreateMutation, { data, loading, error }] = useCategoryCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.CategoryCreateMutation, Types.CategoryCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CategoryCreateMutation, Types.CategoryCreateMutationVariables>(CategoryCreateDocument, options);
      }
export type CategoryCreateMutationHookResult = ReturnType<typeof useCategoryCreateMutation>;
export type CategoryCreateMutationResult = Apollo.MutationResult<Types.CategoryCreateMutation>;
export type CategoryCreateMutationOptions = Apollo.BaseMutationOptions<Types.CategoryCreateMutation, Types.CategoryCreateMutationVariables>;
export const CategoryUpdateDocument = gql`
    mutation CategoryUpdate($id: ID, $input: CategoryInput!) {
  categoryUpdate(id: $id, input: $input) {
    category {
      ...Category
    }
    errors {
      ...Error
    }
  }
}
    ${CategoryFragmentDoc}
${ErrorFragmentDoc}`;
export type CategoryUpdateMutationFn = Apollo.MutationFunction<Types.CategoryUpdateMutation, Types.CategoryUpdateMutationVariables>;

/**
 * __useCategoryUpdateMutation__
 *
 * To run a mutation, you first call `useCategoryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryUpdateMutation, { data, loading, error }] = useCategoryUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCategoryUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.CategoryUpdateMutation, Types.CategoryUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CategoryUpdateMutation, Types.CategoryUpdateMutationVariables>(CategoryUpdateDocument, options);
      }
export type CategoryUpdateMutationHookResult = ReturnType<typeof useCategoryUpdateMutation>;
export type CategoryUpdateMutationResult = Apollo.MutationResult<Types.CategoryUpdateMutation>;
export type CategoryUpdateMutationOptions = Apollo.BaseMutationOptions<Types.CategoryUpdateMutation, Types.CategoryUpdateMutationVariables>;
export const CategoryDeleteDocument = gql`
    mutation CategoryDelete($id: ID!) {
  categoryDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CategoryDeleteMutationFn = Apollo.MutationFunction<Types.CategoryDeleteMutation, Types.CategoryDeleteMutationVariables>;

/**
 * __useCategoryDeleteMutation__
 *
 * To run a mutation, you first call `useCategoryDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryDeleteMutation, { data, loading, error }] = useCategoryDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.CategoryDeleteMutation, Types.CategoryDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CategoryDeleteMutation, Types.CategoryDeleteMutationVariables>(CategoryDeleteDocument, options);
      }
export type CategoryDeleteMutationHookResult = ReturnType<typeof useCategoryDeleteMutation>;
export type CategoryDeleteMutationResult = Apollo.MutationResult<Types.CategoryDeleteMutation>;
export type CategoryDeleteMutationOptions = Apollo.BaseMutationOptions<Types.CategoryDeleteMutation, Types.CategoryDeleteMutationVariables>;
export const CategoryBulkDeleteDocument = gql`
    mutation CategoryBulkDelete($ids: [ID!]!) {
  categoryBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type CategoryBulkDeleteMutationFn = Apollo.MutationFunction<Types.CategoryBulkDeleteMutation, Types.CategoryBulkDeleteMutationVariables>;

/**
 * __useCategoryBulkDeleteMutation__
 *
 * To run a mutation, you first call `useCategoryBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryBulkDeleteMutation, { data, loading, error }] = useCategoryBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useCategoryBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.CategoryBulkDeleteMutation, Types.CategoryBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CategoryBulkDeleteMutation, Types.CategoryBulkDeleteMutationVariables>(CategoryBulkDeleteDocument, options);
      }
export type CategoryBulkDeleteMutationHookResult = ReturnType<typeof useCategoryBulkDeleteMutation>;
export type CategoryBulkDeleteMutationResult = Apollo.MutationResult<Types.CategoryBulkDeleteMutation>;
export type CategoryBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.CategoryBulkDeleteMutation, Types.CategoryBulkDeleteMutationVariables>;
export const CategoriesDocument = gql`
    query Categories($first: Int, $last: Int, $after: String, $before: String, $filter: CategoryFilterInput) {
  categories(
    first: $first
    last: $last
    after: $after
    before: $before
    filter: $filter
  ) {
    edges {
      node {
        ...Category
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${CategoryFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CategoriesQuery, Types.CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CategoriesQuery, Types.CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CategoriesQuery, Types.CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<Types.CategoriesQuery, Types.CategoriesQueryVariables>;
export const CategoryDetailsDocument = gql`
    query CategoryDetails($id: ID!) {
  category(id: $id) {
    ...Category
  }
}
    ${CategoryFragmentDoc}`;

/**
 * __useCategoryDetailsQuery__
 *
 * To run a query within a React component, call `useCategoryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.CategoryDetailsQuery, Types.CategoryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CategoryDetailsQuery, Types.CategoryDetailsQueryVariables>(CategoryDetailsDocument, options);
      }
export function useCategoryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CategoryDetailsQuery, Types.CategoryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CategoryDetailsQuery, Types.CategoryDetailsQueryVariables>(CategoryDetailsDocument, options);
        }
export type CategoryDetailsQueryHookResult = ReturnType<typeof useCategoryDetailsQuery>;
export type CategoryDetailsLazyQueryHookResult = ReturnType<typeof useCategoryDetailsLazyQuery>;
export type CategoryDetailsQueryResult = Apollo.QueryResult<Types.CategoryDetailsQuery, Types.CategoryDetailsQueryVariables>;
export const DocumentCreateDocument = gql`
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
    ${DocumentFragmentDoc}
${ErrorFragmentDoc}`;
export type DocumentCreateMutationFn = Apollo.MutationFunction<Types.DocumentCreateMutation, Types.DocumentCreateMutationVariables>;

/**
 * __useDocumentCreateMutation__
 *
 * To run a mutation, you first call `useDocumentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDocumentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [documentCreateMutation, { data, loading, error }] = useDocumentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDocumentCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.DocumentCreateMutation, Types.DocumentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DocumentCreateMutation, Types.DocumentCreateMutationVariables>(DocumentCreateDocument, options);
      }
export type DocumentCreateMutationHookResult = ReturnType<typeof useDocumentCreateMutation>;
export type DocumentCreateMutationResult = Apollo.MutationResult<Types.DocumentCreateMutation>;
export type DocumentCreateMutationOptions = Apollo.BaseMutationOptions<Types.DocumentCreateMutation, Types.DocumentCreateMutationVariables>;
export const DocumentUpdateDocument = gql`
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
    ${DocumentDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type DocumentUpdateMutationFn = Apollo.MutationFunction<Types.DocumentUpdateMutation, Types.DocumentUpdateMutationVariables>;

/**
 * __useDocumentUpdateMutation__
 *
 * To run a mutation, you first call `useDocumentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDocumentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [documentUpdateMutation, { data, loading, error }] = useDocumentUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDocumentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.DocumentUpdateMutation, Types.DocumentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DocumentUpdateMutation, Types.DocumentUpdateMutationVariables>(DocumentUpdateDocument, options);
      }
export type DocumentUpdateMutationHookResult = ReturnType<typeof useDocumentUpdateMutation>;
export type DocumentUpdateMutationResult = Apollo.MutationResult<Types.DocumentUpdateMutation>;
export type DocumentUpdateMutationOptions = Apollo.BaseMutationOptions<Types.DocumentUpdateMutation, Types.DocumentUpdateMutationVariables>;
export const DocumentDeleteDocument = gql`
    mutation DocumentDelete($id: ID!) {
  documentDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DocumentDeleteMutationFn = Apollo.MutationFunction<Types.DocumentDeleteMutation, Types.DocumentDeleteMutationVariables>;

/**
 * __useDocumentDeleteMutation__
 *
 * To run a mutation, you first call `useDocumentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDocumentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [documentDeleteMutation, { data, loading, error }] = useDocumentDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.DocumentDeleteMutation, Types.DocumentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DocumentDeleteMutation, Types.DocumentDeleteMutationVariables>(DocumentDeleteDocument, options);
      }
export type DocumentDeleteMutationHookResult = ReturnType<typeof useDocumentDeleteMutation>;
export type DocumentDeleteMutationResult = Apollo.MutationResult<Types.DocumentDeleteMutation>;
export type DocumentDeleteMutationOptions = Apollo.BaseMutationOptions<Types.DocumentDeleteMutation, Types.DocumentDeleteMutationVariables>;
export const DocumentBulkDeleteDocument = gql`
    mutation DocumentBulkDelete($ids: [ID!]!) {
  documentBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type DocumentBulkDeleteMutationFn = Apollo.MutationFunction<Types.DocumentBulkDeleteMutation, Types.DocumentBulkDeleteMutationVariables>;

/**
 * __useDocumentBulkDeleteMutation__
 *
 * To run a mutation, you first call `useDocumentBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDocumentBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [documentBulkDeleteMutation, { data, loading, error }] = useDocumentBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDocumentBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.DocumentBulkDeleteMutation, Types.DocumentBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DocumentBulkDeleteMutation, Types.DocumentBulkDeleteMutationVariables>(DocumentBulkDeleteDocument, options);
      }
export type DocumentBulkDeleteMutationHookResult = ReturnType<typeof useDocumentBulkDeleteMutation>;
export type DocumentBulkDeleteMutationResult = Apollo.MutationResult<Types.DocumentBulkDeleteMutation>;
export type DocumentBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.DocumentBulkDeleteMutation, Types.DocumentBulkDeleteMutationVariables>;
export const DocumentDetailsDocument = gql`
    query DocumentDetails($id: ID!) {
  document(id: $id) {
    ...DocumentDetails
  }
}
    ${DocumentDetailsFragmentDoc}`;

/**
 * __useDocumentDetailsQuery__
 *
 * To run a query within a React component, call `useDocumentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.DocumentDetailsQuery, Types.DocumentDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DocumentDetailsQuery, Types.DocumentDetailsQueryVariables>(DocumentDetailsDocument, options);
      }
export function useDocumentDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DocumentDetailsQuery, Types.DocumentDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DocumentDetailsQuery, Types.DocumentDetailsQueryVariables>(DocumentDetailsDocument, options);
        }
export type DocumentDetailsQueryHookResult = ReturnType<typeof useDocumentDetailsQuery>;
export type DocumentDetailsLazyQueryHookResult = ReturnType<typeof useDocumentDetailsLazyQuery>;
export type DocumentDetailsQueryResult = Apollo.QueryResult<Types.DocumentDetailsQuery, Types.DocumentDetailsQueryVariables>;
export const DocumentsDocument = gql`
    query Documents($first: Int, $last: Int, $after: String, $before: String, $filter: DocumentFilterInput) {
  documents(
    first: $first
    last: $last
    after: $after
    before: $before
    filter: $filter
  ) {
    edges {
      node {
        ...Document
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${DocumentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useDocumentsQuery__
 *
 * To run a query within a React component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.DocumentsQuery, Types.DocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DocumentsQuery, Types.DocumentsQueryVariables>(DocumentsDocument, options);
      }
export function useDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DocumentsQuery, Types.DocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DocumentsQuery, Types.DocumentsQueryVariables>(DocumentsDocument, options);
        }
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>;
export type DocumentsLazyQueryHookResult = ReturnType<typeof useDocumentsLazyQuery>;
export type DocumentsQueryResult = Apollo.QueryResult<Types.DocumentsQuery, Types.DocumentsQueryVariables>;
export const EntryCreateDocument = gql`
    mutation EntryCreate($type: EntryTypeEnum!, $input: EntryInput!) {
  entryCreate(type: $type, input: $input) {
    entry {
      ...EntryDetails
    }
    errors {
      ...Error
    }
  }
}
    ${EntryDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type EntryCreateMutationFn = Apollo.MutationFunction<Types.EntryCreateMutation, Types.EntryCreateMutationVariables>;

/**
 * __useEntryCreateMutation__
 *
 * To run a mutation, you first call `useEntryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entryCreateMutation, { data, loading, error }] = useEntryCreateMutation({
 *   variables: {
 *      type: // value for 'type'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEntryCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.EntryCreateMutation, Types.EntryCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EntryCreateMutation, Types.EntryCreateMutationVariables>(EntryCreateDocument, options);
      }
export type EntryCreateMutationHookResult = ReturnType<typeof useEntryCreateMutation>;
export type EntryCreateMutationResult = Apollo.MutationResult<Types.EntryCreateMutation>;
export type EntryCreateMutationOptions = Apollo.BaseMutationOptions<Types.EntryCreateMutation, Types.EntryCreateMutationVariables>;
export const EntryUpdateDocument = gql`
    mutation EntryUpdate($id: ID, $input: EntryInput!) {
  entryUpdate(id: $id, input: $input) {
    entry {
      ...EntryDetails
    }
    errors {
      ...Error
    }
  }
}
    ${EntryDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type EntryUpdateMutationFn = Apollo.MutationFunction<Types.EntryUpdateMutation, Types.EntryUpdateMutationVariables>;

/**
 * __useEntryUpdateMutation__
 *
 * To run a mutation, you first call `useEntryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entryUpdateMutation, { data, loading, error }] = useEntryUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEntryUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.EntryUpdateMutation, Types.EntryUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EntryUpdateMutation, Types.EntryUpdateMutationVariables>(EntryUpdateDocument, options);
      }
export type EntryUpdateMutationHookResult = ReturnType<typeof useEntryUpdateMutation>;
export type EntryUpdateMutationResult = Apollo.MutationResult<Types.EntryUpdateMutation>;
export type EntryUpdateMutationOptions = Apollo.BaseMutationOptions<Types.EntryUpdateMutation, Types.EntryUpdateMutationVariables>;
export const EntryDeleteDocument = gql`
    mutation EntryDelete($id: ID!) {
  entryDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type EntryDeleteMutationFn = Apollo.MutationFunction<Types.EntryDeleteMutation, Types.EntryDeleteMutationVariables>;

/**
 * __useEntryDeleteMutation__
 *
 * To run a mutation, you first call `useEntryDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntryDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entryDeleteMutation, { data, loading, error }] = useEntryDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEntryDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.EntryDeleteMutation, Types.EntryDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EntryDeleteMutation, Types.EntryDeleteMutationVariables>(EntryDeleteDocument, options);
      }
export type EntryDeleteMutationHookResult = ReturnType<typeof useEntryDeleteMutation>;
export type EntryDeleteMutationResult = Apollo.MutationResult<Types.EntryDeleteMutation>;
export type EntryDeleteMutationOptions = Apollo.BaseMutationOptions<Types.EntryDeleteMutation, Types.EntryDeleteMutationVariables>;
export const EntryBulkDeleteDocument = gql`
    mutation EntryBulkDelete($ids: [ID!]!) {
  entryBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type EntryBulkDeleteMutationFn = Apollo.MutationFunction<Types.EntryBulkDeleteMutation, Types.EntryBulkDeleteMutationVariables>;

/**
 * __useEntryBulkDeleteMutation__
 *
 * To run a mutation, you first call `useEntryBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEntryBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [entryBulkDeleteMutation, { data, loading, error }] = useEntryBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useEntryBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.EntryBulkDeleteMutation, Types.EntryBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EntryBulkDeleteMutation, Types.EntryBulkDeleteMutationVariables>(EntryBulkDeleteDocument, options);
      }
export type EntryBulkDeleteMutationHookResult = ReturnType<typeof useEntryBulkDeleteMutation>;
export type EntryBulkDeleteMutationResult = Apollo.MutationResult<Types.EntryBulkDeleteMutation>;
export type EntryBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.EntryBulkDeleteMutation, Types.EntryBulkDeleteMutationVariables>;
export const EntriesDocument = gql`
    query Entries($first: Int, $last: Int, $after: String, $before: String, $filter: EntryFilterInput) {
  entries(
    first: $first
    last: $last
    after: $after
    before: $before
    filter: $filter
  ) {
    edges {
      node {
        ...Entry
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${EntryFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useEntriesQuery__
 *
 * To run a query within a React component, call `useEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntriesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEntriesQuery(baseOptions?: Apollo.QueryHookOptions<Types.EntriesQuery, Types.EntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntriesQuery, Types.EntriesQueryVariables>(EntriesDocument, options);
      }
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntriesQuery, Types.EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntriesQuery, Types.EntriesQueryVariables>(EntriesDocument, options);
        }
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>;
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>;
export type EntriesQueryResult = Apollo.QueryResult<Types.EntriesQuery, Types.EntriesQueryVariables>;
export const EntryDetailsDocument = gql`
    query EntryDetails($id: ID!, $first: Int = 10, $after: String) {
  entry(id: $id) {
    ...EntryDetails
    documents(first: $first, after: $after) {
      edges {
        node {
          ...Document
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
}
    ${EntryDetailsFragmentDoc}
${DocumentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useEntryDetailsQuery__
 *
 * To run a query within a React component, call `useEntryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useEntryDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.EntryDetailsQuery, Types.EntryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntryDetailsQuery, Types.EntryDetailsQueryVariables>(EntryDetailsDocument, options);
      }
export function useEntryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntryDetailsQuery, Types.EntryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntryDetailsQuery, Types.EntryDetailsQueryVariables>(EntryDetailsDocument, options);
        }
export type EntryDetailsQueryHookResult = ReturnType<typeof useEntryDetailsQuery>;
export type EntryDetailsLazyQueryHookResult = ReturnType<typeof useEntryDetailsLazyQuery>;
export type EntryDetailsQueryResult = Apollo.QueryResult<Types.EntryDetailsQuery, Types.EntryDetailsQueryVariables>;
export const InvestmentBulkDeleteDocument = gql`
    mutation InvestmentBulkDelete($ids: [ID!]!) {
  investmentBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type InvestmentBulkDeleteMutationFn = Apollo.MutationFunction<Types.InvestmentBulkDeleteMutation, Types.InvestmentBulkDeleteMutationVariables>;

/**
 * __useInvestmentBulkDeleteMutation__
 *
 * To run a mutation, you first call `useInvestmentBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestmentBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investmentBulkDeleteMutation, { data, loading, error }] = useInvestmentBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useInvestmentBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.InvestmentBulkDeleteMutation, Types.InvestmentBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.InvestmentBulkDeleteMutation, Types.InvestmentBulkDeleteMutationVariables>(InvestmentBulkDeleteDocument, options);
      }
export type InvestmentBulkDeleteMutationHookResult = ReturnType<typeof useInvestmentBulkDeleteMutation>;
export type InvestmentBulkDeleteMutationResult = Apollo.MutationResult<Types.InvestmentBulkDeleteMutation>;
export type InvestmentBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.InvestmentBulkDeleteMutation, Types.InvestmentBulkDeleteMutationVariables>;
export const InvestmentDeleteDocument = gql`
    mutation InvestmentDelete($id: ID!) {
  investmentDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type InvestmentDeleteMutationFn = Apollo.MutationFunction<Types.InvestmentDeleteMutation, Types.InvestmentDeleteMutationVariables>;

/**
 * __useInvestmentDeleteMutation__
 *
 * To run a mutation, you first call `useInvestmentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestmentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investmentDeleteMutation, { data, loading, error }] = useInvestmentDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvestmentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.InvestmentDeleteMutation, Types.InvestmentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.InvestmentDeleteMutation, Types.InvestmentDeleteMutationVariables>(InvestmentDeleteDocument, options);
      }
export type InvestmentDeleteMutationHookResult = ReturnType<typeof useInvestmentDeleteMutation>;
export type InvestmentDeleteMutationResult = Apollo.MutationResult<Types.InvestmentDeleteMutation>;
export type InvestmentDeleteMutationOptions = Apollo.BaseMutationOptions<Types.InvestmentDeleteMutation, Types.InvestmentDeleteMutationVariables>;
export const InvestmentUpdateDocument = gql`
    mutation InvestmentUpdate($id: ID!, $input: InvestmentUpdateInput!) {
  investmentUpdate(id: $id, input: $input) {
    investment {
      id
    }
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type InvestmentUpdateMutationFn = Apollo.MutationFunction<Types.InvestmentUpdateMutation, Types.InvestmentUpdateMutationVariables>;

/**
 * __useInvestmentUpdateMutation__
 *
 * To run a mutation, you first call `useInvestmentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestmentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investmentUpdateMutation, { data, loading, error }] = useInvestmentUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvestmentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.InvestmentUpdateMutation, Types.InvestmentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.InvestmentUpdateMutation, Types.InvestmentUpdateMutationVariables>(InvestmentUpdateDocument, options);
      }
export type InvestmentUpdateMutationHookResult = ReturnType<typeof useInvestmentUpdateMutation>;
export type InvestmentUpdateMutationResult = Apollo.MutationResult<Types.InvestmentUpdateMutation>;
export type InvestmentUpdateMutationOptions = Apollo.BaseMutationOptions<Types.InvestmentUpdateMutation, Types.InvestmentUpdateMutationVariables>;
export const ItemDeleteDocument = gql`
    mutation ItemDelete($id: ID!) {
  itemDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ItemDeleteMutationFn = Apollo.MutationFunction<Types.ItemDeleteMutation, Types.ItemDeleteMutationVariables>;

/**
 * __useItemDeleteMutation__
 *
 * To run a mutation, you first call `useItemDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useItemDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [itemDeleteMutation, { data, loading, error }] = useItemDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useItemDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.ItemDeleteMutation, Types.ItemDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ItemDeleteMutation, Types.ItemDeleteMutationVariables>(ItemDeleteDocument, options);
      }
export type ItemDeleteMutationHookResult = ReturnType<typeof useItemDeleteMutation>;
export type ItemDeleteMutationResult = Apollo.MutationResult<Types.ItemDeleteMutation>;
export type ItemDeleteMutationOptions = Apollo.BaseMutationOptions<Types.ItemDeleteMutation, Types.ItemDeleteMutationVariables>;
export const ItemUpdateDocument = gql`
    mutation ItemUpdate($id: ID!, $input: ItemInput!) {
  itemUpdate(id: $id, input: $input) {
    item {
      ...Item
    }
    errors {
      ...Error
    }
  }
}
    ${ItemFragmentDoc}
${ErrorFragmentDoc}`;
export type ItemUpdateMutationFn = Apollo.MutationFunction<Types.ItemUpdateMutation, Types.ItemUpdateMutationVariables>;

/**
 * __useItemUpdateMutation__
 *
 * To run a mutation, you first call `useItemUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useItemUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [itemUpdateMutation, { data, loading, error }] = useItemUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useItemUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.ItemUpdateMutation, Types.ItemUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ItemUpdateMutation, Types.ItemUpdateMutationVariables>(ItemUpdateDocument, options);
      }
export type ItemUpdateMutationHookResult = ReturnType<typeof useItemUpdateMutation>;
export type ItemUpdateMutationResult = Apollo.MutationResult<Types.ItemUpdateMutation>;
export type ItemUpdateMutationOptions = Apollo.BaseMutationOptions<Types.ItemUpdateMutation, Types.ItemUpdateMutationVariables>;
export const ItemCreateDocument = gql`
    mutation ItemCreate($investmentId: ID!, $input: ItemInput!) {
  itemCreate(investmentId: $investmentId, input: $input) {
    item {
      ...Item
    }
    errors {
      ...Error
    }
  }
}
    ${ItemFragmentDoc}
${ErrorFragmentDoc}`;
export type ItemCreateMutationFn = Apollo.MutationFunction<Types.ItemCreateMutation, Types.ItemCreateMutationVariables>;

/**
 * __useItemCreateMutation__
 *
 * To run a mutation, you first call `useItemCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useItemCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [itemCreateMutation, { data, loading, error }] = useItemCreateMutation({
 *   variables: {
 *      investmentId: // value for 'investmentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useItemCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.ItemCreateMutation, Types.ItemCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ItemCreateMutation, Types.ItemCreateMutationVariables>(ItemCreateDocument, options);
      }
export type ItemCreateMutationHookResult = ReturnType<typeof useItemCreateMutation>;
export type ItemCreateMutationResult = Apollo.MutationResult<Types.ItemCreateMutation>;
export type ItemCreateMutationOptions = Apollo.BaseMutationOptions<Types.ItemCreateMutation, Types.ItemCreateMutationVariables>;
export const InvestmentCreateDocument = gql`
    mutation InvestmentCreate($input: InvestmentInput!) {
  investmentCreate(input: $input) {
    investment {
      ...Investment
    }
    errors {
      ...Error
    }
  }
}
    ${InvestmentFragmentDoc}
${ErrorFragmentDoc}`;
export type InvestmentCreateMutationFn = Apollo.MutationFunction<Types.InvestmentCreateMutation, Types.InvestmentCreateMutationVariables>;

/**
 * __useInvestmentCreateMutation__
 *
 * To run a mutation, you first call `useInvestmentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInvestmentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [investmentCreateMutation, { data, loading, error }] = useInvestmentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInvestmentCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.InvestmentCreateMutation, Types.InvestmentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.InvestmentCreateMutation, Types.InvestmentCreateMutationVariables>(InvestmentCreateDocument, options);
      }
export type InvestmentCreateMutationHookResult = ReturnType<typeof useInvestmentCreateMutation>;
export type InvestmentCreateMutationResult = Apollo.MutationResult<Types.InvestmentCreateMutation>;
export type InvestmentCreateMutationOptions = Apollo.BaseMutationOptions<Types.InvestmentCreateMutation, Types.InvestmentCreateMutationVariables>;
export const InvestmentsDocument = gql`
    query Investments($first: Int, $last: Int, $after: String, $before: String, $filter: InvestmentFilterInput) {
  investments(
    first: $first
    last: $last
    after: $after
    before: $before
    filter: $filter
  ) {
    edges {
      node {
        ...Investment
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${InvestmentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useInvestmentsQuery__
 *
 * To run a query within a React component, call `useInvestmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestmentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useInvestmentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.InvestmentsQuery, Types.InvestmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InvestmentsQuery, Types.InvestmentsQueryVariables>(InvestmentsDocument, options);
      }
export function useInvestmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InvestmentsQuery, Types.InvestmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InvestmentsQuery, Types.InvestmentsQueryVariables>(InvestmentsDocument, options);
        }
export type InvestmentsQueryHookResult = ReturnType<typeof useInvestmentsQuery>;
export type InvestmentsLazyQueryHookResult = ReturnType<typeof useInvestmentsLazyQuery>;
export type InvestmentsQueryResult = Apollo.QueryResult<Types.InvestmentsQuery, Types.InvestmentsQueryVariables>;
export const InvestmentDetailsDocument = gql`
    query InvestmentDetails($id: ID!) {
  investment(id: $id) {
    ...InvestmentDetails
  }
}
    ${InvestmentDetailsFragmentDoc}`;

/**
 * __useInvestmentDetailsQuery__
 *
 * To run a query within a React component, call `useInvestmentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvestmentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvestmentDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInvestmentDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.InvestmentDetailsQuery, Types.InvestmentDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InvestmentDetailsQuery, Types.InvestmentDetailsQueryVariables>(InvestmentDetailsDocument, options);
      }
export function useInvestmentDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InvestmentDetailsQuery, Types.InvestmentDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InvestmentDetailsQuery, Types.InvestmentDetailsQueryVariables>(InvestmentDetailsDocument, options);
        }
export type InvestmentDetailsQueryHookResult = ReturnType<typeof useInvestmentDetailsQuery>;
export type InvestmentDetailsLazyQueryHookResult = ReturnType<typeof useInvestmentDetailsLazyQuery>;
export type InvestmentDetailsQueryResult = Apollo.QueryResult<Types.InvestmentDetailsQuery, Types.InvestmentDetailsQueryVariables>;
export const SessionCreateDocument = gql`
    mutation SessionCreate($input: SessionInput!) {
  sessionCreate(input: $input) {
    session {
      ...SessionDetails
    }
    errors {
      ...Error
    }
  }
}
    ${SessionDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type SessionCreateMutationFn = Apollo.MutationFunction<Types.SessionCreateMutation, Types.SessionCreateMutationVariables>;

/**
 * __useSessionCreateMutation__
 *
 * To run a mutation, you first call `useSessionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSessionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sessionCreateMutation, { data, loading, error }] = useSessionCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSessionCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.SessionCreateMutation, Types.SessionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SessionCreateMutation, Types.SessionCreateMutationVariables>(SessionCreateDocument, options);
      }
export type SessionCreateMutationHookResult = ReturnType<typeof useSessionCreateMutation>;
export type SessionCreateMutationResult = Apollo.MutationResult<Types.SessionCreateMutation>;
export type SessionCreateMutationOptions = Apollo.BaseMutationOptions<Types.SessionCreateMutation, Types.SessionCreateMutationVariables>;
export const SessionUpdateDocument = gql`
    mutation SessionUpdate($id: ID, $input: SessionInput!) {
  sessionUpdate(id: $id, input: $input) {
    session {
      ...SessionDetails
    }
    errors {
      ...Error
    }
  }
}
    ${SessionDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type SessionUpdateMutationFn = Apollo.MutationFunction<Types.SessionUpdateMutation, Types.SessionUpdateMutationVariables>;

/**
 * __useSessionUpdateMutation__
 *
 * To run a mutation, you first call `useSessionUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSessionUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sessionUpdateMutation, { data, loading, error }] = useSessionUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSessionUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.SessionUpdateMutation, Types.SessionUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SessionUpdateMutation, Types.SessionUpdateMutationVariables>(SessionUpdateDocument, options);
      }
export type SessionUpdateMutationHookResult = ReturnType<typeof useSessionUpdateMutation>;
export type SessionUpdateMutationResult = Apollo.MutationResult<Types.SessionUpdateMutation>;
export type SessionUpdateMutationOptions = Apollo.BaseMutationOptions<Types.SessionUpdateMutation, Types.SessionUpdateMutationVariables>;
export const SessionDeleteDocument = gql`
    mutation SessionDelete($id: ID!) {
  sessionDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type SessionDeleteMutationFn = Apollo.MutationFunction<Types.SessionDeleteMutation, Types.SessionDeleteMutationVariables>;

/**
 * __useSessionDeleteMutation__
 *
 * To run a mutation, you first call `useSessionDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSessionDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sessionDeleteMutation, { data, loading, error }] = useSessionDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSessionDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.SessionDeleteMutation, Types.SessionDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SessionDeleteMutation, Types.SessionDeleteMutationVariables>(SessionDeleteDocument, options);
      }
export type SessionDeleteMutationHookResult = ReturnType<typeof useSessionDeleteMutation>;
export type SessionDeleteMutationResult = Apollo.MutationResult<Types.SessionDeleteMutation>;
export type SessionDeleteMutationOptions = Apollo.BaseMutationOptions<Types.SessionDeleteMutation, Types.SessionDeleteMutationVariables>;
export const SessionBulkDeleteDocument = gql`
    mutation SessionBulkDelete($ids: [ID!]!) {
  sessionBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type SessionBulkDeleteMutationFn = Apollo.MutationFunction<Types.SessionBulkDeleteMutation, Types.SessionBulkDeleteMutationVariables>;

/**
 * __useSessionBulkDeleteMutation__
 *
 * To run a mutation, you first call `useSessionBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSessionBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sessionBulkDeleteMutation, { data, loading, error }] = useSessionBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSessionBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.SessionBulkDeleteMutation, Types.SessionBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SessionBulkDeleteMutation, Types.SessionBulkDeleteMutationVariables>(SessionBulkDeleteDocument, options);
      }
export type SessionBulkDeleteMutationHookResult = ReturnType<typeof useSessionBulkDeleteMutation>;
export type SessionBulkDeleteMutationResult = Apollo.MutationResult<Types.SessionBulkDeleteMutation>;
export type SessionBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.SessionBulkDeleteMutation, Types.SessionBulkDeleteMutationVariables>;
export const SessionsDocument = gql`
    query Sessions($first: Int, $last: Int, $after: String, $before: String, $filter: SessionFilterInput) {
  sessions(
    first: $first
    last: $last
    after: $after
    before: $before
    filter: $filter
  ) {
    edges {
      node {
        ...Session
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${SessionFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSessionsQuery__
 *
 * To run a query within a React component, call `useSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSessionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.SessionsQuery, Types.SessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SessionsQuery, Types.SessionsQueryVariables>(SessionsDocument, options);
      }
export function useSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SessionsQuery, Types.SessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SessionsQuery, Types.SessionsQueryVariables>(SessionsDocument, options);
        }
export type SessionsQueryHookResult = ReturnType<typeof useSessionsQuery>;
export type SessionsLazyQueryHookResult = ReturnType<typeof useSessionsLazyQuery>;
export type SessionsQueryResult = Apollo.QueryResult<Types.SessionsQuery, Types.SessionsQueryVariables>;
export const SessionDetailsDocument = gql`
    query SessionDetails($id: ID!) {
  session(id: $id) {
    ...SessionDetails
  }
}
    ${SessionDetailsFragmentDoc}`;

/**
 * __useSessionDetailsQuery__
 *
 * To run a query within a React component, call `useSessionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSessionDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.SessionDetailsQuery, Types.SessionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SessionDetailsQuery, Types.SessionDetailsQueryVariables>(SessionDetailsDocument, options);
      }
export function useSessionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SessionDetailsQuery, Types.SessionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SessionDetailsQuery, Types.SessionDetailsQueryVariables>(SessionDetailsDocument, options);
        }
export type SessionDetailsQueryHookResult = ReturnType<typeof useSessionDetailsQuery>;
export type SessionDetailsLazyQueryHookResult = ReturnType<typeof useSessionDetailsLazyQuery>;
export type SessionDetailsQueryResult = Apollo.QueryResult<Types.SessionDetailsQuery, Types.SessionDetailsQueryVariables>;
export const SearchCategoriesDocument = gql`
    query SearchCategories($after: String, $first: Int!, $query: String!, $type: EntryTypeEnum) {
  search: categories(
    after: $after
    first: $first
    filter: {search: $query, type: $type}
  ) {
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
    ${PageInfoFragmentDoc}`;

/**
 * __useSearchCategoriesQuery__
 *
 * To run a query within a React component, call `useSearchCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCategoriesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSearchCategoriesQuery(baseOptions: Apollo.QueryHookOptions<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
      }
export function useSearchCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>(SearchCategoriesDocument, options);
        }
export type SearchCategoriesQueryHookResult = ReturnType<typeof useSearchCategoriesQuery>;
export type SearchCategoriesLazyQueryHookResult = ReturnType<typeof useSearchCategoriesLazyQuery>;
export type SearchCategoriesQueryResult = Apollo.QueryResult<Types.SearchCategoriesQuery, Types.SearchCategoriesQueryVariables>;