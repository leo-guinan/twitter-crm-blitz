import { CronJob } from "quirrel/next"
import db, { User } from "db"
import axios from "axios"

export default CronJob(
  "api/queues/add_users_to_contact_list", // 👈 the route that it's reachable on
  "0 0 * * *", // once a day at 12am
  async () => {
    const hasSubscriptions = await db.organization.findMany({
      where: {
        subscriptions: {
          some: {},
        },
        memberships: {
          some: {
            user: {
              email: {
                not: null,
              },
              addedToConvertkit: false,
            },
          },
        },
      },
      select: {
        memberships: {
          select: {
            user: true,
          },
        },
      },
    })
    const users: User[] = []
    for (const org of hasSubscriptions) {
      for (const membership of org.memberships) {
        users.push(membership.user)
      }
    }

    for (const user of users) {
      await axios
        .post(
          `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
          {
            api_key: process.env.CONVERTKIT_API_KEY,
            first_name: user.name,
            email: user.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              charset: "utf-8",
            },
          }
        )
        .catch((err) => {
          console.log(err)
        })
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          addedToConvertkit: true,
        },
      })
    }
  }
)
