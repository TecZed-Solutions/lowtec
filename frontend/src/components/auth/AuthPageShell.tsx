import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-fundo relative isolate flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
      <div
        aria-hidden="true"
        className="bg-marca/10 absolute top-1/4 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full blur-[120px]"
      />

      <div className="w-full max-w-md">
        <Link
          href="/"
          aria-label="LowTec, página inicial"
          className="mx-auto mb-8 block w-fit"
        >
          <Image
            src="/logo_submark.svg"
            alt=""
            width={448}
            height={337}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="bg-cartao text-text1 ring-marca/25 rounded-xl p-6 ring-1 sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
