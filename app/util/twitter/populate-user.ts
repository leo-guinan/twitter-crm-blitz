import db from "../../../db"

export const refreshUser = async (client, twitterAccountTwitterId) => {
  const twitterUser = await db.twitterAccount.findFirst({
    where: {
      id: twitterAccountTwitterId,
    },
  })
  if (!twitterUser) return
  return await populateUser(client, twitterUser.twitterUsername)
}

export const populateUser = async (client, twitterUsername) => {
  const params = {
    "user.fields": "id,profile_image_url,name,description",
  }
  let account
  await client.get(`users/by/username/${twitterUsername}`, params).then(async (results) => {
    if (results.data) {
      account = await db.twitterAccount.upsert({
        where: {
          twitterId: results.data.id,
        },
        create: {
          twitterId: results.data.id,
          twitterUsername: results.data.username,
          twitterName: results.data.name,
          twitterBio: results.data.description,
          twitterProfilePictureUrl: results.data.profile_image_url,
        },
        update: {
          twitterUsername: results.data.username,
          twitterName: results.data.name,
          twitterBio: results.data.description,
          twitterProfilePictureUrl: results.data.profile_image_url,
        },
      })
    }
  })
  return account
}
