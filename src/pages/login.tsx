import { LayoutMain, roboto } from 'components/layout'
import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, ReactElement, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [loginErrorMessage, setLoginErrorMessage] = useState<
    string | undefined
  >()
  const [isLoading, setIsLoading] = useState<boolean>()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value
    const password = target.password.value

    const callbackUrl = (router.query.callbackUrl as string) ?? '/me'

    const result = await signIn('credentials', {
      username,
      password,
      callbackUrl,
      redirect: false,
    })

    if (result?.error) {
      setLoginErrorMessage('Invalid email or password.')
    } else {
      router.push(result?.url!)
    }

    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login | Acme</title>
        <meta name="description" content="Log in to your account." />
      </Head>
      <div className="flex justify-center">
        <div className="bg-zinc-800 p-14 rounded-md w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
              className="w-full px-4 py-3 bg-neutral-900 rounded-md"
              name="username"
              placeholder="E-mail"
              type="text"
              autoComplete="username"
            />
            <input
              className="w-full px-4 py-3 bg-neutral-900 rounded-md"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            {loginErrorMessage && (
              <span className="my-2 text-sm text-red-200">
                {loginErrorMessage}
              </span>
            )}
            <button
              className="bg-indigo-500 p-2 rounded-md hover:bg-indigo-400 uppercase font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'login'}
            </button>
          </form>
          <div className="mt-5">
            <button
              className="w-full bg-zinc-700 p-2 rounded-md hover:bg-indigo-500 uppercase font-medium"
              onClick={() => signIn('github')}
            >
              github
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className={`${roboto.variable} font-sans`}>
      <LayoutMain>{page}</LayoutMain>
    </div>
  )
}
