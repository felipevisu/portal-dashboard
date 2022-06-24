export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
  Upload: any;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export enum CategorySortField {
  NAME = "NAME",
}

export type CategorySortingInput = {
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export type DocumentInput = {
  beginDate?: InputMaybe<Scalars["Date"]>;
  expirationDate?: InputMaybe<Scalars["Date"]>;
  expires?: InputMaybe<Scalars["Boolean"]>;
  file?: InputMaybe<Scalars["Upload"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["ID"]>;
  publicationDate?: InputMaybe<Scalars["Date"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type InvestmentInput = {
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  mounth?: InputMaybe<Scalars["Int"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

export type ItemBulkInput = {
  name?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["Float"]>;
};

export type ItemInput = {
  investment?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["Float"]>;
};

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ProviderInput = {
  documentNumber?: InputMaybe<Scalars["String"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  publicationDate?: InputMaybe<Scalars["Date"]>;
  segment?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export enum ProviderSortField {
  CREATED = "CREATED",
  NAME = "NAME",
  PUBLISHED = "PUBLISHED",
  UPDATED = "UPDATED",
}

export type ProviderSortingInput = {
  direction: OrderDirection;
  /** Sort providers by the selected field. */
  field: ProviderSortField;
};

export type SegmentInput = {
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export enum SegmentSortField {
  NAME = "NAME",
}

export type SegmentSortingInput = {
  direction: OrderDirection;
  /** Sort segments by the selected field. */
  field: SegmentSortField;
};

export type SessionInput = {
  content?: InputMaybe<Scalars["JSONString"]>;
  date?: InputMaybe<Scalars["Date"]>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  time?: InputMaybe<Scalars["Time"]>;
};

export type VehicleInput = {
  category?: InputMaybe<Scalars["ID"]>;
  documentNumber?: InputMaybe<Scalars["String"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  publicationDate?: InputMaybe<Scalars["Date"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type TokenAuthMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type TokenAuthMutation = {
  __typename: "Mutation";
  tokenAuth: {
    __typename: "ObtainJSONWebToken";
    token: string | null;
    errors: Array<{
      __typename: "Error";
      message: string | null;
      field: string | null;
      code: string | null;
    }>;
    user: {
      __typename: "User";
      email: string;
      firstName: string;
      lastName: string;
    } | null;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename: "Query";
  me: {
    __typename: "User";
    email: string;
    firstName: string;
    lastName: string;
  } | null;
};

export type CategoryCreateMutationVariables = Exact<{
  input: CategoryInput;
}>;

export type CategoryCreateMutation = {
  __typename: "Mutation";
  categoryCreate: {
    __typename: "CategoryCreate";
    category: {
      __typename: "Category";
      id: string;
      name: string;
      slug: string;
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type CategoryUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
  input: CategoryInput;
}>;

export type CategoryUpdateMutation = {
  __typename: "Mutation";
  categoryUpdate: {
    __typename: "CategoryUpdate";
    category: {
      __typename: "Category";
      id: string;
      name: string;
      slug: string;
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type CategoryDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CategoryDeleteMutation = {
  __typename: "Mutation";
  categoryDelete: {
    __typename: "CategoryDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type CategoryBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type CategoryBulkDeleteMutation = {
  __typename: "Mutation";
  categoryBulkDelete: {
    __typename: "CategoryBulkDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type CategoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
}>;

export type CategoriesQuery = {
  __typename: "Query";
  categories: {
    __typename: "CategoryConnection";
    edges: Array<{
      __typename: "CategoryEdge";
      node: {
        __typename: "Category";
        id: string;
        name: string;
        slug: string;
      } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type CategoryDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CategoryDetailsQuery = {
  __typename: "Query";
  category: {
    __typename: "Category";
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type ProviderCreateMutationVariables = Exact<{
  input: ProviderInput;
}>;

export type ProviderCreateMutation = {
  __typename: "Mutation";
  providerCreate: {
    __typename: "ProviderCreate";
    provider: {
      __typename: "Provider";
      id: string;
      name: string;
      slug: string;
      documentNumber: string;
      isPublished: boolean;
      segment: { __typename: "Segment"; id: string; name: string };
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type ProviderUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
  input: ProviderInput;
}>;

export type ProviderUpdateMutation = {
  __typename: "Mutation";
  providerUpdate: {
    __typename: "ProviderUpdate";
    provider: {
      __typename: "Provider";
      id: string;
      name: string;
      slug: string;
      documentNumber: string;
      isPublished: boolean;
      segment: { __typename: "Segment"; id: string; name: string };
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type ProviderDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ProviderDeleteMutation = {
  __typename: "Mutation";
  providerDelete: {
    __typename: "ProviderDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type ProviderBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type ProviderBulkDeleteMutation = {
  __typename: "Mutation";
  providerBulkDelete: {
    __typename: "ProviderBulkDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type ProvidersQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  segment?: InputMaybe<Scalars["ID"]>;
}>;

export type ProvidersQuery = {
  __typename: "Query";
  providers: {
    __typename: "ProviderConnection";
    edges: Array<{
      __typename: "ProviderEdge";
      node: {
        __typename: "Provider";
        id: string;
        name: string;
        slug: string;
        isPublished: boolean;
        segment: { __typename: "Segment"; id: string; name: string };
      } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type ProviderDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ProviderDetailsQuery = {
  __typename: "Query";
  provider: {
    __typename: "Provider";
    id: string;
    name: string;
    slug: string;
    documentNumber: string;
    isPublished: boolean;
    segment: { __typename: "Segment"; id: string; name: string };
  } | null;
};

export type SegmentCreateMutationVariables = Exact<{
  input: SegmentInput;
}>;

export type SegmentCreateMutation = {
  __typename: "Mutation";
  segmentCreate: {
    __typename: "SegmentCreate";
    segment: {
      __typename: "Segment";
      id: string;
      name: string;
      slug: string;
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type SegmentUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
  input: SegmentInput;
}>;

export type SegmentUpdateMutation = {
  __typename: "Mutation";
  segmentUpdate: {
    __typename: "SegmentUpdate";
    segment: {
      __typename: "Segment";
      id: string;
      name: string;
      slug: string;
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type SegmentDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SegmentDeleteMutation = {
  __typename: "Mutation";
  segmentDelete: {
    __typename: "SegmentDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type SegmentBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type SegmentBulkDeleteMutation = {
  __typename: "Mutation";
  segmentBulkDelete: {
    __typename: "SegmentBulkDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type SegmentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
}>;

export type SegmentsQuery = {
  __typename: "Query";
  segments: {
    __typename: "SegmentConnection";
    edges: Array<{
      __typename: "SegmentEdge";
      node: {
        __typename: "Segment";
        id: string;
        name: string;
        slug: string;
      } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type SegmentDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SegmentDetailsQuery = {
  __typename: "Query";
  segment: {
    __typename: "Segment";
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type SessionBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type SessionBulkDeleteMutation = {
  __typename: "Mutation";
  sessionBulkDelete: {
    __typename: "SessionBulkDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type SessionsQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
}>;

export type SessionsQuery = {
  __typename: "Query";
  sessions: {
    __typename: "SessionConnection";
    edges: Array<{
      __typename: "SessionEdge";
      node: {
        __typename: "Session";
        id: string;
        name: string;
        slug: string;
        date: any;
        time: any;
        isPublished: boolean;
      } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type VehicleCreateMutationVariables = Exact<{
  input: VehicleInput;
}>;

export type VehicleCreateMutation = {
  __typename: "Mutation";
  vehicleCreate: {
    __typename: "VehicleCreate";
    vehicle: {
      __typename: "Vehicle";
      id: string;
      name: string;
      slug: string;
      documentNumber: string;
      isPublished: boolean;
      category: { __typename: "Category"; id: string; name: string };
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type VehicleUpdateMutationVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
  input: VehicleInput;
}>;

export type VehicleUpdateMutation = {
  __typename: "Mutation";
  vehicleUpdate: {
    __typename: "VehicleUpdate";
    vehicle: {
      __typename: "Vehicle";
      id: string;
      name: string;
      slug: string;
      documentNumber: string;
      isPublished: boolean;
      category: { __typename: "Category"; id: string; name: string };
    } | null;
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type VehicleDeleteMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type VehicleDeleteMutation = {
  __typename: "Mutation";
  vehicleDelete: {
    __typename: "VehicleDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type VehicleBulkDeleteMutationVariables = Exact<{
  ids: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type VehicleBulkDeleteMutation = {
  __typename: "Mutation";
  vehicleBulkDelete: {
    __typename: "VehicleBulkDelete";
    errors: Array<{
      __typename: "Error";
      code: string | null;
      field: string | null;
      message: string | null;
    }>;
  } | null;
};

export type VehiclesQueryVariables = Exact<{
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]>;
  category?: InputMaybe<Scalars["ID"]>;
}>;

export type VehiclesQuery = {
  __typename: "Query";
  vehicles: {
    __typename: "VehicleConnection";
    edges: Array<{
      __typename: "VehicleEdge";
      node: {
        __typename: "Vehicle";
        id: string;
        name: string;
        slug: string;
        isPublished: boolean;
        category: { __typename: "Category"; id: string; name: string };
      } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type VehicleDetailsQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type VehicleDetailsQuery = {
  __typename: "Query";
  vehicle: {
    __typename: "Vehicle";
    id: string;
    name: string;
    slug: string;
    documentNumber: string;
    isPublished: boolean;
    category: { __typename: "Category"; id: string; name: string };
  } | null;
};

export type UserFragment = {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
};

export type UserBaseFragment = {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
};

export type CategoryFragment = {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
};

export type ErrorFragment = {
  __typename: "Error";
  code: string | null;
  field: string | null;
  message: string | null;
};

export type PageInfoFragment = {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
};

export type ProviderFragment = {
  __typename: "Provider";
  id: string;
  name: string;
  slug: string;
  isPublished: boolean;
  segment: { __typename: "Segment"; id: string; name: string };
};

export type ProviderDetailsFragment = {
  __typename: "Provider";
  id: string;
  name: string;
  slug: string;
  documentNumber: string;
  isPublished: boolean;
  segment: { __typename: "Segment"; id: string; name: string };
};

export type SegmentFragment = {
  __typename: "Segment";
  id: string;
  name: string;
  slug: string;
};

export type SessionFragment = {
  __typename: "Session";
  id: string;
  name: string;
  slug: string;
  date: any;
  time: any;
  isPublished: boolean;
};

export type VehicleFragment = {
  __typename: "Vehicle";
  id: string;
  name: string;
  slug: string;
  isPublished: boolean;
  category: { __typename: "Category"; id: string; name: string };
};

export type VehicleDetailsFragment = {
  __typename: "Vehicle";
  id: string;
  name: string;
  slug: string;
  documentNumber: string;
  isPublished: boolean;
  category: { __typename: "Category"; id: string; name: string };
};

export type SearchCategoriesQueryVariables = Exact<{
  after?: InputMaybe<Scalars["String"]>;
  first: Scalars["Int"];
  query: Scalars["String"];
}>;

export type SearchCategoriesQuery = {
  __typename: "Query";
  search: {
    __typename: "CategoryConnection";
    edges: Array<{
      __typename: "CategoryEdge";
      node: { __typename: "Category"; id: string; name: string } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};

export type SearchSegmentsQueryVariables = Exact<{
  after?: InputMaybe<Scalars["String"]>;
  first: Scalars["Int"];
  query: Scalars["String"];
}>;

export type SearchSegmentsQuery = {
  __typename: "Query";
  search: {
    __typename: "SegmentConnection";
    edges: Array<{
      __typename: "SegmentEdge";
      node: { __typename: "Segment"; id: string; name: string } | null;
    } | null>;
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
    };
  } | null;
};
