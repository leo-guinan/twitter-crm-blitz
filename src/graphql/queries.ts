/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      twitterToken
      twitterSecretToken
      twitterId
      name
      email
      hashedPassword
      role
      tokens {
        items {
          id
          hashedToken
          type
          expiresAt
          sentTo
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      sessions {
        items {
          id
          expiresAt
          handle
          hashedSessionToken
          antiCSRFToken
          publicData
          privateData
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        twitterToken
        twitterSecretToken
        twitterId
        name
        email
        hashedPassword
        role
        tokens {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      expiresAt
      handle
      hashedSessionToken
      antiCSRFToken
      publicData
      privateData
      userId
      user {
        id
        username
        twitterToken
        twitterSecretToken
        twitterId
        name
        email
        hashedPassword
        role
        tokens {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const listSessions = /* GraphQL */ `
  query ListSessions($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        expiresAt
        handle
        hashedSessionToken
        antiCSRFToken
        publicData
        privateData
        userId
        user {
          id
          username
          twitterToken
          twitterSecretToken
          twitterId
          name
          email
          hashedPassword
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getToken = /* GraphQL */ `
  query GetToken($id: ID!) {
    getToken(id: $id) {
      id
      hashedToken
      type
      expiresAt
      sentTo
      userId
      user {
        id
        username
        twitterToken
        twitterSecretToken
        twitterId
        name
        email
        hashedPassword
        role
        tokens {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const listTokens = /* GraphQL */ `
  query ListTokens($filter: ModelTokenFilterInput, $limit: Int, $nextToken: String) {
    listTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        hashedToken
        type
        expiresAt
        sentTo
        userId
        user {
          id
          username
          twitterToken
          twitterSecretToken
          twitterId
          name
          email
          hashedPassword
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getTwitterUser = /* GraphQL */ `
  query GetTwitterUser($twitterId: String!) {
    getTwitterUser(twitterId: $twitterId) {
      username
      name
      bio
      profilePictureUrl
      twitterId
      createdAt
      updatedAt
    }
  }
`
export const listTwitterUsers = /* GraphQL */ `
  query ListTwitterUsers(
    $twitterId: String
    $filter: ModelTwitterUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTwitterUsers(
      twitterId: $twitterId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        name
        bio
        profilePictureUrl
        twitterId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getRelationship = /* GraphQL */ `
  query GetRelationship($user1TwitterId: String!, $user2TwitterId: String!) {
    getRelationship(user1TwitterId: $user1TwitterId, user2TwitterId: $user2TwitterId) {
      user1 {
        username
        name
        bio
        profilePictureUrl
        twitterId
        createdAt
        updatedAt
      }
      user1TwitterId
      user2 {
        username
        name
        bio
        profilePictureUrl
        twitterId
        createdAt
        updatedAt
      }
      user2TwitterId
      type
      createdAt
      updatedAt
    }
  }
`
export const listRelationships = /* GraphQL */ `
  query ListRelationships(
    $user1TwitterId: String
    $user2TwitterId: ModelStringKeyConditionInput
    $filter: ModelRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRelationships(
      user1TwitterId: $user1TwitterId
      user2TwitterId: $user2TwitterId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user1 {
          username
          name
          bio
          profilePictureUrl
          twitterId
          createdAt
          updatedAt
        }
        user1TwitterId
        user2 {
          username
          name
          bio
          profilePictureUrl
          twitterId
          createdAt
          updatedAt
        }
        user2TwitterId
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
