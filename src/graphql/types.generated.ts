export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /** The `Decimal` scalar type represents a python Decimal. */
  Decimal: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type CategoryFilterInput = {
  search?: InputMaybe<Scalars['String']>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum CategorySortField {
  NAME = 'NAME'
}

export type CategorySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export type DateRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['Date']>;
  /** End date. */
  lte?: InputMaybe<Scalars['Date']>;
};

export type DocumentFilterInput = {
  beginDate?: InputMaybe<DateRangeInput>;
  expirationDate?: InputMaybe<DateRangeInput>;
  expires?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export type DocumentInput = {
  beginDate?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  entry?: InputMaybe<Scalars['ID']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  expires?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Scalars['Upload']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['ID']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
};

export enum DocumentSortField {
  CREATED = 'CREATED'
}

export type DocumentSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort documents by the selected field. */
  field: DocumentSortField;
};

export type EntryFilterInput = {
  categories?: InputMaybe<Array<Scalars['ID']>>;
  category?: InputMaybe<Scalars['ID']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export type EntryInput = {
  address?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['ID']>;
  documentNumber?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum EntrySortField {
  CREATED = 'CREATED',
  NAME = 'NAME',
  PUBLISHED = 'PUBLISHED',
  UPDATED = 'UPDATED'
}

export type EntrySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort entries by the selected field. */
  field: EntrySortField;
};

/** An enumeration. */
export enum EntryTypeEnum {
  PROVIDER = 'PROVIDER',
  VEHICLE = 'VEHICLE'
}

export type InvestmentFilterInput = {
  isPublished?: InputMaybe<Scalars['Boolean']>;
  month?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Float']>;
};

export type InvestmentInput = {
  isPublished?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<Array<ItemCreateInput>>;
  month?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

export enum InvestmentSortField {
  CREATED = 'CREATED'
}

export type InvestmentSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort investments by the selected field. */
  field: InvestmentSortField;
};

export type InvestmentUpdateInput = {
  addItems?: InputMaybe<Array<ItemCreateInput>>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  month?: InputMaybe<Scalars['Int']>;
  removeItems?: InputMaybe<Array<Scalars['ID']>>;
  year?: InputMaybe<Scalars['Int']>;
};

export type ItemBulkInput = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type ItemCreateInput = {
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type ItemInput = {
  investment?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  ASC = 'ASC',
  /** Specifies a descending sort order. */
  DESC = 'DESC'
}

export type SessionFilterInput = {
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

export type SessionInput = {
  content?: InputMaybe<Scalars['JSONString']>;
  date?: InputMaybe<Scalars['DateTime']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum SessionSortField {
  NAME = 'NAME'
}

export type SessionSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sessions by the selected field. */
  field: SessionSortField;
};

export type TokenCreateMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type TokenCreateMutation = { __typename: 'Mutation', tokenCreate: { __typename: 'CreateToken', token: string | null, refreshToken: string | null, errors: Array<{ __typename: 'Error', message: string | null, field: string | null, code: string | null }>, user: { __typename: 'User', email: string, firstName: string | null, lastName: string | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me: { __typename: 'User', email: string, firstName: string | null, lastName: string | null } | null };

export type CategoryCreateMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type CategoryCreateMutation = { __typename: 'Mutation', categoryCreate: { __typename: 'CategoryCreate', category: { __typename: 'Category', id: string, name: string, slug: string | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type CategoryUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: CategoryInput;
}>;


export type CategoryUpdateMutation = { __typename: 'Mutation', categoryUpdate: { __typename: 'CategoryUpdate', category: { __typename: 'Category', id: string, name: string, slug: string | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type CategoryDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryDeleteMutation = { __typename: 'Mutation', categoryDelete: { __typename: 'CategoryDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type CategoryBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type CategoryBulkDeleteMutation = { __typename: 'Mutation', categoryBulkDelete: { __typename: 'CategoryBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type CategoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CategoryFilterInput>;
}>;


export type CategoriesQuery = { __typename: 'Query', categories: { __typename: 'CategoryCountableConnection', edges: Array<{ __typename: 'CategoryCountableEdge', node: { __typename: 'Category', id: string, name: string, slug: string | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type CategoryDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryDetailsQuery = { __typename: 'Query', category: { __typename: 'Category', id: string, name: string, slug: string | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null };

export type DocumentCreateMutationVariables = Exact<{
  input: DocumentInput;
}>;


export type DocumentCreateMutation = { __typename: 'Mutation', documentCreate: { __typename: 'DocumentCreate', document: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: DocumentInput;
}>;


export type DocumentUpdateMutation = { __typename: 'Mutation', documentUpdate: { __typename: 'DocumentUpdate', document: { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentDeleteMutation = { __typename: 'Mutation', documentDelete: { __typename: 'DocumentDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DocumentBulkDeleteMutation = { __typename: 'Mutation', documentBulkDelete: { __typename: 'DocumentBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentDetailsQuery = { __typename: 'Query', document: { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null };

export type DocumentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<DocumentFilterInput>;
}>;


export type DocumentsQuery = { __typename: 'Query', documents: { __typename: 'DocumentCountableConnection', edges: Array<{ __typename: 'DocumentCountableEdge', node: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type EntryCreateMutationVariables = Exact<{
  type: EntryTypeEnum;
  input: EntryInput;
}>;


export type EntryCreateMutation = { __typename: 'Mutation', entryCreate: { __typename: 'EntryCreate', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, isPublished: boolean | null, email: string | null, phone: string | null, address: string | null, category: { __typename: 'Category', id: string, name: string } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type EntryUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: EntryInput;
}>;


export type EntryUpdateMutation = { __typename: 'Mutation', entryUpdate: { __typename: 'EntryUpdate', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, isPublished: boolean | null, email: string | null, phone: string | null, address: string | null, category: { __typename: 'Category', id: string, name: string } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type EntryDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EntryDeleteMutation = { __typename: 'Mutation', entryDelete: { __typename: 'EntryDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type EntryBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type EntryBulkDeleteMutation = { __typename: 'Mutation', entryBulkDelete: { __typename: 'EntryBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type EntriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EntryFilterInput>;
}>;


export type EntriesQuery = { __typename: 'Query', entries: { __typename: 'EntryCountableConnection', edges: Array<{ __typename: 'EntryCountableEdge', node: { __typename: 'Entry', id: string, name: string, slug: string | null, isPublished: boolean | null, category: { __typename: 'Category', id: string, name: string } | null, documents: { __typename: 'DocumentCountableConnection', totalCount: number | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type EntryDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type EntryDetailsQuery = { __typename: 'Query', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, isPublished: boolean | null, email: string | null, phone: string | null, address: string | null, documents: { __typename: 'DocumentCountableConnection', edges: Array<{ __typename: 'DocumentCountableEdge', node: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null, category: { __typename: 'Category', id: string, name: string } | null } | null };

export type InvestmentBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type InvestmentBulkDeleteMutation = { __typename: 'Mutation', investmentBulkDelete: { __typename: 'InvestmentBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type InvestmentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InvestmentDeleteMutation = { __typename: 'Mutation', investmentDelete: { __typename: 'InvestmentDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type InvestmentUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: InvestmentUpdateInput;
}>;


export type InvestmentUpdateMutation = { __typename: 'Mutation', investmentUpdate: { __typename: 'InvestmentUpdate', investment: { __typename: 'Investment', id: string } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ItemDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ItemDeleteMutation = { __typename: 'Mutation', itemDelete: { __typename: 'ItemDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ItemUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ItemInput;
}>;


export type ItemUpdateMutation = { __typename: 'Mutation', itemUpdate: { __typename: 'ItemUpdate', item: { __typename: 'Item', id: string, name: string, value: any | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ItemCreateMutationVariables = Exact<{
  investmentId: Scalars['ID'];
  input: ItemInput;
}>;


export type ItemCreateMutation = { __typename: 'Mutation', itemCreate: { __typename: 'ItemCreate', item: { __typename: 'Item', id: string, name: string, value: any | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type InvestmentCreateMutationVariables = Exact<{
  input: InvestmentInput;
}>;


export type InvestmentCreateMutation = { __typename: 'Mutation', investmentCreate: { __typename: 'InvestmentCreate', investment: { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type InvestmentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<InvestmentFilterInput>;
}>;


export type InvestmentsQuery = { __typename: 'Query', investments: { __typename: 'InvestmentCountableConnection', edges: Array<{ __typename: 'InvestmentCountableEdge', node: { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type InvestmentDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type InvestmentDetailsQuery = { __typename: 'Query', investment: { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null, items: Array<{ __typename: 'Item', id: string, name: string, value: any | null }> | null } | null };

export type SessionCreateMutationVariables = Exact<{
  input: SessionInput;
}>;


export type SessionCreateMutation = { __typename: 'Mutation', sessionCreate: { __typename: 'SessionCreate', session: { __typename: 'Session', id: string, name: string, slug: string | null, content: any | null, date: any | null, isPublished: boolean | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type SessionUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: SessionInput;
}>;


export type SessionUpdateMutation = { __typename: 'Mutation', sessionUpdate: { __typename: 'SessionUpdate', session: { __typename: 'Session', id: string, name: string, slug: string | null, content: any | null, date: any | null, isPublished: boolean | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type SessionDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SessionDeleteMutation = { __typename: 'Mutation', sessionDelete: { __typename: 'SessionDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type SessionBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SessionBulkDeleteMutation = { __typename: 'Mutation', sessionBulkDelete: { __typename: 'SessionBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type SessionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SessionFilterInput>;
}>;


export type SessionsQuery = { __typename: 'Query', sessions: { __typename: 'SessionCountableConnection', edges: Array<{ __typename: 'SessionCountableEdge', node: { __typename: 'Session', id: string, name: string, slug: string | null, date: any | null, isPublished: boolean | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type SessionDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SessionDetailsQuery = { __typename: 'Query', session: { __typename: 'Session', id: string, name: string, slug: string | null, content: any | null, date: any | null, isPublished: boolean | null } | null };

export type UserFragment = { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null };

export type UserBaseFragment = { __typename: 'User', id: string, firstName: string | null, lastName: string | null };

export type CategoryFragment = { __typename: 'Category', id: string, name: string, slug: string | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null };

export type DocumentFragment = { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null };

export type DocumentFileFragment = { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null };

export type DocumentDetailsFragment = { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, file: { __typename: 'File', url: string } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null };

export type EntryFragment = { __typename: 'Entry', id: string, name: string, slug: string | null, isPublished: boolean | null, category: { __typename: 'Category', id: string, name: string } | null, documents: { __typename: 'DocumentCountableConnection', totalCount: number | null } | null };

export type EntryDetailsFragment = { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, isPublished: boolean | null, email: string | null, phone: string | null, address: string | null, category: { __typename: 'Category', id: string, name: string } | null };

export type ErrorFragment = { __typename: 'Error', code: string | null, field: string | null, message: string | null };

export type BulkItemErrorFragment = { __typename: 'BulkItemError', code: string | null, field: string | null, message: string | null, index: number | null };

export type InvestmentFragment = { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null };

export type ItemFragment = { __typename: 'Item', id: string, name: string, value: any | null };

export type InvestmentDetailsFragment = { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null, items: Array<{ __typename: 'Item', id: string, name: string, value: any | null }> | null };

export type PageInfoFragment = { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null };

export type SessionFragment = { __typename: 'Session', id: string, name: string, slug: string | null, date: any | null, isPublished: boolean | null };

export type SessionDetailsFragment = { __typename: 'Session', id: string, name: string, slug: string | null, content: any | null, date: any | null, isPublished: boolean | null };

export type SearchCategoriesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchCategoriesQuery = { __typename: 'Query', search: { __typename: 'CategoryCountableConnection', edges: Array<{ __typename: 'CategoryCountableEdge', node: { __typename: 'Category', id: string, name: string } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };
