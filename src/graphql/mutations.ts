/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTwitterAccount = /* GraphQL */ `
  mutation CreateTwitterAccount(
    $input: CreateTwitterAccountInput!
    $condition: ModelTwitterAccountConditionInput
  ) {
    createTwitterAccount(input: $input, condition: $condition) {
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
export const updateTwitterAccount = /* GraphQL */ `
  mutation UpdateTwitterAccount(
    $input: UpdateTwitterAccountInput!
    $condition: ModelTwitterAccountConditionInput
  ) {
    updateTwitterAccount(input: $input, condition: $condition) {
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
export const deleteTwitterAccount = /* GraphQL */ `
  mutation DeleteTwitterAccount(
    $input: DeleteTwitterAccountInput!
    $condition: ModelTwitterAccountConditionInput
  ) {
    deleteTwitterAccount(input: $input, condition: $condition) {
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
export const createTwitterUser = /* GraphQL */ `
  mutation CreateTwitterUser(
    $input: CreateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    createTwitterUser(input: $input, condition: $condition) {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const updateTwitterUser = /* GraphQL */ `
  mutation UpdateTwitterUser(
    $input: UpdateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    updateTwitterUser(input: $input, condition: $condition) {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const deleteTwitterUser = /* GraphQL */ `
  mutation DeleteTwitterUser(
    $input: DeleteTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    deleteTwitterUser(input: $input, condition: $condition) {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    createRelationship(input: $input, condition: $condition) {
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
export const updateRelationship = /* GraphQL */ `
  mutation UpdateRelationship(
    $input: UpdateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    updateRelationship(input: $input, condition: $condition) {
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
export const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
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
export const createTwitterDataPull = /* GraphQL */ `
  mutation CreateTwitterDataPull(
    $input: CreateTwitterDataPullInput!
    $condition: ModelTwitterDataPullConditionInput
  ) {
    createTwitterDataPull(input: $input, condition: $condition) {
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
export const updateTwitterDataPull = /* GraphQL */ `
  mutation UpdateTwitterDataPull(
    $input: UpdateTwitterDataPullInput!
    $condition: ModelTwitterDataPullConditionInput
  ) {
    updateTwitterDataPull(input: $input, condition: $condition) {
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
export const deleteTwitterDataPull = /* GraphQL */ `
  mutation DeleteTwitterDataPull(
    $input: DeleteTwitterDataPullInput!
    $condition: ModelTwitterDataPullConditionInput
  ) {
    deleteTwitterDataPull(input: $input, condition: $condition) {
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
