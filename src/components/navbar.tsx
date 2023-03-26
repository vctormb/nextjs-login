import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-800 py-5 px-8 font-medium">
      <ul className="flex max-w-[1080px] mx-auto">
        <div className="flex gap-10 flex-1">
          <li>
            <Link href="/" className="hover:text-indigo-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-indigo-400">
              About Us
            </Link>
          </li>
        </div>
        {session ? (
          <li className="relative" onClick={() => setIsOpen((s) => !s)}>
            <span className="cursor-pointer">{session.user?.name}</span>
            {isOpen && (
              <div className="absolute top-8 right-0 bg-zinc-800 min-w-[170px] rounded-md shadow-xl py-3 px-6 border border-zinc-700">
                <ul>
                  <li className="hover:text-indigo-400">
                    <Link href="/me">Profile</Link>
                  </li>
                  {session.user.role === "admin" && (
                    <li className="hover:text-indigo-400">
                      <Link href="/admin">Admin</Link>
                    </li>
                  )}
                  <li
                    className="hover:text-indigo-400 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </li>
        ) : (
          <Link href="/login" className="hover:text-indigo-400">
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
}
