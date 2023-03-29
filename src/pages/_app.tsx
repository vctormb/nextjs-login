import { SessionProvider, signOut, useSession } from 'next-auth/react'
import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import Head from 'next/head'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect } from 'react'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function Auth({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'InvalidTokenError') {
      signOut()
    }
  }, [session])

  return <>{children}</>
}

const TWO_HOURS_ONE_MINUTE = 2 * 61 * 60

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider
        session={session}
        // since our token from our "external" API expires in 2h, we added +1m to make sure that after 2h it will log out
        refetchInterval={TWO_HOURS_ONE_MINUTE}
      >
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      </SessionProvider>
    </>
  )
}
