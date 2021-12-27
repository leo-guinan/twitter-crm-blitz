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
    select: {
      email: true,
      memberships: {
        select: {
          organization: {
            select: {
              stripeCustomerId: true,
            },
          },
        },
      },
    },
  })

  if (!user || !user.email) {
    throw new Error("User not found")
  }

  const customer = await stripe.customers.create({
    email: user!.email,
  })

  await db.organization.update({
    where: { id: ctx.session.orgId },
    data: {
      stripeCustomerId: customer.id,
    },
  })
  let lineItem = {}

  if (quantity) {
    lineItem = {
      price: priceId,
      quantity: quantity,
    }
  } else {
    lineItem = {
      price: priceId,
    }
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [lineItem],
    success_url: `${env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.DOMAIN}/cancelled`,
    allow_promotion_codes: true,
  })

  return {
    sessionId: session.id,
  }
}
