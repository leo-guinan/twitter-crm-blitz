import stripe, { env } from "integrations/stripe"
import { Ctx } from "blitz"
import db from "db"

type CreateCheckoutSessionInput = {
  priceId: string
  quantity?: number
}

// Step 4: Create a Checkout Session
// https://stripe.com/docs/billing/subscriptions/checkout#create-session
export default async function createCheckoutSession(
  { priceId, quantity }: CreateCheckoutSessionInput,
  ctx: Ctx
) {
  ctx.session.$authorize()

  const user = await db.user.findFirst({
    where: { id: ctx.session.userId },
    select: { email: true, stripeCustomerId: true },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const customer = await stripe.customers.create({
    email: user.email,
  })

  await db.user.update({
    where: { id: ctx.session.userId },
    data: {
      stripeCustomerId: customer.id,
    },
  })
  let lineItem = {
    price: priceId,
  }

  if (quantity) {
    lineItem.quantity = quantity
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [lineItem],
    success_url: `${env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.DOMAIN}/cancelled`,
  })

  return {
    sessionId: session.id,
  }
}
