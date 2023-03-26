import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { Navbar } from "./navbar";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

type Props = {
  children: ReactNode;
};

export function LayoutMain({ children }: Props) {
  return (
    <div className="mx-8">
      <main className="mt-14 mx-auto max-w-[1080px]">{children}</main>
    </div>
  );
}

export function Layout({ children }: Props) {
  return (
    <div className={`${roboto.variable} font-sans`}>
      <Navbar />
      <LayoutMain>{children}</LayoutMain>
    </div>
  );
}
