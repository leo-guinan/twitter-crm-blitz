/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
export const onCreateToken = /* GraphQL */ `
  subscription OnCreateToken {
    onCreateToken {
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
export const onUpdateToken = /* GraphQL */ `
  subscription OnUpdateToken {
    onUpdateToken {
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
export const onDeleteToken = /* GraphQL */ `
  subscription OnDeleteToken {
    onDeleteToken {
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
export const onCreateTwitterUser = /* GraphQL */ `
  subscription OnCreateTwitterUser {
    onCreateTwitterUser {
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
export const onUpdateTwitterUser = /* GraphQL */ `
  subscription OnUpdateTwitterUser {
    onUpdateTwitterUser {
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
export const onDeleteTwitterUser = /* GraphQL */ `
  subscription OnDeleteTwitterUser {
    onDeleteTwitterUser {
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
export const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship {
    onCreateRelationship {
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
export const onUpdateRelationship = /* GraphQL */ `
  subscription OnUpdateRelationship {
    onUpdateRelationship {
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
export const onDeleteRelationship = /* GraphQL */ `
  subscription OnDeleteRelationship {
    onDeleteRelationship {
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
