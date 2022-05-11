import * as Types from "./types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
export type TokenAuthMutationFn = Apollo.MutationFunction<
  Types.TokenAuthMutation,
  Types.TokenAuthMutationVariables
>;

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
export function useTokenAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.TokenAuthMutation,
    Types.TokenAuthMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.TokenAuthMutation,
    Types.TokenAuthMutationVariables
  >(TokenAuthDocument, options);
}
export type TokenAuthMutationHookResult = ReturnType<
  typeof useTokenAuthMutation
>;
export type TokenAuthMutationResult =
  Apollo.MutationResult<Types.TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<
  Types.TokenAuthMutation,
  Types.TokenAuthMutationVariables
>;
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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.MeQuery,
    Types.MeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<
  Types.MeQuery,
  Types.MeQueryVariables
>;
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
  ${ErrorFragmentDoc}
`;
export type VehicleCreateMutationFn = Apollo.MutationFunction<
  Types.VehicleCreateMutation,
  Types.VehicleCreateMutationVariables
>;

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
export function useVehicleCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.VehicleCreateMutation,
    Types.VehicleCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.VehicleCreateMutation,
    Types.VehicleCreateMutationVariables
  >(VehicleCreateDocument, options);
}
export type VehicleCreateMutationHookResult = ReturnType<
  typeof useVehicleCreateMutation
>;
export type VehicleCreateMutationResult =
  Apollo.MutationResult<Types.VehicleCreateMutation>;
export type VehicleCreateMutationOptions = Apollo.BaseMutationOptions<
  Types.VehicleCreateMutation,
  Types.VehicleCreateMutationVariables
>;
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
  ${VehicleFragmentDoc}
`;

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
export function useVehiclesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.VehiclesQuery,
    Types.VehiclesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.VehiclesQuery, Types.VehiclesQueryVariables>(
    VehiclesDocument,
    options
  );
}
export function useVehiclesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.VehiclesQuery,
    Types.VehiclesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.VehiclesQuery, Types.VehiclesQueryVariables>(
    VehiclesDocument,
    options
  );
}
export type VehiclesQueryHookResult = ReturnType<typeof useVehiclesQuery>;
export type VehiclesLazyQueryHookResult = ReturnType<
  typeof useVehiclesLazyQuery
>;
export type VehiclesQueryResult = Apollo.QueryResult<
  Types.VehiclesQuery,
  Types.VehiclesQueryVariables
>;
