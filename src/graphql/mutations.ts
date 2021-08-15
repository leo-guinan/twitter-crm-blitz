/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSession = /* GraphQL */ `
  mutation CreateSession($input: CreateSessionInput!, $condition: ModelSessionConditionInput) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession($input: UpdateSessionInput!, $condition: ModelSessionConditionInput) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession($input: DeleteSessionInput!, $condition: ModelSessionConditionInput) {
    deleteSession(input: $input, condition: $condition) {
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
export const createToken = /* GraphQL */ `
  mutation CreateToken($input: CreateTokenInput!, $condition: ModelTokenConditionInput) {
    createToken(input: $input, condition: $condition) {
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
export const updateToken = /* GraphQL */ `
  mutation UpdateToken($input: UpdateTokenInput!, $condition: ModelTokenConditionInput) {
    updateToken(input: $input, condition: $condition) {
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
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken($input: DeleteTokenInput!, $condition: ModelTokenConditionInput) {
    deleteToken(input: $input, condition: $condition) {
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
export const createTwitterUser = /* GraphQL */ `
  mutation CreateTwitterUser(
    $input: CreateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    createTwitterUser(input: $input, condition: $condition) {
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
export const updateTwitterUser = /* GraphQL */ `
  mutation UpdateTwitterUser(
    $input: UpdateTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    updateTwitterUser(input: $input, condition: $condition) {
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
export const deleteTwitterUser = /* GraphQL */ `
  mutation DeleteTwitterUser(
    $input: DeleteTwitterUserInput!
    $condition: ModelTwitterUserConditionInput
  ) {
    deleteTwitterUser(input: $input, condition: $condition) {
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
export const createRelationship = /* GraphQL */ `
  mutation CreateRelationship(
    $input: CreateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    createRelationship(input: $input, condition: $condition) {
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
export const updateRelationship = /* GraphQL */ `
  mutation UpdateRelationship(
    $input: UpdateRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    updateRelationship(input: $input, condition: $condition) {
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
export const deleteRelationship = /* GraphQL */ `
  mutation DeleteRelationship(
    $input: DeleteRelationshipInput!
    $condition: ModelRelationshipConditionInput
  ) {
    deleteRelationship(input: $input, condition: $condition) {
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
