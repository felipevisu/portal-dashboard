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

export enum AttributeChoicesSortField {
  /** Sort attribute choice by name. */
  NAME = 'NAME',
  /** Sort attribute choice by slug. */
  SLUG = 'SLUG'
}

export type AttributeChoicesSortingInput = {
  direction: OrderDirection;
  /** Sort attribute choices by the selected field. */
  field: AttributeChoicesSortField;
};

export type AttributeCreateInput = {
  entityType?: InputMaybe<AttributeEntityTypeEnum>;
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  filterableInWebsite?: InputMaybe<Scalars['Boolean']>;
  inputType?: InputMaybe<AttributeInputTypeEnum>;
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
  type: AttributeTypeEnum;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  values?: InputMaybe<Array<AttributeValueCreateInput>>;
  visibleInWebsite?: InputMaybe<Scalars['Boolean']>;
};

/** An enumeration. */
export enum AttributeEntityTypeEnum {
  PROVIDER = 'PROVIDER',
  VEHICLE = 'VEHICLE'
}

export type AttributeFilterInput = {
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  filterableInWebsite?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<AttributeTypeEnum>;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  visibleInWebsite?: InputMaybe<Scalars['Boolean']>;
};

export type AttributeInput = {
  boolean?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<DateRangeInput>;
  dateTime?: InputMaybe<DateTimeRangeInput>;
  slug: Scalars['String'];
  values?: InputMaybe<Array<Scalars['String']>>;
  valuesRange?: InputMaybe<IntRangeInput>;
};

/** An enumeration. */
export enum AttributeInputTypeEnum {
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DROPDOWN = 'DROPDOWN',
  FILE = 'FILE',
  MULTISELECT = 'MULTISELECT',
  PLAIN_TEXT = 'PLAIN_TEXT',
  REFERENCE = 'REFERENCE',
  SWATCH = 'SWATCH'
}

export enum AttributeSortField {
  /** Sort attributes by the filterable in dashboard flag */
  FILTERABLE_IN_DASHBOARD = 'FILTERABLE_IN_DASHBOARD',
  /** Sort attributes by the filterable in storefront flag */
  FILTERABLE_IN_WEBSITE = 'FILTERABLE_IN_WEBSITE',
  /** Sort attributes by name */
  NAME = 'NAME',
  /** Sort attributes by slug */
  SLUG = 'SLUG',
  /** Sort attributes by the value required flag */
  VALUE_REQUIRED = 'VALUE_REQUIRED',
  /** Sort attributes by visibility in the storefront */
  VISIBLE_IN_WEBSITE = 'VISIBLE_IN_WEBSITE'
}

export type AttributeSortingInput = {
  direction: OrderDirection;
  /** Sort attributes by the selected field. */
  field: AttributeSortField;
};

/** An enumeration. */
export enum AttributeTypeEnum {
  DOCUMENT = 'DOCUMENT',
  PROVIDER = 'PROVIDER',
  VEHICLE = 'VEHICLE',
  VEHICLE_AND_PROVIDER = 'VEHICLE_AND_PROVIDER'
}

export type AttributeUpdateInput = {
  addValues?: InputMaybe<Array<AttributeValueUpdateInput>>;
  filterableInDashboard?: InputMaybe<Scalars['Boolean']>;
  filterableInWebsite?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  removeValues?: InputMaybe<Array<Scalars['ID']>>;
  slug?: InputMaybe<Scalars['String']>;
  valueRequired?: InputMaybe<Scalars['Boolean']>;
  visibleInWebsite?: InputMaybe<Scalars['Boolean']>;
};

export type AttributeValueCreateInput = {
  fileUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  plainText?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type AttributeValueFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
};

export type AttributeValueInput = {
  boolean?: InputMaybe<Scalars['Boolean']>;
  contentType?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  dropdown?: InputMaybe<AttributeValueSelectableTypeInput>;
  file?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  multiselect?: InputMaybe<Array<AttributeValueSelectableTypeInput>>;
  numeric?: InputMaybe<Scalars['String']>;
  plainText?: InputMaybe<Scalars['String']>;
  /** List of entity IDs that will be used as references. */
  references?: InputMaybe<Array<Scalars['ID']>>;
  values?: InputMaybe<Array<Scalars['String']>>;
};

export type AttributeValueSelectableTypeInput = {
  id?: InputMaybe<Scalars['ID']>;
  value?: InputMaybe<Scalars['String']>;
};

export type AttributeValueUpdateInput = {
  fileUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  plainText?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type CategoryFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export enum CategorySortField {
  NAME = 'NAME'
}

export type CategorySortingInput = {
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export type ChannelInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type ConfigurationItemInput = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

/** An enumeration. */
export enum ConfigurationTypeFieldEnum {
  BOOLEAN = 'BOOLEAN',
  MULTILINE = 'MULTILINE',
  OUTPUT = 'OUTPUT',
  PASSWORD = 'PASSWORD',
  SECRET = 'SECRET',
  SECRETMULTILINE = 'SECRETMULTILINE',
  STRING = 'STRING'
}

export type DateRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['Date']>;
  /** End date. */
  lte?: InputMaybe<Scalars['Date']>;
};

export type DateTimeRangeInput = {
  /** Start date. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** End date. */
  lte?: InputMaybe<Scalars['DateTime']>;
};

/** An enumeration. */
export enum DocumentFileStatusEnum {
  APPROVED = 'APPROVED',
  REFUSED = 'REFUSED',
  WAITING = 'WAITING'
}

export type DocumentFilterInput = {
  beginDate?: InputMaybe<DateRangeInput>;
  expirationDate?: InputMaybe<DateRangeInput>;
  expires?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
  waiting?: InputMaybe<Scalars['Boolean']>;
};

export type DocumentInput = {
  beginDate?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  entry?: InputMaybe<Scalars['ID']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  expires?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Scalars['Upload']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  loadType?: InputMaybe<DocumentLoadOptionsEnum>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['ID']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
};

/** An enumeration. */
export enum DocumentLoadOptionsEnum {
  CND = 'CND',
  CNDT = 'CNDT',
  CNEP = 'CNEP',
  EMPTY = 'EMPTY',
  FGTS = 'FGTS',
  JUCESP = 'JUCESP',
  MEI = 'MEI',
  SEFAZ_MG = 'SEFAZ_MG',
  SEFAZ_SP = 'SEFAZ_SP',
  TCU = 'TCU'
}

/** An enumeration. */
export enum DocumentLoadStatusEnum {
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS'
}

export enum DocumentSortField {
  CREATED = 'CREATED'
}

export type DocumentSortingInput = {
  direction: OrderDirection;
  /** Sort documents by the selected field. */
  field: DocumentSortField;
};

export type DocumentUpdateByEntryInput = {
  beginDate?: InputMaybe<Scalars['Date']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  file?: InputMaybe<Scalars['Upload']>;
};

export type EntryChannelListingUpdateInput = {
  removeChannels?: InputMaybe<Array<Scalars['ID']>>;
  updateChannels?: InputMaybe<Array<PublishableChannelListingInput>>;
};

export type EntryFilterInput = {
  attributes?: InputMaybe<Array<AttributeInput>>;
  categories?: InputMaybe<Array<Scalars['ID']>>;
  channel?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export type EntryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  address?: InputMaybe<Scalars['String']>;
  attributes?: InputMaybe<Array<AttributeValueInput>>;
  categories?: InputMaybe<Array<Scalars['ID']>>;
  category?: InputMaybe<Scalars['ID']>;
  documentNumber?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
  slug?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<EntryTypeEnum>;
};

export enum EntrySortField {
  CREATED = 'CREATED',
  NAME = 'NAME',
  PUBLISHED = 'PUBLISHED',
  UPDATED = 'UPDATED'
}

export type EntrySortingInput = {
  direction: OrderDirection;
  /** Sort entries by the selected field. */
  field: EntrySortField;
};

/** An enumeration. */
export enum EntryTypeEnum {
  PROVIDER = 'PROVIDER',
  VEHICLE = 'VEHICLE'
}

/** An enumeration. */
export enum EventTypesEnum {
  DOCUMENT_APPROVED = 'DOCUMENT_APPROVED',
  DOCUMENT_CREATED = 'DOCUMENT_CREATED',
  DOCUMENT_DECLINED = 'DOCUMENT_DECLINED',
  DOCUMENT_DELETED = 'DOCUMENT_DELETED',
  DOCUMENT_LOADED_FAIL = 'DOCUMENT_LOADED_FAIL',
  DOCUMENT_LOADED_FROM_API = 'DOCUMENT_LOADED_FROM_API',
  DOCUMENT_RECEIVED = 'DOCUMENT_RECEIVED',
  DOCUMENT_REQUESTED = 'DOCUMENT_REQUESTED',
  DOCUMENT_UPDATED = 'DOCUMENT_UPDATED',
  ENTRY_CREATED = 'ENTRY_CREATED',
  ENTRY_DELETED = 'ENTRY_DELETED',
  ENTRY_UPDATED = 'ENTRY_UPDATED'
}

export type IntRangeInput = {
  /** Value greater than or equal to. */
  gte?: InputMaybe<Scalars['Int']>;
  /** Value less than or equal to. */
  lte?: InputMaybe<Scalars['Int']>;
};

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

export enum PluginConfigurationType {
  GLOBAL = 'GLOBAL',
  PER_CHANNEL = 'PER_CHANNEL'
}

export type PluginFilterInput = {
  search?: InputMaybe<Scalars['String']>;
  statusInChannels?: InputMaybe<PluginStatusInChannelsInput>;
  type?: InputMaybe<PluginConfigurationType>;
};

export enum PluginSortField {
  IS_ACTIVE = 'IS_ACTIVE',
  NAME = 'NAME'
}

export type PluginSortingInput = {
  direction: OrderDirection;
  /** Sort plugins by the selected field. */
  field: PluginSortField;
};

export type PluginStatusInChannelsInput = {
  active: Scalars['Boolean'];
  channels: Array<Scalars['ID']>;
};

export type PluginUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  configuration?: InputMaybe<Array<ConfigurationItemInput>>;
};

export type PublishableChannelListingInput = {
  channelId: Scalars['ID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
};

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
  direction: OrderDirection;
  /** Sort sessions by the selected field. */
  field: SessionSortField;
};

export type CheckDocumentLoadStatusQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CheckDocumentLoadStatusQuery = { __typename: 'Query', documentLoad: { __typename: 'DocumentLoad', id: string, status: DocumentLoadStatusEnum | null, errorMessage: string | null, document: { __typename: 'Document', id: string, name: string } | null, documentFile: { __typename: 'DocumentFile', id: string } | null } | null };

export type AttributeCreateMutationVariables = Exact<{
  input: AttributeCreateInput;
}>;


export type AttributeCreateMutation = { __typename: 'Mutation', attributeCreate: { __typename: 'AttributeCreate', attribute: { __typename: 'Attribute', inputType: AttributeInputTypeEnum | null, valueRequired: boolean, id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, entityType: AttributeEntityTypeEnum | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: AttributeUpdateInput;
}>;


export type AttributeUpdateMutation = { __typename: 'Mutation', attributeUpdate: { __typename: 'AttributeUpdate', attribute: { __typename: 'Attribute', inputType: AttributeInputTypeEnum | null, valueRequired: boolean, id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, entityType: AttributeEntityTypeEnum | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AttributeDeleteMutation = { __typename: 'Mutation', attributeDelete: { __typename: 'AttributeDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeValueDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type AttributeValueDeleteMutation = { __typename: 'Mutation', attributeValueDelete: { __typename: 'AttributeValueDelete', attribute: { __typename: 'Attribute', id: string, choices: { __typename: 'AttributeValueCountableConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ __typename: 'AttributeValueCountableEdge', cursor: string, node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }> } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeValueUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AttributeValueUpdateInput;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type AttributeValueUpdateMutation = { __typename: 'Mutation', attributeValueUpdate: { __typename: 'AttributeValueUpdate', attribute: { __typename: 'Attribute', id: string, choices: { __typename: 'AttributeValueCountableConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ __typename: 'AttributeValueCountableEdge', cursor: string, node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }> } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeValueCreateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: AttributeValueCreateInput;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type AttributeValueCreateMutation = { __typename: 'Mutation', attributeValueCreate: { __typename: 'AttributeValueCreate', attribute: { __typename: 'Attribute', id: string, choices: { __typename: 'AttributeValueCountableConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ __typename: 'AttributeValueCountableEdge', cursor: string, node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }> } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type AttributeDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type AttributeDetailsQuery = { __typename: 'Query', attribute: { __typename: 'Attribute', inputType: AttributeInputTypeEnum | null, valueRequired: boolean, id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, entityType: AttributeEntityTypeEnum | null, choices: { __typename: 'AttributeValueCountableConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ __typename: 'AttributeValueCountableEdge', cursor: string, node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }> } | null } | null };

export type AttributesQueryVariables = Exact<{
  filter?: InputMaybe<AttributeFilterInput>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<AttributeSortingInput>;
}>;


export type AttributesQuery = { __typename: 'Query', attributes: { __typename: 'AttributeCountableConnection', edges: Array<{ __typename: 'AttributeCountableEdge', node: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

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


export type CategoryCreateMutation = { __typename: 'Mutation', categoryCreate: { __typename: 'CategoryCreate', category: { __typename: 'Category', id: string, name: string, slug: string | null, type: EntryTypeEnum | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type CategoryUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: CategoryInput;
}>;


export type CategoryUpdateMutation = { __typename: 'Mutation', categoryUpdate: { __typename: 'CategoryUpdate', category: { __typename: 'Category', id: string, name: string, slug: string | null, type: EntryTypeEnum | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

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


export type CategoriesQuery = { __typename: 'Query', categories: { __typename: 'CategoryCountableConnection', edges: Array<{ __typename: 'CategoryCountableEdge', node: { __typename: 'Category', id: string, name: string, slug: string | null, type: EntryTypeEnum | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type CategoryDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CategoryDetailsQuery = { __typename: 'Query', category: { __typename: 'Category', id: string, name: string, slug: string | null, type: EntryTypeEnum | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null } | null };

export type ChannelCreateMutationVariables = Exact<{
  input: ChannelInput;
}>;


export type ChannelCreateMutation = { __typename: 'Mutation', channelCreate: { __typename: 'ChannelCreate', channel: { __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ChannelUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ChannelInput;
}>;


export type ChannelUpdateMutation = { __typename: 'Mutation', channelUpdate: { __typename: 'ChannelUpdate', channel: { __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ChannelDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChannelDeleteMutation = { __typename: 'Mutation', channelDelete: { __typename: 'ChannelDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type BaseChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type BaseChannelsQuery = { __typename: 'Query', channels: Array<{ __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean }> | null };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename: 'Query', channels: Array<{ __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean }> | null };

export type ChannelDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChannelDetailsQuery = { __typename: 'Query', channel: { __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean } | null };

export type DocumentCreateMutationVariables = Exact<{
  input: DocumentInput;
}>;


export type DocumentCreateMutation = { __typename: 'Mutation', documentCreate: { __typename: 'DocumentCreate', document: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', id: string, beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: DocumentInput;
}>;


export type DocumentUpdateMutation = { __typename: 'Mutation', documentUpdate: { __typename: 'DocumentUpdate', document: { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, loadType: DocumentLoadOptionsEnum | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null }> | null, events: Array<{ __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentDeleteMutation = { __typename: 'Mutation', documentDelete: { __typename: 'DocumentDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DocumentBulkDeleteMutation = { __typename: 'Mutation', documentBulkDelete: { __typename: 'DocumentBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentFileDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentFileDeleteMutation = { __typename: 'Mutation', documentFileDelete: { __typename: 'DocumentFileDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ApproveDocumentFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ApproveDocumentFileMutation = { __typename: 'Mutation', approveDocumentFile: { __typename: 'ApproveDocumentFile', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type RefuseDocumentFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RefuseDocumentFileMutation = { __typename: 'Mutation', refuseDocumentFile: { __typename: 'RefuseDocumentFile', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type RestoreDocumentFileMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RestoreDocumentFileMutation = { __typename: 'Mutation', restoreDocumentFile: { __typename: 'RestoreDocumentFile', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type RequestNewDocumentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RequestNewDocumentMutation = { __typename: 'Mutation', requestNewDocument: { __typename: 'RequestNewDocument', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type LoadNewDocumentFromApiMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LoadNewDocumentFromApiMutation = { __typename: 'Mutation', loadNewDocumentFromApi: { __typename: 'LoadNewDocumentFromAPI', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }>, documentLoad: { __typename: 'DocumentLoad', id: string, status: DocumentLoadStatusEnum | null, errorMessage: string | null, document: { __typename: 'Document', id: string, name: string } | null, documentFile: { __typename: 'DocumentFile', id: string } | null } | null } | null };

export type DocumentDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DocumentDetailsQuery = { __typename: 'Query', document: { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, loadType: DocumentLoadOptionsEnum | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null }> | null, events: Array<{ __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } | null };

export type DocumentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<DocumentFilterInput>;
}>;


export type DocumentsQuery = { __typename: 'Query', documents: { __typename: 'DocumentCountableConnection', edges: Array<{ __typename: 'DocumentCountableEdge', node: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', id: string, beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type EntryCreateMutationVariables = Exact<{
  input: EntryInput;
}>;


export type EntryCreateMutation = { __typename: 'Mutation', entryCreate: { __typename: 'EntryCreate', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, email: string | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, attributes: Array<{ __typename: 'SelectedAttribute', attribute: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean }, values: Array<{ __typename: 'AttributeValue', id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, plainText: string | null, reference: string | null, file: { __typename: 'File', url: string } | null }> }>, consult: Array<{ __typename: 'Consult', id: string, created: any | null, plugin: string | null, response: any | null }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null } | null, errors: Array<{ __typename: 'EntryError', attributes: Array<string> | null, code: string | null, field: string | null, message: string | null }> } | null };

export type EntryUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  input: EntryInput;
}>;


export type EntryUpdateMutation = { __typename: 'Mutation', entryUpdate: { __typename: 'EntryUpdate', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, email: string | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, attributes: Array<{ __typename: 'SelectedAttribute', attribute: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean }, values: Array<{ __typename: 'AttributeValue', id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, plainText: string | null, reference: string | null, file: { __typename: 'File', url: string } | null }> }>, consult: Array<{ __typename: 'Consult', id: string, created: any | null, plugin: string | null, response: any | null }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null } | null, errors: Array<{ __typename: 'EntryError', attributes: Array<string> | null, code: string | null, field: string | null, message: string | null }> } | null };

export type EntryDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EntryDeleteMutation = { __typename: 'Mutation', entryDelete: { __typename: 'EntryDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type EntryBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type EntryBulkDeleteMutation = { __typename: 'Mutation', entryBulkDelete: { __typename: 'EntryBulkDelete', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type ConsultDocumentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConsultDocumentMutation = { __typename: 'Mutation', consultDocument: { __typename: 'ConsultDocument', errors: Array<{ __typename: 'Error', message: string | null, field: string | null }> } | null };

export type EntryChannelListingUpdateMutationVariables = Exact<{
  id: Scalars['ID'];
  input: EntryChannelListingUpdateInput;
}>;


export type EntryChannelListingUpdateMutation = { __typename: 'Mutation', entryChannelListingUpdate: { __typename: 'EntryChannelListingUpdate', errors: Array<{ __typename: 'EntryChannelListingError', code: string | null, field: string | null, message: string | null, attributes: Array<string> | null, values: Array<string> | null, channels: Array<string> | null }> } | null };

export type EntriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<EntryFilterInput>;
  channel?: InputMaybe<Scalars['String']>;
}>;


export type EntriesQuery = { __typename: 'Query', entries: { __typename: 'EntryCountableConnection', edges: Array<{ __typename: 'EntryCountableEdge', node: { __typename: 'Entry', id: string, name: string, slug: string | null, updated: any | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type EntryDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type EntryDetailsQuery = { __typename: 'Query', entry: { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, email: string | null, documents: { __typename: 'DocumentCountableConnection', edges: Array<{ __typename: 'DocumentCountableEdge', node: { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', id: string, beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, attributes: Array<{ __typename: 'SelectedAttribute', attribute: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean }, values: Array<{ __typename: 'AttributeValue', id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, plainText: string | null, reference: string | null, file: { __typename: 'File', url: string } | null }> }>, consult: Array<{ __typename: 'Consult', id: string, created: any | null, plugin: string | null, response: any | null }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null } | null };

export type InitialEntryFilterAttributesQueryVariables = Exact<{
  type: AttributeTypeEnum;
}>;


export type InitialEntryFilterAttributesQuery = { __typename: 'Query', attributes: { __typename: 'AttributeCountableConnection', edges: Array<{ __typename: 'AttributeCountableEdge', node: { __typename: 'Attribute', id: string, name: string | null, inputType: AttributeInputTypeEnum | null, slug: string | null } }> } | null };

export type InitialEntryFilterCategoriesQueryVariables = Exact<{
  categories?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type InitialEntryFilterCategoriesQuery = { __typename: 'Query', categories: { __typename: 'CategoryCountableConnection', edges: Array<{ __typename: 'CategoryCountableEdge', node: { __typename: 'Category', id: string, name: string } }> } | null };

export type EventsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type EventsQuery = { __typename: 'Query', events: { __typename: 'EventCountableConnection', edges: Array<{ __typename: 'EventCountableEdge', node: { __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null, document: { __typename: 'Document', id: string, name: string, entry: { __typename: 'Entry', id: string, name: string } | null } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

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

export type PluginUpdateMutationVariables = Exact<{
  channelId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  input: PluginUpdateInput;
}>;


export type PluginUpdateMutation = { __typename: 'Mutation', pluginUpdate: { __typename: 'PluginUpdate', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }>, plugin: { __typename: 'Plugin', id: string, name: string, description: string, globalConfiguration: { __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null } | null, channelConfigurations: Array<{ __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null }> } | null } | null };

export type PluginsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<PluginFilterInput>;
  sort?: InputMaybe<PluginSortingInput>;
}>;


export type PluginsQuery = { __typename: 'Query', plugins: { __typename: 'PluginCountableConnection', edges: Array<{ __typename: 'PluginCountableEdge', node: { __typename: 'Plugin', id: string, name: string, description: string, channelConfigurations: Array<{ __typename: 'PluginConfiguration', active: boolean, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null }>, globalConfiguration: { __typename: 'PluginConfiguration', active: boolean, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null } | null } }>, pageInfo: { __typename: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor: string | null, endCursor: string | null } } | null };

export type PluginQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PluginQuery = { __typename: 'Query', plugin: { __typename: 'Plugin', id: string, name: string, description: string, globalConfiguration: { __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null } | null, channelConfigurations: Array<{ __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null }> } | null };

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

export type AttributeValueFragment = { __typename: 'AttributeValue', id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, plainText: string | null, reference: string | null, file: { __typename: 'File', url: string } | null };

export type AttributeValueDetailsFragment = { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null };

export type AttributeFragment = { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean };

export type AttributeDetailsFragment = { __typename: 'Attribute', inputType: AttributeInputTypeEnum | null, valueRequired: boolean, id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, entityType: AttributeEntityTypeEnum | null };

export type AttributeValueListFragment = { __typename: 'AttributeValueCountableConnection', pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ __typename: 'AttributeValueCountableEdge', cursor: string, node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }> };

export type AvailableAttributeFragment = { __typename: 'Attribute', id: string, name: string | null, slug: string | null };

export type UserFragment = { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null };

export type UserBaseFragment = { __typename: 'User', id: string, firstName: string | null, lastName: string | null };

export type CategoryFragment = { __typename: 'Category', id: string, name: string, slug: string | null, type: EntryTypeEnum | null, entries: { __typename: 'EntryCountableConnection', totalCount: number | null } | null };

export type ChannelFragment = { __typename: 'Channel', id: string, name: string, slug: string, isActive: boolean };

export type ConsultFragment = { __typename: 'Consult', id: string, created: any | null, plugin: string | null, response: any | null };

export type DocumentFragment = { __typename: 'Document', id: string, name: string, created: any | null, isPublished: boolean | null, expired: boolean | null, expires: boolean | null, defaultFile: { __typename: 'DocumentFile', id: string, beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null };

export type DocumentFileFragment = { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null };

export type DocumentDetailsFragment = { __typename: 'Document', id: string, name: string, description: string | null, isPublished: boolean | null, expires: boolean | null, created: any | null, updated: any | null, loadType: DocumentLoadOptionsEnum | null, defaultFile: { __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null } | null, files: Array<{ __typename: 'DocumentFile', id: string, created: any | null, beginDate: any | null, expirationDate: any | null, status: DocumentFileStatusEnum | null, file: { __typename: 'File', url: string } | null }> | null, events: Array<{ __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null }> | null, entry: { __typename: 'Entry', id: string, name: string, type: EntryTypeEnum | null } | null };

export type DocumentLoadFragment = { __typename: 'DocumentLoad', id: string, status: DocumentLoadStatusEnum | null, errorMessage: string | null, document: { __typename: 'Document', id: string, name: string } | null, documentFile: { __typename: 'DocumentFile', id: string } | null };

export type ChannelListingEntryFragment = { __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } };

export type EntryFragment = { __typename: 'Entry', id: string, name: string, slug: string | null, updated: any | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null };

export type EntryDetailsFragment = { __typename: 'Entry', id: string, name: string, slug: string | null, documentNumber: string | null, email: string | null, category: { __typename: 'Category', id: string, name: string } | null, categories: Array<{ __typename: 'Category', id: string, name: string }> | null, attributes: Array<{ __typename: 'SelectedAttribute', attribute: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean }, values: Array<{ __typename: 'AttributeValue', id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, plainText: string | null, reference: string | null, file: { __typename: 'File', url: string } | null }> }>, consult: Array<{ __typename: 'Consult', id: string, created: any | null, plugin: string | null, response: any | null }> | null, channelListings: Array<{ __typename: 'EntryChannelListing', isPublished: boolean, isActive: boolean, channel: { __typename: 'Channel', id: string, name: string } }> | null };

export type ErrorFragment = { __typename: 'Error', code: string | null, field: string | null, message: string | null };

export type BulkItemErrorFragment = { __typename: 'BulkItemError', code: string | null, field: string | null, message: string | null, index: number | null };

export type EntryErrorFragment = { __typename: 'EntryError', code: string | null, field: string | null, message: string | null };

export type EntryErrorWithAttributesFragment = { __typename: 'EntryError', attributes: Array<string> | null, code: string | null, field: string | null, message: string | null };

export type EntryChannelListingErrorFragment = { __typename: 'EntryChannelListingError', code: string | null, field: string | null, message: string | null, attributes: Array<string> | null, values: Array<string> | null, channels: Array<string> | null };

export type EventFragment = { __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null };

export type EventDetailsFragment = { __typename: 'Event', id: string, date: any | null, type: EventTypesEnum | null, message: string | null, user: { __typename: 'User', id: string, email: string, firstName: string | null, lastName: string | null, isStaff: boolean | null } | null, document: { __typename: 'Document', id: string, name: string, entry: { __typename: 'Entry', id: string, name: string } | null } | null };

export type InvestmentFragment = { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null };

export type ItemFragment = { __typename: 'Item', id: string, name: string, value: any | null };

export type InvestmentDetailsFragment = { __typename: 'Investment', id: string, year: number, month: number, isPublished: boolean | null, items: Array<{ __typename: 'Item', id: string, name: string, value: any | null }> | null };

export type PageInfoFragment = { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null };

export type ConfigurationItemFragment = { __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null };

export type PluginConfigurationBaseFragment = { __typename: 'PluginConfiguration', active: boolean, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null };

export type PluginConfigurationExtendedFragment = { __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null };

export type PluginBaseFragment = { __typename: 'Plugin', id: string, name: string, description: string, channelConfigurations: Array<{ __typename: 'PluginConfiguration', active: boolean, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null }>, globalConfiguration: { __typename: 'PluginConfiguration', active: boolean, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null } | null };

export type PluginsDetailsFragment = { __typename: 'Plugin', id: string, name: string, description: string, globalConfiguration: { __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null } | null, channelConfigurations: Array<{ __typename: 'PluginConfiguration', active: boolean, configuration: Array<{ __typename: 'ConfigurationItem', name: string, value: string | null, type: ConfigurationTypeFieldEnum | null, helpText: string | null, label: string | null }> | null, channel: { __typename: 'Channel', id: string, name: string, slug: string } | null }> };

export type SessionFragment = { __typename: 'Session', id: string, name: string, slug: string | null, date: any | null, isPublished: boolean | null };

export type SessionDetailsFragment = { __typename: 'Session', id: string, name: string, slug: string | null, content: any | null, date: any | null, isPublished: boolean | null };

export type SearchAttributesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
  type: AttributeTypeEnum;
}>;


export type SearchAttributesQuery = { __typename: 'Query', search: { __typename: 'AttributeCountableConnection', edges: Array<{ __typename: 'AttributeCountableEdge', node: { __typename: 'Attribute', id: string, name: string | null, slug: string | null, type: AttributeTypeEnum | null, visibleInWebsite: boolean, filterableInDashboard: boolean, filterableInWebsite: boolean, inputType: AttributeInputTypeEnum | null, entityType: AttributeEntityTypeEnum | null, valueRequired: boolean } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type SearchAttributeValuesQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
}>;


export type SearchAttributeValuesQuery = { __typename: 'Query', attribute: { __typename: 'Attribute', id: string, choices: { __typename: 'AttributeValueCountableConnection', edges: Array<{ __typename: 'AttributeValueCountableEdge', node: { __typename: 'AttributeValue', plainText: string | null, id: string, name: string | null, slug: string | null, boolean: boolean | null, date: any | null, value: string | null, reference: string | null, file: { __typename: 'File', url: string } | null } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null } | null };

export type SearchCategoriesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  query: Scalars['String'];
  type?: InputMaybe<EntryTypeEnum>;
}>;


export type SearchCategoriesQuery = { __typename: 'Query', search: { __typename: 'CategoryCountableConnection', edges: Array<{ __typename: 'CategoryCountableEdge', node: { __typename: 'Category', id: string, name: string } }>, pageInfo: { __typename: 'PageInfo', endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null };

export type ValidateTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateTokenMutation = { __typename: 'Mutation', validateToken: { __typename: 'ValidateDocumentToken', document: { __typename: 'Document', id: string, name: string, expires: boolean | null, expired: boolean | null, defaultFile: { __typename: 'DocumentFile', beginDate: any | null, expirationDate: any | null } | null, entry: { __typename: 'Entry', name: string, type: EntryTypeEnum | null } | null } | null, errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };

export type DocumentUpdateByEntryMutationVariables = Exact<{
  token: Scalars['String'];
  input: DocumentUpdateByEntryInput;
}>;


export type DocumentUpdateByEntryMutation = { __typename: 'Mutation', documentUpdateByEntry: { __typename: 'DocumentUpdateByEntry', errors: Array<{ __typename: 'Error', code: string | null, field: string | null, message: string | null }> } | null };
