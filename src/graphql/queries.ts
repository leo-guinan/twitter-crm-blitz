/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTwitterAccount = /* GraphQL */ `
  query GetTwitterAccount($id: ID!) {
    getTwitterAccount(id: $id) {
      id
      userId
      twitterToken
      twitterSecretToken
      twitterUser {
        twitterId
        twitterBio
        twitterUsername
        createdAt
        updatedAt
      }
      twitterUserId
      createdAt
      updatedAt
    }
  }
`
export const listTwitterAccounts = /* GraphQL */ `
  query ListTwitterAccounts(
    $filter: ModelTwitterAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTwitterAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        twitterToken
        twitterSecretToken
        twitterUser {
          twitterId
          twitterBio
          twitterUsername
          createdAt
          updatedAt
        }
        twitterUserId
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
      twitterId
      twitterBio
      twitterUsername
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
        twitterId
        twitterBio
        twitterUsername
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getRelationship = /* GraphQL */ `
  query GetRelationship($id: ID!) {
    getRelationship(id: $id) {
      id
      twitterAccountId
      twitterAccount {
        id
        userId
        twitterToken
        twitterSecretToken
        twitterUser {
          twitterId
          twitterBio
          twitterUsername
          createdAt
          updatedAt
        }
        twitterUserId
        createdAt
        updatedAt
      }
      twitterUser {
        twitterId
        twitterBio
        twitterUsername
        createdAt
        updatedAt
      }
      twitterUserId
      relationshipType
      createdAt
      updatedAt
    }
  }
`
export const listRelationships = /* GraphQL */ `
  query ListRelationships($filter: ModelRelationshipFilterInput, $limit: Int, $nextToken: String) {
    listRelationships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        twitterAccountId
        twitterAccount {
          id
          userId
          twitterToken
          twitterSecretToken
          twitterUserId
          createdAt
          updatedAt
        }
        twitterUser {
          twitterId
          twitterBio
          twitterUsername
          createdAt
          updatedAt
        }
        twitterUserId
        relationshipType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getTwitterDataPull = /* GraphQL */ `
  query GetTwitterDataPull($id: ID!) {
    getTwitterDataPull(id: $id) {
      id
      twitterAccount {
        id
        userId
        twitterToken
        twitterSecretToken
        twitterUser {
          twitterId
          twitterBio
          twitterUsername
          createdAt
          updatedAt
        }
        twitterUserId
        createdAt
        updatedAt
      }
      twitterAccountId
      relationshipType
      paginationToken
      createdAt
      updatedAt
    }
  }
`
export const listTwitterDataPulls = /* GraphQL */ `
  query ListTwitterDataPulls(
    $filter: ModelTwitterDataPullFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTwitterDataPulls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        twitterAccount {
          id
          userId
          twitterToken
          twitterSecretToken
          twitterUserId
          createdAt
          updatedAt
        }
        twitterAccountId
        relationshipType
        paginationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
