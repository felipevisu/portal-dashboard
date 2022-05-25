import {
  ApolloError,
  ApolloQueryResult,
  QueryHookOptions as BaseQueryHookOptions,
  QueryResult,
  useQuery as useBaseQuery,
} from "@apollo/client";
import { DocumentNode } from "graphql";
export interface LoadMore<TData, TVariables> {
  loadMore: (
    mergeFunc: (prev: TData, next: TData) => TData,
    extraVariables: Partial<TVariables>
  ) => Promise<ApolloQueryResult<TData>>;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];

export type UseQueryResult<TData, TVariables> = QueryResult<TData, TVariables> &
  LoadMore<TData, TVariables>;

export type QueryHookOptions<TData, TVariables> = Partial<
  Omit<BaseQueryHookOptions<TData, TVariables>, "variables"> & {
    displayLoader: boolean;
    handleError?: (error: ApolloError) => void | undefined;
    variables?: TVariables;
  }
>;

type UseQueryHook<TData, TVariables> = (
  opts?: QueryHookOptions<TData, TVariables>
) => UseQueryResult<TData, TVariables>;

export function useQuery<TData, TVariables>(
  query: DocumentNode,
  {
    skip,
    variables,
    fetchPolicy,
    handleError,
    ...opts
  }: QueryHookOptions<TData, TVariables> = {}
): UseQueryResult<TData, TVariables> {
  const queryData = useBaseQuery(query, {
    ...opts,
    context: {
      useBatching: true,
    },
    errorPolicy: "all",
    fetchPolicy: fetchPolicy ?? "cache-and-network",
    onError: (error) => {
      if (handleError) {
        handleError(error);
      } else {
        // handleQueryAuthError(error, notify, user.logout, intl);
      }
    },
    skip,
    variables: variables,
  });

  const loadMore = (
    mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
    extraVariables: RequireAtLeastOne<TVariables>
  ) =>
    queryData.fetchMore({
      query,
      updateQuery: (previousResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResults;
        }
        return mergeFunc(previousResults, fetchMoreResult);
      },
      variables: { ...variables, ...extraVariables },
    });

  return {
    ...queryData,
    loadMore,
  };
}

export function makeQuery<TData, TVariables>(
  query: DocumentNode
): UseQueryHook<TData, TVariables> {
  return (opts: QueryHookOptions<TData, TVariables>) =>
    useQuery<TData, TVariables>(query, opts);
}

export default makeQuery;
