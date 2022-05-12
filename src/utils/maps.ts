interface Edge<T> {
  node: T;
}
interface Connection<T> {
  edges: Array<Edge<T>> | undefined;
}

export function mapEdgesToItems<T>(
  data: Connection<T> | undefined
): T[] | undefined {
  return data?.edges?.map(({ node }) => node);
}
