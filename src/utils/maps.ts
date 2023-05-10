import { Node, SlugNode } from "@portal/types";

import { ChoiceValue, SingleAutocompleteChoiceType } from "./data";

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

type ExtendedNode = Node & Record<"name", string>;

export function mapNodeToChoice<T extends ExtendedNode>(
  nodes: T[]
): Array<SingleAutocompleteChoiceType<string>>;
export function mapNodeToChoice<
  T extends ExtendedNode | Node,
  K extends ChoiceValue
>(nodes: T[], getterFn: (node: T) => K): Array<SingleAutocompleteChoiceType<K>>;

export function mapNodeToChoice<T extends ExtendedNode>(
  nodes: T[],
  getterFn?: (node: T) => any
) {
  if (!nodes) {
    return [];
  }

  return nodes.map((node) => ({
    label: node.name,
    value: getterFn ? getterFn(node) : node.id,
  }));
}

export function mapSlugNodeToChoice(
  nodes: Array<ExtendedNode & SlugNode>
): SingleAutocompleteChoiceType[] {
  return mapNodeToChoice(nodes, (node) => node.slug);
}
