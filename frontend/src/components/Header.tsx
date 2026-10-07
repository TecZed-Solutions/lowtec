import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DoorOpen } from "lucide-react";

import AuthDialog from "@/components/auth/AuthDialog";

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

      <AuthDialog />
    </motion.header>
  );
}
