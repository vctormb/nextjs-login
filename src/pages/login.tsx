import { LayoutMain, roboto } from "components/layout";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { FormEvent, ReactElement } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Login() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;

    signIn("credentials", { callbackUrl: "/me", username, password });
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
              placeholder="email"
              type="text"
              autoComplete="username"
            />
            <input
              className="w-full px-4 py-3 bg-neutral-900 rounded-md"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="new-password"
            />
            <button className="bg-indigo-500 p-2 rounded-md hover:bg-indigo-400">
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/me" } };
  }

  return {
    props: {}
  }
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className={`${roboto.variable} font-sans`}>
      <LayoutMain>{page}</LayoutMain>
    </div>
  );
};
