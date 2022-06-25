import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '../components/Header/index'
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps:{ session, ...pageProps } }: AppProps) {
  return (
  <SessionProvider session={session}>
  <Header/>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
