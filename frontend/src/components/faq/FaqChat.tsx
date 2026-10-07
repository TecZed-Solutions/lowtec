"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { FAQ } from "@/constants/faq";
import { messageIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Bubble({
  from,
  children,
}: {
  from: "bot" | "user";
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "w-fit max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
        from === "user"
          ? "bg-marca text-fundo ml-auto rounded-br-sm font-semibold"
          : "text-text1 mr-auto rounded-bl-sm bg-white/5 ring-1 ring-white/10",
      )}
    >
      {children}
    </p>
  );
}

function TypingDots() {
  return (
    <div
      role="status"
      aria-label="Digitando"
      className="flex w-fit gap-1.5 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3.5 ring-1 ring-white/10"
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          style={{ animationDelay: `${delay}ms` }}
          className="bg-marca motion-safe:animate-bounce-step size-1.5 rounded-full"
        />
      ))}
    </div>
  );
}

export default function FaqChat() {
  const [active, setActive] = useState(0);
  const [typing, setTyping] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!typing) return;
    const timer = setTimeout(() => setTyping(false), reduceMotion ? 0 : 700);
    return () => clearTimeout(timer);
  }, [typing, reduceMotion]);

  const ask = (index: number) => {
    if (index === active) return;
    setActive(index);
    setTyping(true);
  };

  const current = FAQ[active];

  return (
    <div className="bg-cartao ring-marca/20 overflow-hidden rounded-xl shadow-[0_30px_60px_-30px_rgba(73,229,16,0.35)] ring-1">
      <div className="flex items-center gap-3 border-b border-dashed border-white/10 px-5 py-4">
        <span className="bg-fundo ring-marca/40 relative flex size-10 shrink-0 items-center justify-center rounded-full ring-1">
          <Image
            src="/logo_submark.svg"
            alt=""
            width={448}
            height={337}
            className="h-5 w-auto"
          />
          <span
            aria-hidden="true"
            className="bg-marca ring-cartao absolute right-0 bottom-0 size-2.5 rounded-full ring-2"
          />
        </span>
        <div>
          <p className="font-ui text-text1 text-sm font-bold">LowTec</p>
          <p className="text-marca text-xs">online · responde na hora</p>
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex min-h-80 flex-col justify-end gap-3 px-5 py-6"
      >
        <Bubble from="bot">
          Oi! Escolha uma pergunta aqui embaixo que eu respondo na hora.
        </Bubble>

        <motion.div
          key={`pergunta-${active}`}
          variants={messageIn}
          initial="hidden"
          animate="visible"
        >
          <Bubble from="user">{current.question}</Bubble>
        </motion.div>

        {typing ? (
          <TypingDots />
        ) : (
          <motion.div
            key={`resposta-${active}`}
            variants={messageIn}
            initial="hidden"
            animate="visible"
          >
            <Bubble from="bot">{current.answer}</Bubble>
          </motion.div>
        )}
      </div>

      <div className="border-t border-dashed border-white/10 px-5 py-4">
        <p className="font-ui text-text3 mb-3 text-xs font-bold tracking-widest uppercase">
          Perguntas frequentes
        </p>

        <div className="flex flex-wrap gap-2">
          {FAQ.map((item, index) => {
            const isActive = index === active;

            return (
              <button
                key={item.question}
                type="button"
                aria-pressed={isActive}
                onClick={() => ask(index)}
                className={cn(
                  "font-ui rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-marca text-fundo"
                    : "text-text2 hover:text-text1 hover:ring-marca/40 bg-white/5 ring-1 ring-white/10",
                )}
              >
                {item.question}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
