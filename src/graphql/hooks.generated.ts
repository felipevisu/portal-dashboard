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
  vehicles {
    totalCount
  }
}
    `;
export const DocumentFragmentDoc = gql`
    fragment Document on Document {
  id
  name
  created
  expired
  isPublished
}
    `;
export const DocumentDetailsFragmentDoc = gql`
    fragment DocumentDetails on Document {
  id
  name
  description
  isPublished
  expires
  file
  fileUrl
  fileName
  publicationDate
  beginDate
  expirationDate
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
export const ProviderFragmentDoc = gql`
    fragment Provider on Provider {
  id
  name
  slug
  segment {
    id
    name
  }
  documents {
    totalCount
  }
  isPublished
}
    `;
export const ProviderDetailsFragmentDoc = gql`
    fragment ProviderDetails on Provider {
  id
  name
  slug
  documentNumber
  isPublished
  segment {
    id
    name
  }
}
    `;
export const SegmentFragmentDoc = gql`
    fragment Segment on Segment {
  id
  name
  slug
  providers {
    totalCount
  }
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
export const VehicleFragmentDoc = gql`
    fragment Vehicle on Vehicle {
  id
  name
  slug
  category {
    id
    name
  }
  isPublished
}
    `;
export const VehicleDetailsFragmentDoc = gql`
    fragment VehicleDetails on Vehicle {
  id
  name
  slug
  documentNumber
  category {
    id
    name
  }
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
    query Categories($first: Int, $last: Int, $after: String, $before: String, $search: String) {
  categories(
    first: $first
    last: $last
    after: $after
    before: $before
    search: $search
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
 *      search: // value for 'search'
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
    query Investments($first: Int, $last: Int, $after: String, $before: String, $isPublished: Boolean) {
  investments(
    first: $first
    last: $last
    after: $after
    before: $before
    isPublished: $isPublished
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
 *      isPublished: // value for 'isPublished'
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
export const ProviderCreateDocument = gql`
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
    ${ProviderDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type ProviderCreateMutationFn = Apollo.MutationFunction<Types.ProviderCreateMutation, Types.ProviderCreateMutationVariables>;

/**
 * __useProviderCreateMutation__
 *
 * To run a mutation, you first call `useProviderCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProviderCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [providerCreateMutation, { data, loading, error }] = useProviderCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProviderCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.ProviderCreateMutation, Types.ProviderCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ProviderCreateMutation, Types.ProviderCreateMutationVariables>(ProviderCreateDocument, options);
      }
export type ProviderCreateMutationHookResult = ReturnType<typeof useProviderCreateMutation>;
export type ProviderCreateMutationResult = Apollo.MutationResult<Types.ProviderCreateMutation>;
export type ProviderCreateMutationOptions = Apollo.BaseMutationOptions<Types.ProviderCreateMutation, Types.ProviderCreateMutationVariables>;
export const ProviderUpdateDocument = gql`
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
    ${ProviderDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type ProviderUpdateMutationFn = Apollo.MutationFunction<Types.ProviderUpdateMutation, Types.ProviderUpdateMutationVariables>;

/**
 * __useProviderUpdateMutation__
 *
 * To run a mutation, you first call `useProviderUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProviderUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [providerUpdateMutation, { data, loading, error }] = useProviderUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProviderUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.ProviderUpdateMutation, Types.ProviderUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ProviderUpdateMutation, Types.ProviderUpdateMutationVariables>(ProviderUpdateDocument, options);
      }
export type ProviderUpdateMutationHookResult = ReturnType<typeof useProviderUpdateMutation>;
export type ProviderUpdateMutationResult = Apollo.MutationResult<Types.ProviderUpdateMutation>;
export type ProviderUpdateMutationOptions = Apollo.BaseMutationOptions<Types.ProviderUpdateMutation, Types.ProviderUpdateMutationVariables>;
export const ProviderDeleteDocument = gql`
    mutation ProviderDelete($id: ID!) {
  providerDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ProviderDeleteMutationFn = Apollo.MutationFunction<Types.ProviderDeleteMutation, Types.ProviderDeleteMutationVariables>;

/**
 * __useProviderDeleteMutation__
 *
 * To run a mutation, you first call `useProviderDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProviderDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [providerDeleteMutation, { data, loading, error }] = useProviderDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProviderDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.ProviderDeleteMutation, Types.ProviderDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ProviderDeleteMutation, Types.ProviderDeleteMutationVariables>(ProviderDeleteDocument, options);
      }
export type ProviderDeleteMutationHookResult = ReturnType<typeof useProviderDeleteMutation>;
export type ProviderDeleteMutationResult = Apollo.MutationResult<Types.ProviderDeleteMutation>;
export type ProviderDeleteMutationOptions = Apollo.BaseMutationOptions<Types.ProviderDeleteMutation, Types.ProviderDeleteMutationVariables>;
export const ProviderBulkDeleteDocument = gql`
    mutation ProviderBulkDelete($ids: [ID!]!) {
  providerBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type ProviderBulkDeleteMutationFn = Apollo.MutationFunction<Types.ProviderBulkDeleteMutation, Types.ProviderBulkDeleteMutationVariables>;

/**
 * __useProviderBulkDeleteMutation__
 *
 * To run a mutation, you first call `useProviderBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProviderBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [providerBulkDeleteMutation, { data, loading, error }] = useProviderBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useProviderBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.ProviderBulkDeleteMutation, Types.ProviderBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ProviderBulkDeleteMutation, Types.ProviderBulkDeleteMutationVariables>(ProviderBulkDeleteDocument, options);
      }
export type ProviderBulkDeleteMutationHookResult = ReturnType<typeof useProviderBulkDeleteMutation>;
export type ProviderBulkDeleteMutationResult = Apollo.MutationResult<Types.ProviderBulkDeleteMutation>;
export type ProviderBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.ProviderBulkDeleteMutation, Types.ProviderBulkDeleteMutationVariables>;
export const ProvidersDocument = gql`
    query Providers($first: Int, $last: Int, $after: String, $before: String, $search: String, $isPublished: Boolean, $segment: ID) {
  providers(
    first: $first
    last: $last
    after: $after
    before: $before
    search: $search
    segment: $segment
    isPublished: $isPublished
  ) {
    edges {
      node {
        ...Provider
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${ProviderFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useProvidersQuery__
 *
 * To run a query within a React component, call `useProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProvidersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      search: // value for 'search'
 *      isPublished: // value for 'isPublished'
 *      segment: // value for 'segment'
 *   },
 * });
 */
export function useProvidersQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProvidersQuery, Types.ProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProvidersQuery, Types.ProvidersQueryVariables>(ProvidersDocument, options);
      }
export function useProvidersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProvidersQuery, Types.ProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProvidersQuery, Types.ProvidersQueryVariables>(ProvidersDocument, options);
        }
export type ProvidersQueryHookResult = ReturnType<typeof useProvidersQuery>;
export type ProvidersLazyQueryHookResult = ReturnType<typeof useProvidersLazyQuery>;
export type ProvidersQueryResult = Apollo.QueryResult<Types.ProvidersQuery, Types.ProvidersQueryVariables>;
export const ProviderDetailsDocument = gql`
    query ProviderDetails($id: ID!, $first: Int = 10, $after: String) {
  provider(id: $id) {
    ...ProviderDetails
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
    ${ProviderDetailsFragmentDoc}
${DocumentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useProviderDetailsQuery__
 *
 * To run a query within a React component, call `useProviderDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useProviderDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.ProviderDetailsQuery, Types.ProviderDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProviderDetailsQuery, Types.ProviderDetailsQueryVariables>(ProviderDetailsDocument, options);
      }
export function useProviderDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProviderDetailsQuery, Types.ProviderDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProviderDetailsQuery, Types.ProviderDetailsQueryVariables>(ProviderDetailsDocument, options);
        }
export type ProviderDetailsQueryHookResult = ReturnType<typeof useProviderDetailsQuery>;
export type ProviderDetailsLazyQueryHookResult = ReturnType<typeof useProviderDetailsLazyQuery>;
export type ProviderDetailsQueryResult = Apollo.QueryResult<Types.ProviderDetailsQuery, Types.ProviderDetailsQueryVariables>;
export const SegmentCreateDocument = gql`
    mutation SegmentCreate($input: SegmentInput!) {
  segmentCreate(input: $input) {
    segment {
      ...Segment
    }
    errors {
      ...Error
    }
  }
}
    ${SegmentFragmentDoc}
${ErrorFragmentDoc}`;
export type SegmentCreateMutationFn = Apollo.MutationFunction<Types.SegmentCreateMutation, Types.SegmentCreateMutationVariables>;

/**
 * __useSegmentCreateMutation__
 *
 * To run a mutation, you first call `useSegmentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSegmentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [segmentCreateMutation, { data, loading, error }] = useSegmentCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSegmentCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.SegmentCreateMutation, Types.SegmentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SegmentCreateMutation, Types.SegmentCreateMutationVariables>(SegmentCreateDocument, options);
      }
export type SegmentCreateMutationHookResult = ReturnType<typeof useSegmentCreateMutation>;
export type SegmentCreateMutationResult = Apollo.MutationResult<Types.SegmentCreateMutation>;
export type SegmentCreateMutationOptions = Apollo.BaseMutationOptions<Types.SegmentCreateMutation, Types.SegmentCreateMutationVariables>;
export const SegmentUpdateDocument = gql`
    mutation SegmentUpdate($id: ID, $input: SegmentInput!) {
  segmentUpdate(id: $id, input: $input) {
    segment {
      ...Segment
    }
    errors {
      ...Error
    }
  }
}
    ${SegmentFragmentDoc}
${ErrorFragmentDoc}`;
export type SegmentUpdateMutationFn = Apollo.MutationFunction<Types.SegmentUpdateMutation, Types.SegmentUpdateMutationVariables>;

/**
 * __useSegmentUpdateMutation__
 *
 * To run a mutation, you first call `useSegmentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSegmentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [segmentUpdateMutation, { data, loading, error }] = useSegmentUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSegmentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.SegmentUpdateMutation, Types.SegmentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SegmentUpdateMutation, Types.SegmentUpdateMutationVariables>(SegmentUpdateDocument, options);
      }
export type SegmentUpdateMutationHookResult = ReturnType<typeof useSegmentUpdateMutation>;
export type SegmentUpdateMutationResult = Apollo.MutationResult<Types.SegmentUpdateMutation>;
export type SegmentUpdateMutationOptions = Apollo.BaseMutationOptions<Types.SegmentUpdateMutation, Types.SegmentUpdateMutationVariables>;
export const SegmentDeleteDocument = gql`
    mutation SegmentDelete($id: ID!) {
  segmentDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type SegmentDeleteMutationFn = Apollo.MutationFunction<Types.SegmentDeleteMutation, Types.SegmentDeleteMutationVariables>;

/**
 * __useSegmentDeleteMutation__
 *
 * To run a mutation, you first call `useSegmentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSegmentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [segmentDeleteMutation, { data, loading, error }] = useSegmentDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSegmentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.SegmentDeleteMutation, Types.SegmentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SegmentDeleteMutation, Types.SegmentDeleteMutationVariables>(SegmentDeleteDocument, options);
      }
export type SegmentDeleteMutationHookResult = ReturnType<typeof useSegmentDeleteMutation>;
export type SegmentDeleteMutationResult = Apollo.MutationResult<Types.SegmentDeleteMutation>;
export type SegmentDeleteMutationOptions = Apollo.BaseMutationOptions<Types.SegmentDeleteMutation, Types.SegmentDeleteMutationVariables>;
export const SegmentBulkDeleteDocument = gql`
    mutation SegmentBulkDelete($ids: [ID!]!) {
  segmentBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type SegmentBulkDeleteMutationFn = Apollo.MutationFunction<Types.SegmentBulkDeleteMutation, Types.SegmentBulkDeleteMutationVariables>;

/**
 * __useSegmentBulkDeleteMutation__
 *
 * To run a mutation, you first call `useSegmentBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSegmentBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [segmentBulkDeleteMutation, { data, loading, error }] = useSegmentBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSegmentBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.SegmentBulkDeleteMutation, Types.SegmentBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SegmentBulkDeleteMutation, Types.SegmentBulkDeleteMutationVariables>(SegmentBulkDeleteDocument, options);
      }
export type SegmentBulkDeleteMutationHookResult = ReturnType<typeof useSegmentBulkDeleteMutation>;
export type SegmentBulkDeleteMutationResult = Apollo.MutationResult<Types.SegmentBulkDeleteMutation>;
export type SegmentBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.SegmentBulkDeleteMutation, Types.SegmentBulkDeleteMutationVariables>;
export const SegmentsDocument = gql`
    query Segments($first: Int, $last: Int, $after: String, $before: String, $search: String) {
  segments(
    first: $first
    last: $last
    after: $after
    before: $before
    search: $search
  ) {
    edges {
      node {
        ...Segment
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${SegmentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useSegmentsQuery__
 *
 * To run a query within a React component, call `useSegmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSegmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSegmentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSegmentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.SegmentsQuery, Types.SegmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SegmentsQuery, Types.SegmentsQueryVariables>(SegmentsDocument, options);
      }
export function useSegmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SegmentsQuery, Types.SegmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SegmentsQuery, Types.SegmentsQueryVariables>(SegmentsDocument, options);
        }
export type SegmentsQueryHookResult = ReturnType<typeof useSegmentsQuery>;
export type SegmentsLazyQueryHookResult = ReturnType<typeof useSegmentsLazyQuery>;
export type SegmentsQueryResult = Apollo.QueryResult<Types.SegmentsQuery, Types.SegmentsQueryVariables>;
export const SegmentDetailsDocument = gql`
    query SegmentDetails($id: ID!) {
  segment(id: $id) {
    ...Segment
  }
}
    ${SegmentFragmentDoc}`;

/**
 * __useSegmentDetailsQuery__
 *
 * To run a query within a React component, call `useSegmentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSegmentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSegmentDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSegmentDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.SegmentDetailsQuery, Types.SegmentDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SegmentDetailsQuery, Types.SegmentDetailsQueryVariables>(SegmentDetailsDocument, options);
      }
export function useSegmentDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SegmentDetailsQuery, Types.SegmentDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SegmentDetailsQuery, Types.SegmentDetailsQueryVariables>(SegmentDetailsDocument, options);
        }
export type SegmentDetailsQueryHookResult = ReturnType<typeof useSegmentDetailsQuery>;
export type SegmentDetailsLazyQueryHookResult = ReturnType<typeof useSegmentDetailsLazyQuery>;
export type SegmentDetailsQueryResult = Apollo.QueryResult<Types.SegmentDetailsQuery, Types.SegmentDetailsQueryVariables>;
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
    query Sessions($first: Int, $last: Int, $after: String, $before: String, $search: String, $isPublished: Boolean) {
  sessions(
    first: $first
    last: $last
    after: $after
    before: $before
    search: $search
    isPublished: $isPublished
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
 *      search: // value for 'search'
 *      isPublished: // value for 'isPublished'
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
export const VehicleCreateDocument = gql`
    mutation VehicleCreate($input: VehicleInput!) {
  vehicleCreate(input: $input) {
    vehicle {
      ...VehicleDetails
    }
    errors {
      ...Error
    }
  }
}
    ${VehicleDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type VehicleCreateMutationFn = Apollo.MutationFunction<Types.VehicleCreateMutation, Types.VehicleCreateMutationVariables>;

/**
 * __useVehicleCreateMutation__
 *
 * To run a mutation, you first call `useVehicleCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleCreateMutation, { data, loading, error }] = useVehicleCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVehicleCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.VehicleCreateMutation, Types.VehicleCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.VehicleCreateMutation, Types.VehicleCreateMutationVariables>(VehicleCreateDocument, options);
      }
export type VehicleCreateMutationHookResult = ReturnType<typeof useVehicleCreateMutation>;
export type VehicleCreateMutationResult = Apollo.MutationResult<Types.VehicleCreateMutation>;
export type VehicleCreateMutationOptions = Apollo.BaseMutationOptions<Types.VehicleCreateMutation, Types.VehicleCreateMutationVariables>;
export const VehicleUpdateDocument = gql`
    mutation VehicleUpdate($id: ID, $input: VehicleInput!) {
  vehicleUpdate(id: $id, input: $input) {
    vehicle {
      ...VehicleDetails
    }
    errors {
      ...Error
    }
  }
}
    ${VehicleDetailsFragmentDoc}
${ErrorFragmentDoc}`;
export type VehicleUpdateMutationFn = Apollo.MutationFunction<Types.VehicleUpdateMutation, Types.VehicleUpdateMutationVariables>;

/**
 * __useVehicleUpdateMutation__
 *
 * To run a mutation, you first call `useVehicleUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleUpdateMutation, { data, loading, error }] = useVehicleUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVehicleUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.VehicleUpdateMutation, Types.VehicleUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.VehicleUpdateMutation, Types.VehicleUpdateMutationVariables>(VehicleUpdateDocument, options);
      }
export type VehicleUpdateMutationHookResult = ReturnType<typeof useVehicleUpdateMutation>;
export type VehicleUpdateMutationResult = Apollo.MutationResult<Types.VehicleUpdateMutation>;
export type VehicleUpdateMutationOptions = Apollo.BaseMutationOptions<Types.VehicleUpdateMutation, Types.VehicleUpdateMutationVariables>;
export const VehicleDeleteDocument = gql`
    mutation VehicleDelete($id: ID!) {
  vehicleDelete(id: $id) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type VehicleDeleteMutationFn = Apollo.MutationFunction<Types.VehicleDeleteMutation, Types.VehicleDeleteMutationVariables>;

/**
 * __useVehicleDeleteMutation__
 *
 * To run a mutation, you first call `useVehicleDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleDeleteMutation, { data, loading, error }] = useVehicleDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVehicleDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.VehicleDeleteMutation, Types.VehicleDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.VehicleDeleteMutation, Types.VehicleDeleteMutationVariables>(VehicleDeleteDocument, options);
      }
export type VehicleDeleteMutationHookResult = ReturnType<typeof useVehicleDeleteMutation>;
export type VehicleDeleteMutationResult = Apollo.MutationResult<Types.VehicleDeleteMutation>;
export type VehicleDeleteMutationOptions = Apollo.BaseMutationOptions<Types.VehicleDeleteMutation, Types.VehicleDeleteMutationVariables>;
export const VehicleBulkDeleteDocument = gql`
    mutation VehicleBulkDelete($ids: [ID!]!) {
  vehicleBulkDelete(ids: $ids) {
    errors {
      ...Error
    }
  }
}
    ${ErrorFragmentDoc}`;
export type VehicleBulkDeleteMutationFn = Apollo.MutationFunction<Types.VehicleBulkDeleteMutation, Types.VehicleBulkDeleteMutationVariables>;

/**
 * __useVehicleBulkDeleteMutation__
 *
 * To run a mutation, you first call `useVehicleBulkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVehicleBulkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vehicleBulkDeleteMutation, { data, loading, error }] = useVehicleBulkDeleteMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useVehicleBulkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<Types.VehicleBulkDeleteMutation, Types.VehicleBulkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.VehicleBulkDeleteMutation, Types.VehicleBulkDeleteMutationVariables>(VehicleBulkDeleteDocument, options);
      }
export type VehicleBulkDeleteMutationHookResult = ReturnType<typeof useVehicleBulkDeleteMutation>;
export type VehicleBulkDeleteMutationResult = Apollo.MutationResult<Types.VehicleBulkDeleteMutation>;
export type VehicleBulkDeleteMutationOptions = Apollo.BaseMutationOptions<Types.VehicleBulkDeleteMutation, Types.VehicleBulkDeleteMutationVariables>;
export const VehiclesDocument = gql`
    query Vehicles($first: Int, $last: Int, $after: String, $before: String, $search: String, $isPublished: Boolean, $category: ID) {
  vehicles(
    first: $first
    last: $last
    after: $after
    before: $before
    search: $search
    category: $category
    isPublished: $isPublished
  ) {
    edges {
      node {
        ...Vehicle
      }
    }
    pageInfo {
      ...PageInfo
    }
  }
}
    ${VehicleFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useVehiclesQuery__
 *
 * To run a query within a React component, call `useVehiclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehiclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehiclesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      search: // value for 'search'
 *      isPublished: // value for 'isPublished'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<Types.VehiclesQuery, Types.VehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VehiclesQuery, Types.VehiclesQueryVariables>(VehiclesDocument, options);
      }
export function useVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VehiclesQuery, Types.VehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VehiclesQuery, Types.VehiclesQueryVariables>(VehiclesDocument, options);
        }
export type VehiclesQueryHookResult = ReturnType<typeof useVehiclesQuery>;
export type VehiclesLazyQueryHookResult = ReturnType<typeof useVehiclesLazyQuery>;
export type VehiclesQueryResult = Apollo.QueryResult<Types.VehiclesQuery, Types.VehiclesQueryVariables>;
export const VehicleDetailsDocument = gql`
    query VehicleDetails($id: ID!, $first: Int = 10, $after: String) {
  vehicle(id: $id) {
    ...VehicleDetails
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
    ${VehicleDetailsFragmentDoc}
${DocumentFragmentDoc}
${PageInfoFragmentDoc}`;

/**
 * __useVehicleDetailsQuery__
 *
 * To run a query within a React component, call `useVehicleDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVehicleDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useVehicleDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.VehicleDetailsQuery, Types.VehicleDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VehicleDetailsQuery, Types.VehicleDetailsQueryVariables>(VehicleDetailsDocument, options);
      }
export function useVehicleDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VehicleDetailsQuery, Types.VehicleDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VehicleDetailsQuery, Types.VehicleDetailsQueryVariables>(VehicleDetailsDocument, options);
        }
export type VehicleDetailsQueryHookResult = ReturnType<typeof useVehicleDetailsQuery>;
export type VehicleDetailsLazyQueryHookResult = ReturnType<typeof useVehicleDetailsLazyQuery>;
export type VehicleDetailsQueryResult = Apollo.QueryResult<Types.VehicleDetailsQuery, Types.VehicleDetailsQueryVariables>;
export const SearchCategoriesDocument = gql`
    query SearchCategories($after: String, $first: Int!, $query: String!) {
  search: categories(after: $after, first: $first, search: $query) {
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
export const SearchSegmentsDocument = gql`
    query SearchSegments($after: String, $first: Int!, $query: String!) {
  search: segments(after: $after, first: $first, search: $query) {
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
 * __useSearchSegmentsQuery__
 *
 * To run a query within a React component, call `useSearchSegmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSegmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSegmentsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchSegmentsQuery(baseOptions: Apollo.QueryHookOptions<Types.SearchSegmentsQuery, Types.SearchSegmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SearchSegmentsQuery, Types.SearchSegmentsQueryVariables>(SearchSegmentsDocument, options);
      }
export function useSearchSegmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SearchSegmentsQuery, Types.SearchSegmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SearchSegmentsQuery, Types.SearchSegmentsQueryVariables>(SearchSegmentsDocument, options);
        }
export type SearchSegmentsQueryHookResult = ReturnType<typeof useSearchSegmentsQuery>;
export type SearchSegmentsLazyQueryHookResult = ReturnType<typeof useSearchSegmentsLazyQuery>;
export type SearchSegmentsQueryResult = Apollo.QueryResult<Types.SearchSegmentsQuery, Types.SearchSegmentsQueryVariables>;