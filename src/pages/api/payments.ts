import { stripe } from "../../services/stripe";
import { NextApiResponse, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/faunadb";
import {query as q} from "faunadb";



interface iUser {
ref: {
  id: string
}
data: {
  stripe_costumer_id: string
}
}
interface Isession {
  user:{
    email: string
  }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method) {
    const priceId = req.body
    const session = await getSession({req});
    const email  = session?.user?.email

    const user = await fauna.query<iUser>(
      q.Get(
        q.Match(
          q.Index("users_by_email"),
          q.Casefold(email as string)
        )
      )
    );

    let costumerId = user.data.stripe_costumer_id


    if(!costumerId){
      const stripeCustomers = await stripe.customers.create({
        email: email as string,
      });

      await fauna.query(
        q.Update(q.Ref(
          q.Collection('users'),user.ref.id),
          {
            data: {
              stripe_costumer_id: stripeCustomers.id
            }
          }
        )
      )
      costumerId = stripeCustomers.id
    }
    
    const stripeCheckouSessions = await stripe.checkout.sessions.create({
      customer: costumerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: priceId.priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });
    return res.status(200).json({ sessionId: stripeCheckouSessions.id });
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("method not allowed");
  }
};
