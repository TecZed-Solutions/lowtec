import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PerfilDashboard from "./_components/PerfilDashboard";

export const metadata: Metadata = {
  title: "Perfil | LowTec",
  robots: { index: false, follow: false },
};

export default function PerfilPage() {
  return (
    <div className="bg-fundo relative isolate flex-1 overflow-hidden">
      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <PerfilDashboard />
      </main>
    </div>
  );
}
