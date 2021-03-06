import { resolver, SecurePassword } from "blitz"
import db, { MembershipRole } from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  try {
    // const request = (await API.graphql({
    //   authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    //   query: createTodo,
    //   variables: {
    //     input: createInput,
    //   },
    // })) as { data: CreateTodoMutation; errors: any[] };
    // router.push(`/todo/${request.data.createTodo.id}`)
  } catch ({ errors }) {
    console.error(...errors)
    throw new Error(errors[0].message)
  }
  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      role: "CUSTOMER",
      memberships: {
        create: {
          role: "OWNER",
          organization: {
            create: {
              name: "",
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      memberships: {
        select: {
          organizationId: true,
          role: true,
          organization: {
            select: {
              subscriptionStatus: true,
            },
          },
        },
      },
    },
  })

  await ctx.session.$create({
    userId: user.id,
    roles: [user?.role, user?.memberships[0]?.role || MembershipRole.USER],
    orgId: user?.memberships[0]?.organizationId,
    subscriptionStatus: user?.memberships[0]?.organization?.subscriptionStatus || "incomplete",
  })
  return user
})
