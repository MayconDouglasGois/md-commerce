import {loadStripe} from '@stripe/stripe-js'

export async function getStripesJs() {
   const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string) 
   return stripeJs
}