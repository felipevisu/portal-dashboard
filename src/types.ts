import { PageInfoFragment } from "./graphql";
import { SingleAutocompleteChoiceType } from "./utils/data";

export type RelayToFlat<T extends { edges: Array<{ node: any }> }> = Array<
  T["edges"][0]["node"]
>;

export interface ChangeEvent<TData = any> {
  target: {
    name: string;
    value: TData;
  };
}

export interface Node {
  id: string;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export interface SearchProps {
  onSearchChange: (e: React.ChangeEvent<any>) => void;
}
export interface SearchPageProps extends SearchProps {
  initialSearch: string;
}

export interface ListActionsWithoutToolbar {
  toggle: (id: string) => void;
  toggleAll: (items: React.ReactNodeArray, selected: number) => void;
  isChecked: (id: string) => boolean;
  selected: number;
}

export interface ListActions extends ListActionsWithoutToolbar {
  toolbar: React.ReactNode | React.ReactNodeArray;
}

export interface PaginateListProps {
  pageInfo?: PageInfoFragment;
  onNextPage: (value: string) => void;
  onPreviousPage: () => void;
}

export type BulkAction = Partial<{
  ids: string[];
}>;

export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
}>;

export type SingleAction = Partial<{
  id: string;
}>;

export interface FilterOpts {
  name: string;
  slug: string;
  choices: SingleAutocompleteChoiceType[];
  type: "radio" | "multiple" | "date" | "daterange";
}

export type Paginator = {
  handleNextPage: (value: string) => void;
  handlePreviousPage: () => void;
  after: string;
  first: number;
};
