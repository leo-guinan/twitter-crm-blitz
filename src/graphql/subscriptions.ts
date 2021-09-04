/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTwitterAccount = /* GraphQL */ `
  subscription OnCreateTwitterAccount {
    onCreateTwitterAccount {
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
export const onUpdateTwitterAccount = /* GraphQL */ `
  subscription OnUpdateTwitterAccount {
    onUpdateTwitterAccount {
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
export const onDeleteTwitterAccount = /* GraphQL */ `
  subscription OnDeleteTwitterAccount {
    onDeleteTwitterAccount {
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
export const onCreateTwitterUser = /* GraphQL */ `
  subscription OnCreateTwitterUser {
    onCreateTwitterUser {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const onUpdateTwitterUser = /* GraphQL */ `
  subscription OnUpdateTwitterUser {
    onUpdateTwitterUser {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const onDeleteTwitterUser = /* GraphQL */ `
  subscription OnDeleteTwitterUser {
    onDeleteTwitterUser {
      twitterId
      twitterBio
      twitterUsername
      createdAt
      updatedAt
    }
  }
`
export const onCreateRelationship = /* GraphQL */ `
  subscription OnCreateRelationship {
    onCreateRelationship {
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
export const onUpdateRelationship = /* GraphQL */ `
  subscription OnUpdateRelationship {
    onUpdateRelationship {
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
export const onDeleteRelationship = /* GraphQL */ `
  subscription OnDeleteRelationship {
    onDeleteRelationship {
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
export const onCreateTwitterDataPull = /* GraphQL */ `
  subscription OnCreateTwitterDataPull {
    onCreateTwitterDataPull {
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
export const onUpdateTwitterDataPull = /* GraphQL */ `
  subscription OnUpdateTwitterDataPull {
    onUpdateTwitterDataPull {
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
export const onDeleteTwitterDataPull = /* GraphQL */ `
  subscription OnDeleteTwitterDataPull {
    onDeleteTwitterDataPull {
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
