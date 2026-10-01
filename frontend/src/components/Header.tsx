import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DoorOpen } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 flex items-center justify-between"
    >
      <Link href="/" aria-label="Lowtec, página inicial" className="w-fit">
        <Image
          src="/logo_submark.svg"
          alt=""
          width={448}
          height={337}
          priority
          className="h-14 w-auto"
        />
      </Link>

      <a
        href="#comprar"
        className="group bg-marca font-ui text-fundo hover:bg-marca/85 focus-visible:outline-marca inline-flex -skew-x-12 items-center px-8 py-4 text-base font-extrabold shadow-[0_10px_40px_-10px_rgba(73,229,16,0.6)] transition-colors"
      >
        <span className="inline-flex skew-x-12 items-center gap-2">
          <DoorOpen size={18} strokeWidth={2.5} aria-hidden="true" />
          Fazer login
        </span>
      </a>
    </motion.header>
  );
}
