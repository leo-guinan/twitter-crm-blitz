import { resolver, SecurePassword } from "blitz"
import db from "db"
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
      role: "USER",
      trial: {
        create: {},
      },
    },
    select: { id: true, name: true, email: true, role: true, subscriptionStatus: true },
  })

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    subscriptionStatus: user.subscriptionStatus,
  })
  return user
})
