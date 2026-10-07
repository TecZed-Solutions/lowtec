import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoLink = ({ href, cta }: Pick<BentoCardProps, "href" | "cta">) => (
  <a
    href={href}
    className="group/link font-ui text-marca pointer-events-auto inline-flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline"
  >
    {cta}
    <ArrowRight
      className="size-4 transition-transform group-hover/link:translate-x-1"
      aria-hidden="true"
    />
  </a>
);

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg",
      // Tema LowTec (a landing não usa .dark)
      "bg-cartao ring-marca/15 hover:ring-marca/40 transform-gpu ring-1 transition-shadow duration-300",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="relative z-10 p-6">
      <div className="pointer-events-none flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-focus-within:-translate-y-10 lg:group-hover:-translate-y-10">
        <Icon className="text-marca mb-2 size-9 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="font-ui text-text1 text-xl font-bold">{name}</h3>
        <p className="text-text2 max-w-xl text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pointer-events-none flex w-full flex-row items-center pt-4 lg:hidden">
        <BentoLink href={href} cta={cta} />
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-0 z-10 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
      <BentoLink href={href} cta={cta} />
    </div>

    <div className="group-hover:bg-marca/3 pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
  </div>
);

export { BentoCard, BentoGrid };
