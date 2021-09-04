/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTwitterAccountInput = {
  id?: string | null
  userId: string
  twitterToken?: string | null
  twitterSecretToken?: string | null
  twitterUserId: string
}

export type ModelTwitterAccountConditionInput = {
  userId?: ModelStringInput | null
  twitterToken?: ModelStringInput | null
  twitterSecretToken?: ModelStringInput | null
  twitterUserId?: ModelStringInput | null
  and?: Array<ModelTwitterAccountConditionInput | null> | null
  or?: Array<ModelTwitterAccountConditionInput | null> | null
  not?: ModelTwitterAccountConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type TwitterAccount = {
  __typename: "TwitterAccount"
  id: string
  userId: string
  twitterToken?: string | null
  twitterSecretToken?: string | null
  twitterUser?: TwitterUser | null
  twitterUserId: string
  createdAt: string
  updatedAt: string
}

export type TwitterUser = {
  __typename: "TwitterUser"
  twitterId: string
  twitterBio?: string | null
  twitterUsername?: string | null
  createdAt: string
  updatedAt: string
}

export type UpdateTwitterAccountInput = {
  id: string
  userId?: string | null
  twitterToken?: string | null
  twitterSecretToken?: string | null
  twitterUserId?: string | null
}

export type DeleteTwitterAccountInput = {
  id: string
}

export type CreateTwitterUserInput = {
  twitterId: string
  twitterBio?: string | null
  twitterUsername?: string | null
}

export type ModelTwitterUserConditionInput = {
  twitterBio?: ModelStringInput | null
  twitterUsername?: ModelStringInput | null
  and?: Array<ModelTwitterUserConditionInput | null> | null
  or?: Array<ModelTwitterUserConditionInput | null> | null
  not?: ModelTwitterUserConditionInput | null
}

export type UpdateTwitterUserInput = {
  twitterId: string
  twitterBio?: string | null
  twitterUsername?: string | null
}

export type DeleteTwitterUserInput = {
  twitterId: string
}

export type CreateRelationshipInput = {
  id?: string | null
  twitterAccountId: string
  twitterUserId: string
  relationshipType: RelationshipType
}

export enum RelationshipType {
  follower = "follower",
  following = "following",
  mutual = "mutual",
}

export type ModelRelationshipConditionInput = {
  twitterAccountId?: ModelIDInput | null
  twitterUserId?: ModelStringInput | null
  relationshipType?: ModelRelationshipTypeInput | null
  and?: Array<ModelRelationshipConditionInput | null> | null
  or?: Array<ModelRelationshipConditionInput | null> | null
  not?: ModelRelationshipConditionInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type ModelRelationshipTypeInput = {
  eq?: RelationshipType | null
  ne?: RelationshipType | null
}

export type Relationship = {
  __typename: "Relationship"
  id: string
  twitterAccountId: string
  twitterAccount?: TwitterAccount | null
  twitterUser?: TwitterUser | null
  twitterUserId: string
  relationshipType: RelationshipType
  createdAt: string
  updatedAt: string
}

export type UpdateRelationshipInput = {
  id: string
  twitterAccountId?: string | null
  twitterUserId?: string | null
  relationshipType?: RelationshipType | null
}

export type DeleteRelationshipInput = {
  id: string
}

export type CreateTwitterDataPullInput = {
  id?: string | null
  twitterAccountId: string
  relationshipType?: RelationshipType | null
  paginationToken?: string | null
}

export type ModelTwitterDataPullConditionInput = {
  twitterAccountId?: ModelIDInput | null
  relationshipType?: ModelRelationshipTypeInput | null
  paginationToken?: ModelStringInput | null
  and?: Array<ModelTwitterDataPullConditionInput | null> | null
  or?: Array<ModelTwitterDataPullConditionInput | null> | null
  not?: ModelTwitterDataPullConditionInput | null
}

export type TwitterDataPull = {
  __typename: "TwitterDataPull"
  id: string
  twitterAccount?: TwitterAccount | null
  twitterAccountId: string
  relationshipType?: RelationshipType | null
  paginationToken?: string | null
  createdAt: string
  updatedAt: string
}

export type UpdateTwitterDataPullInput = {
  id: string
  twitterAccountId?: string | null
  relationshipType?: RelationshipType | null
  paginationToken?: string | null
}

export type DeleteTwitterDataPullInput = {
  id: string
}

export type ModelTwitterAccountFilterInput = {
  id?: ModelIDInput | null
  userId?: ModelStringInput | null
  twitterToken?: ModelStringInput | null
  twitterSecretToken?: ModelStringInput | null
  twitterUserId?: ModelStringInput | null
  and?: Array<ModelTwitterAccountFilterInput | null> | null
  or?: Array<ModelTwitterAccountFilterInput | null> | null
  not?: ModelTwitterAccountFilterInput | null
}

export type ModelTwitterAccountConnection = {
  __typename: "ModelTwitterAccountConnection"
  items?: Array<TwitterAccount | null> | null
  nextToken?: string | null
}

export type ModelTwitterUserFilterInput = {
  twitterId?: ModelStringInput | null
  twitterBio?: ModelStringInput | null
  twitterUsername?: ModelStringInput | null
  and?: Array<ModelTwitterUserFilterInput | null> | null
  or?: Array<ModelTwitterUserFilterInput | null> | null
  not?: ModelTwitterUserFilterInput | null
}

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelTwitterUserConnection = {
  __typename: "ModelTwitterUserConnection"
  items?: Array<TwitterUser | null> | null
  nextToken?: string | null
}

export type ModelRelationshipFilterInput = {
  id?: ModelIDInput | null
  twitterAccountId?: ModelIDInput | null
  twitterUserId?: ModelStringInput | null
  relationshipType?: ModelRelationshipTypeInput | null
  and?: Array<ModelRelationshipFilterInput | null> | null
  or?: Array<ModelRelationshipFilterInput | null> | null
  not?: ModelRelationshipFilterInput | null
}

export type ModelRelationshipConnection = {
  __typename: "ModelRelationshipConnection"
  items?: Array<Relationship | null> | null
  nextToken?: string | null
}

export type ModelTwitterDataPullFilterInput = {
  id?: ModelIDInput | null
  twitterAccountId?: ModelIDInput | null
  relationshipType?: ModelRelationshipTypeInput | null
  paginationToken?: ModelStringInput | null
  and?: Array<ModelTwitterDataPullFilterInput | null> | null
  or?: Array<ModelTwitterDataPullFilterInput | null> | null
  not?: ModelTwitterDataPullFilterInput | null
}

export type ModelTwitterDataPullConnection = {
  __typename: "ModelTwitterDataPullConnection"
  items?: Array<TwitterDataPull | null> | null
  nextToken?: string | null
}

export type CreateTwitterAccountMutationVariables = {
  input: CreateTwitterAccountInput
  condition?: ModelTwitterAccountConditionInput | null
}

export type CreateTwitterAccountMutation = {
  createTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateTwitterAccountMutationVariables = {
  input: UpdateTwitterAccountInput
  condition?: ModelTwitterAccountConditionInput | null
}

export type UpdateTwitterAccountMutation = {
  updateTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteTwitterAccountMutationVariables = {
  input: DeleteTwitterAccountInput
  condition?: ModelTwitterAccountConditionInput | null
}

export type DeleteTwitterAccountMutation = {
  deleteTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateTwitterUserMutationVariables = {
  input: CreateTwitterUserInput
  condition?: ModelTwitterUserConditionInput | null
}

export type CreateTwitterUserMutation = {
  createTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateTwitterUserMutationVariables = {
  input: UpdateTwitterUserInput
  condition?: ModelTwitterUserConditionInput | null
}

export type UpdateTwitterUserMutation = {
  updateTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteTwitterUserMutationVariables = {
  input: DeleteTwitterUserInput
  condition?: ModelTwitterUserConditionInput | null
}

export type DeleteTwitterUserMutation = {
  deleteTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateRelationshipMutationVariables = {
  input: CreateRelationshipInput
  condition?: ModelRelationshipConditionInput | null
}

export type CreateRelationshipMutation = {
  createRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateRelationshipMutationVariables = {
  input: UpdateRelationshipInput
  condition?: ModelRelationshipConditionInput | null
}

export type UpdateRelationshipMutation = {
  updateRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteRelationshipMutationVariables = {
  input: DeleteRelationshipInput
  condition?: ModelRelationshipConditionInput | null
}

export type DeleteRelationshipMutation = {
  deleteRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateTwitterDataPullMutationVariables = {
  input: CreateTwitterDataPullInput
  condition?: ModelTwitterDataPullConditionInput | null
}

export type CreateTwitterDataPullMutation = {
  createTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateTwitterDataPullMutationVariables = {
  input: UpdateTwitterDataPullInput
  condition?: ModelTwitterDataPullConditionInput | null
}

export type UpdateTwitterDataPullMutation = {
  updateTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteTwitterDataPullMutationVariables = {
  input: DeleteTwitterDataPullInput
  condition?: ModelTwitterDataPullConditionInput | null
}

export type DeleteTwitterDataPullMutation = {
  deleteTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type GetTwitterAccountQueryVariables = {
  id: string
}

export type GetTwitterAccountQuery = {
  getTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type ListTwitterAccountsQueryVariables = {
  filter?: ModelTwitterAccountFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListTwitterAccountsQuery = {
  listTwitterAccounts?: {
    __typename: "ModelTwitterAccountConnection"
    items?: Array<{
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetTwitterUserQueryVariables = {
  twitterId: string
}

export type GetTwitterUserQuery = {
  getTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListTwitterUsersQueryVariables = {
  twitterId?: string | null
  filter?: ModelTwitterUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
  sortDirection?: ModelSortDirection | null
}

export type ListTwitterUsersQuery = {
  listTwitterUsers?: {
    __typename: "ModelTwitterUserConnection"
    items?: Array<{
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetRelationshipQueryVariables = {
  id: string
}

export type GetRelationshipQuery = {
  getRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type ListRelationshipsQueryVariables = {
  filter?: ModelRelationshipFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListRelationshipsQuery = {
  listRelationships?: {
    __typename: "ModelRelationshipConnection"
    items?: Array<{
      __typename: "Relationship"
      id: string
      twitterAccountId: string
      twitterAccount?: {
        __typename: "TwitterAccount"
        id: string
        userId: string
        twitterToken?: string | null
        twitterSecretToken?: string | null
        twitterUserId: string
        createdAt: string
        updatedAt: string
      } | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      relationshipType: RelationshipType
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetTwitterDataPullQueryVariables = {
  id: string
}

export type GetTwitterDataPullQuery = {
  getTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListTwitterDataPullsQueryVariables = {
  filter?: ModelTwitterDataPullFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListTwitterDataPullsQuery = {
  listTwitterDataPulls?: {
    __typename: "ModelTwitterDataPullConnection"
    items?: Array<{
      __typename: "TwitterDataPull"
      id: string
      twitterAccount?: {
        __typename: "TwitterAccount"
        id: string
        userId: string
        twitterToken?: string | null
        twitterSecretToken?: string | null
        twitterUserId: string
        createdAt: string
        updatedAt: string
      } | null
      twitterAccountId: string
      relationshipType?: RelationshipType | null
      paginationToken?: string | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type OnCreateTwitterAccountSubscription = {
  onCreateTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateTwitterAccountSubscription = {
  onUpdateTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteTwitterAccountSubscription = {
  onDeleteTwitterAccount?: {
    __typename: "TwitterAccount"
    id: string
    userId: string
    twitterToken?: string | null
    twitterSecretToken?: string | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateTwitterUserSubscription = {
  onCreateTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateTwitterUserSubscription = {
  onUpdateTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteTwitterUserSubscription = {
  onDeleteTwitterUser?: {
    __typename: "TwitterUser"
    twitterId: string
    twitterBio?: string | null
    twitterUsername?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateRelationshipSubscription = {
  onCreateRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateRelationshipSubscription = {
  onUpdateRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteRelationshipSubscription = {
  onDeleteRelationship?: {
    __typename: "Relationship"
    id: string
    twitterAccountId: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterUser?: {
      __typename: "TwitterUser"
      twitterId: string
      twitterBio?: string | null
      twitterUsername?: string | null
      createdAt: string
      updatedAt: string
    } | null
    twitterUserId: string
    relationshipType: RelationshipType
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateTwitterDataPullSubscription = {
  onCreateTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateTwitterDataPullSubscription = {
  onUpdateTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteTwitterDataPullSubscription = {
  onDeleteTwitterDataPull?: {
    __typename: "TwitterDataPull"
    id: string
    twitterAccount?: {
      __typename: "TwitterAccount"
      id: string
      userId: string
      twitterToken?: string | null
      twitterSecretToken?: string | null
      twitterUser?: {
        __typename: "TwitterUser"
        twitterId: string
        twitterBio?: string | null
        twitterUsername?: string | null
        createdAt: string
        updatedAt: string
      } | null
      twitterUserId: string
      createdAt: string
      updatedAt: string
    } | null
    twitterAccountId: string
    relationshipType?: RelationshipType | null
    paginationToken?: string | null
    createdAt: string
    updatedAt: string
  } | null
}
