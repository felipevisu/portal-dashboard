import { ItemFragment, ItemInput } from "@portal/graphql";

export function itemFragmentToFormData(data: ItemFragment | null): ItemInput {
  return {
    name: data?.name ?? "",
    value: data?.value ?? "",
  };
}
