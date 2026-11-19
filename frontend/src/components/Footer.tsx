import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { LEGAL_ROTA } from "@/config/legal";
import { NAVIGATION } from "@/config/navigation";
import logoSubmark from "@public/logo_submark.svg";
import logoTeczed from "@public/teczed_logo.svg";

export default function Footer() {
  return (
    <footer className="bg-fundo2 border-marca/15 border-t border-dashed">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="flex max-w-sm flex-col items-center gap-4 lg:items-start">
            <Link
              href="/"
              aria-label="LowTec, página inicial"
              className="w-fit"
            >
              <Image
                src={logoSubmark}
                alt=""
                width={448}
                height={337}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-text3 text-sm leading-relaxed">
              Prompts prontos para transformar a sua foto em um retrato
              profissional com IA.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
              {NAVIGATION.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text2 hover:text-marca transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-dashed border-white/10 pt-8 text-xs sm:flex-row sm:justify-between">
          <div className="text-text3 flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <p>
              © {new Date().getFullYear()} LowTec. Todos os direitos reservados.
            </p>
          </div>

          <nav aria-label="Documentos legais">
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <li>
                <Link
                  href={`${LEGAL_ROTA}#termos`}
                  className="text-text2 hover:text-marca transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href={`${LEGAL_ROTA}#privacidade`}
                  className="text-text2 hover:text-marca transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <p className="text-text3">Desenvolvido por</p>
            <a
              href="https://www.teczed.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm transition-opacity hover:opacity-80"
            >
              <Image
                src={logoTeczed}
                alt="TecZed"
                width={1254}
                height={1254}
                className="size-12"
              />
            </a>

            <a
              href="#hero"
              className="font-ui text-text2 hover:text-marca inline-flex items-center gap-1.5 font-semibold transition-colors"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              Topo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
