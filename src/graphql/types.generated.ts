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
  Date: any;
  DateTime: any;
  Decimal: any;
  GenericScalar: any;
  JSONString: any;
  Time: any;
  Upload: any;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum CategorySortField {
  NAME = 'NAME'
}

export type CategorySortingInput = {
  direction: OrderDirection;
  field: CategorySortField;
};

export type DocumentInput = {
  beginDate?: InputMaybe<Scalars['Date']>;
  expirationDate?: InputMaybe<Scalars['Date']>;
  expires?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Scalars['Upload']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['ID']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type InvestmentInput = {
  isPublished?: InputMaybe<Scalars['Boolean']>;
  mounth?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type ItemBulkInput = {
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type ItemInput = {
  investment?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ProviderInput = {
  documentNumber?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
  segment?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum ProviderSortField {
  CREATED = 'CREATED',
  NAME = 'NAME',
  PUBLISHED = 'PUBLISHED',
  UPDATED = 'UPDATED'
}

export type ProviderSortingInput = {
  direction: OrderDirection;
  field: ProviderSortField;
};

export type SegmentInput = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum SegmentSortField {
  NAME = 'NAME'
}

export type SegmentSortingInput = {
  direction: OrderDirection;
  field: SegmentSortField;
};

export type SessionInput = {
  content?: InputMaybe<Scalars['JSONString']>;
  date?: InputMaybe<Scalars['Date']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['Time']>;
};

export type VehicleInput = {
  category?: InputMaybe<Scalars['ID']>;
  documentNumber?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  publicationDate?: InputMaybe<Scalars['Date']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', me: { __typename: 'User', email: string, firstName: string, lastName: string } | null };

export type UserFragment = { __typename: 'User', id: string, email: string, firstName: string, lastName: string, isStaff: boolean };

export type UserBaseFragment = { __typename: 'User', id: string, firstName: string, lastName: string };

export type ErrorFragment = { __typename: 'Error', code: string | null, field: string | null, message: string | null };
