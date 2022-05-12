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
}
    `;
export const ErrorFragmentDoc = gql`
    fragment Error on Error {
  code
  field
  message
}
    `;
export const VehicleFragmentDoc = gql`
    fragment Vehicle on Vehicle {
  id
  name
  slug
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
export const CategoriesDocument = gql`
    query Categories {
  categories {
    edges {
      node {
        ...Category
      }
    }
  }
}
    ${CategoryFragmentDoc}`;

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
export const VehiclesDocument = gql`
    query Vehicles {
  vehicles {
    edges {
      node {
        ...Vehicle
      }
    }
  }
}
    ${VehicleFragmentDoc}`;

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