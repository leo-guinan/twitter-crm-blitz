/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null
  username: string
  twitterToken: string
  twitterSecretToken: string
  twitterId: string
  name?: string | null
  email?: string | null
  hashedPassword?: string | null
  role?: string | null
}

export type ModelUserConditionInput = {
  username?: ModelStringInput | null
  twitterToken?: ModelStringInput | null
  twitterSecretToken?: ModelStringInput | null
  twitterId?: ModelStringInput | null
  name?: ModelStringInput | null
  email?: ModelStringInput | null
  hashedPassword?: ModelStringInput | null
  role?: ModelStringInput | null
  and?: Array<ModelUserConditionInput | null> | null
  or?: Array<ModelUserConditionInput | null> | null
  not?: ModelUserConditionInput | null
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

export type User = {
  __typename: "User"
  id: string
  username: string
  twitterToken: string
  twitterSecretToken: string
  twitterId: string
  name?: string | null
  email?: string | null
  hashedPassword?: string | null
  role?: string | null
  tokens?: ModelTokenConnection | null
  sessions?: ModelSessionConnection | null
  createdAt: string
  updatedAt: string
}

export type ModelTokenConnection = {
  __typename: "ModelTokenConnection"
  items?: Array<Token | null> | null
  nextToken?: string | null
}

export type Token = {
  __typename: "Token"
  id: string
  hashedToken: string
  type: string
  expiresAt: string
  sentTo: string
  userId: string
  user: User
  createdAt: string
  updatedAt: string
}

export type ModelSessionConnection = {
  __typename: "ModelSessionConnection"
  items?: Array<Session | null> | null
  nextToken?: string | null
}

export type Session = {
  __typename: "Session"
  id: string
  expiresAt: string
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
  userId?: string | null
  user?: User | null
  createdAt: string
  updatedAt: string
}

export type UpdateUserInput = {
  id: string
  username?: string | null
  twitterToken?: string | null
  twitterSecretToken?: string | null
  twitterId?: string | null
  name?: string | null
  email?: string | null
  hashedPassword?: string | null
  role?: string | null
}

export type DeleteUserInput = {
  id: string
}

export type CreateSessionInput = {
  id?: string | null
  expiresAt: string
  handle: string
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
  userId?: string | null
}

export type ModelSessionConditionInput = {
  expiresAt?: ModelStringInput | null
  handle?: ModelStringInput | null
  hashedSessionToken?: ModelStringInput | null
  antiCSRFToken?: ModelStringInput | null
  publicData?: ModelStringInput | null
  privateData?: ModelStringInput | null
  userId?: ModelIDInput | null
  and?: Array<ModelSessionConditionInput | null> | null
  or?: Array<ModelSessionConditionInput | null> | null
  not?: ModelSessionConditionInput | null
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

export type UpdateSessionInput = {
  id: string
  expiresAt?: string | null
  handle?: string | null
  hashedSessionToken?: string | null
  antiCSRFToken?: string | null
  publicData?: string | null
  privateData?: string | null
  userId?: string | null
}

export type DeleteSessionInput = {
  id: string
}

export type CreateTokenInput = {
  id?: string | null
  hashedToken: string
  type: string
  expiresAt: string
  sentTo: string
  userId: string
}

export type ModelTokenConditionInput = {
  hashedToken?: ModelStringInput | null
  type?: ModelStringInput | null
  expiresAt?: ModelStringInput | null
  sentTo?: ModelStringInput | null
  userId?: ModelIDInput | null
  and?: Array<ModelTokenConditionInput | null> | null
  or?: Array<ModelTokenConditionInput | null> | null
  not?: ModelTokenConditionInput | null
}

export type UpdateTokenInput = {
  id: string
  hashedToken?: string | null
  type?: string | null
  expiresAt?: string | null
  sentTo?: string | null
  userId?: string | null
}

export type DeleteTokenInput = {
  id: string
}

export type CreateTwitterUserInput = {
  username: string
  name: string
  bio: string
  profilePictureUrl: string
  twitterId: string
}

export type ModelTwitterUserConditionInput = {
  username?: ModelStringInput | null
  name?: ModelStringInput | null
  bio?: ModelStringInput | null
  profilePictureUrl?: ModelStringInput | null
  and?: Array<ModelTwitterUserConditionInput | null> | null
  or?: Array<ModelTwitterUserConditionInput | null> | null
  not?: ModelTwitterUserConditionInput | null
}

export type TwitterUser = {
  __typename: "TwitterUser"
  username: string
  name: string
  bio: string
  profilePictureUrl: string
  twitterId: string
  createdAt: string
  updatedAt: string
}

export type UpdateTwitterUserInput = {
  username?: string | null
  name?: string | null
  bio?: string | null
  profilePictureUrl?: string | null
  twitterId: string
}

export type DeleteTwitterUserInput = {
  twitterId: string
}

export type CreateRelationshipInput = {
  user1TwitterId: string
  user2TwitterId: string
  type: string
}

export type ModelRelationshipConditionInput = {
  type?: ModelStringInput | null
  and?: Array<ModelRelationshipConditionInput | null> | null
  or?: Array<ModelRelationshipConditionInput | null> | null
  not?: ModelRelationshipConditionInput | null
}

export type Relationship = {
  __typename: "Relationship"
  user1?: TwitterUser | null
  user1TwitterId: string
  user2?: TwitterUser | null
  user2TwitterId: string
  type: string
  createdAt: string
  updatedAt: string
}

export type UpdateRelationshipInput = {
  user1TwitterId: string
  user2TwitterId: string
  type?: string | null
}

export type DeleteRelationshipInput = {
  user1TwitterId: string
  user2TwitterId: string
}

export type ModelUserFilterInput = {
  id?: ModelIDInput | null
  username?: ModelStringInput | null
  twitterToken?: ModelStringInput | null
  twitterSecretToken?: ModelStringInput | null
  twitterId?: ModelStringInput | null
  name?: ModelStringInput | null
  email?: ModelStringInput | null
  hashedPassword?: ModelStringInput | null
  role?: ModelStringInput | null
  and?: Array<ModelUserFilterInput | null> | null
  or?: Array<ModelUserFilterInput | null> | null
  not?: ModelUserFilterInput | null
}

export type ModelUserConnection = {
  __typename: "ModelUserConnection"
  items?: Array<User | null> | null
  nextToken?: string | null
}

export type ModelSessionFilterInput = {
  id?: ModelIDInput | null
  expiresAt?: ModelStringInput | null
  handle?: ModelStringInput | null
  hashedSessionToken?: ModelStringInput | null
  antiCSRFToken?: ModelStringInput | null
  publicData?: ModelStringInput | null
  privateData?: ModelStringInput | null
  userId?: ModelIDInput | null
  and?: Array<ModelSessionFilterInput | null> | null
  or?: Array<ModelSessionFilterInput | null> | null
  not?: ModelSessionFilterInput | null
}

export type ModelTokenFilterInput = {
  id?: ModelIDInput | null
  hashedToken?: ModelStringInput | null
  type?: ModelStringInput | null
  expiresAt?: ModelStringInput | null
  sentTo?: ModelStringInput | null
  userId?: ModelIDInput | null
  and?: Array<ModelTokenFilterInput | null> | null
  or?: Array<ModelTokenFilterInput | null> | null
  not?: ModelTokenFilterInput | null
}

export type ModelTwitterUserFilterInput = {
  username?: ModelStringInput | null
  name?: ModelStringInput | null
  bio?: ModelStringInput | null
  profilePictureUrl?: ModelStringInput | null
  twitterId?: ModelStringInput | null
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

export type ModelStringKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelRelationshipFilterInput = {
  user1TwitterId?: ModelStringInput | null
  user2TwitterId?: ModelStringInput | null
  type?: ModelStringInput | null
  and?: Array<ModelRelationshipFilterInput | null> | null
  or?: Array<ModelRelationshipFilterInput | null> | null
  not?: ModelRelationshipFilterInput | null
}

export type ModelRelationshipConnection = {
  __typename: "ModelRelationshipConnection"
  items?: Array<Relationship | null> | null
  nextToken?: string | null
}

export type CreateUserMutationVariables = {
  input: CreateUserInput
  condition?: ModelUserConditionInput | null
}

export type CreateUserMutation = {
  createUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateUserMutationVariables = {
  input: UpdateUserInput
  condition?: ModelUserConditionInput | null
}

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteUserMutationVariables = {
  input: DeleteUserInput
  condition?: ModelUserConditionInput | null
}

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateSessionMutationVariables = {
  input: CreateSessionInput
  condition?: ModelSessionConditionInput | null
}

export type CreateSessionMutation = {
  createSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateSessionMutationVariables = {
  input: UpdateSessionInput
  condition?: ModelSessionConditionInput | null
}

export type UpdateSessionMutation = {
  updateSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteSessionMutationVariables = {
  input: DeleteSessionInput
  condition?: ModelSessionConditionInput | null
}

export type DeleteSessionMutation = {
  deleteSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateTokenMutationVariables = {
  input: CreateTokenInput
  condition?: ModelTokenConditionInput | null
}

export type CreateTokenMutation = {
  createToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateTokenMutationVariables = {
  input: UpdateTokenInput
  condition?: ModelTokenConditionInput | null
}

export type UpdateTokenMutation = {
  updateToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteTokenMutationVariables = {
  input: DeleteTokenInput
  condition?: ModelTokenConditionInput | null
}

export type DeleteTokenMutation = {
  deleteToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
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
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
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
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
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
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
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
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
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
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
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
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
    createdAt: string
    updatedAt: string
  } | null
}

export type GetUserQueryVariables = {
  id: string
}

export type GetUserQuery = {
  getUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection"
    items?: Array<{
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetSessionQueryVariables = {
  id: string
}

export type GetSessionQuery = {
  getSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListSessionsQueryVariables = {
  filter?: ModelSessionFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListSessionsQuery = {
  listSessions?: {
    __typename: "ModelSessionConnection"
    items?: Array<{
      __typename: "Session"
      id: string
      expiresAt: string
      handle: string
      hashedSessionToken?: string | null
      antiCSRFToken?: string | null
      publicData?: string | null
      privateData?: string | null
      userId?: string | null
      user?: {
        __typename: "User"
        id: string
        username: string
        twitterToken: string
        twitterSecretToken: string
        twitterId: string
        name?: string | null
        email?: string | null
        hashedPassword?: string | null
        role?: string | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetTokenQueryVariables = {
  id: string
}

export type GetTokenQuery = {
  getToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type ListTokensQueryVariables = {
  filter?: ModelTokenFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListTokensQuery = {
  listTokens?: {
    __typename: "ModelTokenConnection"
    items?: Array<{
      __typename: "Token"
      id: string
      hashedToken: string
      type: string
      expiresAt: string
      sentTo: string
      userId: string
      user: {
        __typename: "User"
        id: string
        username: string
        twitterToken: string
        twitterSecretToken: string
        twitterId: string
        name?: string | null
        email?: string | null
        hashedPassword?: string | null
        role?: string | null
        createdAt: string
        updatedAt: string
      }
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
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
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
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetRelationshipQueryVariables = {
  user1TwitterId: string
  user2TwitterId: string
}

export type GetRelationshipQuery = {
  getRelationship?: {
    __typename: "Relationship"
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
    createdAt: string
    updatedAt: string
  } | null
}

export type ListRelationshipsQueryVariables = {
  user1TwitterId?: string | null
  user2TwitterId?: ModelStringKeyConditionInput | null
  filter?: ModelRelationshipFilterInput | null
  limit?: number | null
  nextToken?: string | null
  sortDirection?: ModelSortDirection | null
}

export type ListRelationshipsQuery = {
  listRelationships?: {
    __typename: "ModelRelationshipConnection"
    items?: Array<{
      __typename: "Relationship"
      user1?: {
        __typename: "TwitterUser"
        username: string
        name: string
        bio: string
        profilePictureUrl: string
        twitterId: string
        createdAt: string
        updatedAt: string
      } | null
      user1TwitterId: string
      user2?: {
        __typename: "TwitterUser"
        username: string
        name: string
        bio: string
        profilePictureUrl: string
        twitterId: string
        createdAt: string
        updatedAt: string
      } | null
      user2TwitterId: string
      type: string
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: "User"
    id: string
    username: string
    twitterToken: string
    twitterSecretToken: string
    twitterId: string
    name?: string | null
    email?: string | null
    hashedPassword?: string | null
    role?: string | null
    tokens?: {
      __typename: "ModelTokenConnection"
      items?: Array<{
        __typename: "Token"
        id: string
        hashedToken: string
        type: string
        expiresAt: string
        sentTo: string
        userId: string
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    sessions?: {
      __typename: "ModelSessionConnection"
      items?: Array<{
        __typename: "Session"
        id: string
        expiresAt: string
        handle: string
        hashedSessionToken?: string | null
        antiCSRFToken?: string | null
        publicData?: string | null
        privateData?: string | null
        userId?: string | null
        createdAt: string
        updatedAt: string
      } | null> | null
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateSessionSubscription = {
  onCreateSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateSessionSubscription = {
  onUpdateSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteSessionSubscription = {
  onDeleteSession?: {
    __typename: "Session"
    id: string
    expiresAt: string
    handle: string
    hashedSessionToken?: string | null
    antiCSRFToken?: string | null
    publicData?: string | null
    privateData?: string | null
    userId?: string | null
    user?: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateTokenSubscription = {
  onCreateToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateTokenSubscription = {
  onUpdateToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteTokenSubscription = {
  onDeleteToken?: {
    __typename: "Token"
    id: string
    hashedToken: string
    type: string
    expiresAt: string
    sentTo: string
    userId: string
    user: {
      __typename: "User"
      id: string
      username: string
      twitterToken: string
      twitterSecretToken: string
      twitterId: string
      name?: string | null
      email?: string | null
      hashedPassword?: string | null
      role?: string | null
      tokens?: {
        __typename: "ModelTokenConnection"
        nextToken?: string | null
      } | null
      sessions?: {
        __typename: "ModelSessionConnection"
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    }
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateTwitterUserSubscription = {
  onCreateTwitterUser?: {
    __typename: "TwitterUser"
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateTwitterUserSubscription = {
  onUpdateTwitterUser?: {
    __typename: "TwitterUser"
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteTwitterUserSubscription = {
  onDeleteTwitterUser?: {
    __typename: "TwitterUser"
    username: string
    name: string
    bio: string
    profilePictureUrl: string
    twitterId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateRelationshipSubscription = {
  onCreateRelationship?: {
    __typename: "Relationship"
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateRelationshipSubscription = {
  onUpdateRelationship?: {
    __typename: "Relationship"
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteRelationshipSubscription = {
  onDeleteRelationship?: {
    __typename: "Relationship"
    user1?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user1TwitterId: string
    user2?: {
      __typename: "TwitterUser"
      username: string
      name: string
      bio: string
      profilePictureUrl: string
      twitterId: string
      createdAt: string
      updatedAt: string
    } | null
    user2TwitterId: string
    type: string
    createdAt: string
    updatedAt: string
  } | null
}
