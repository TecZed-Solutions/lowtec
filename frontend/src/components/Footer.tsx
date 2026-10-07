import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { NAVIGATION } from "@/config/navigation";

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
                src="/logo_submark.svg"
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
          <p className="text-text3">
            © {new Date().getFullYear()} LowTec. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-text3">
              Desenvolvido por{" "}
              <a
                href="https://www.teczed.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text2 hover:text-marca font-semibold transition-colors"
              >
                TecZed
              </a>
            </p>

            <a
              href="#hero"
              className="font-ui text-text2 hover:text-marca inline-flex items-center gap-1.5 font-semibold transition-colors"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              Topo
            </a>
          </div>
        </div>

        <p className="text-text3 mt-6 text-center text-xs leading-relaxed sm:text-left">
          Os resultados variam conforme a IA utilizada e a foto enviada.
          ChatGPT, Gemini e Grok são marcas de seus respectivos donos; a LowTec
          não tem vínculo com essas empresas.
        </p>
      </div>
    </footer>
  );
}
