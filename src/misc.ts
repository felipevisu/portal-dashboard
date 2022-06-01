export function renderCollection<T>(
  collection: T[],
  renderItem: (
    item: T | undefined,
    index: number | undefined,
    collection: T[]
  ) => any,
  renderEmpty?: (collection: T[]) => any
) {
  if (collection === undefined) {
    return null;
  }
  if (collection.length === 0) {
    return renderEmpty ? renderEmpty(collection) : null;
  }
  return collection.map(renderItem);
}
