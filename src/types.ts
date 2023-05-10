import { MultiAutocompleteChoiceType } from "./components/Attributes/utils";
import { IFilter } from "./components/Filter/types";
import { PageInfoFragment } from "./graphql";
import { PaginationState } from "./hooks/usePaginator";
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
  onSearchChange: (value: string) => void;
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
  onPreviousPage: (value: string) => void;
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

export interface FilterOpts<T> {
  active: boolean;
  value: T;
}

export interface AutocompleteFilterOpts
  extends Partial<FetchMoreProps>,
    Partial<SearchPageProps> {
  choices: MultiAutocompleteChoiceType[];
  displayValues: MultiAutocompleteChoiceType[];
}

export type Paginator = {
  handleNextPage: (value: string) => void;
  handlePreviousPage: (value: string) => void;
  pagination: PaginationState;
};


export interface FetchMoreProps {
  loading: boolean;
  hasMore: boolean;
  totalCount?: number;
  onFetchMore: () => void;
}

export interface KeyValue {
  key: string;
  value?: string;
}

export interface FilterProps<TKeys extends string> {
  currencySymbol?: string;
  onFilterChange: (filter: IFilter<TKeys>) => void;
  onFilterReset: () => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

export interface FilterPageProps<TKeys extends string, TOpts extends {}>
  extends FilterProps<TKeys>,
    SearchPageProps {
  filterOpts: TOpts;
}

export interface Node {
  id: string;
}