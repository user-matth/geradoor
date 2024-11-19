// components/FooterSection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IdCard, ScanLine, Square } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

interface FooterSectionProps {
  toggleTheme: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ toggleTheme }) => {
  const { resolvedTheme } = useTheme();
  const currentPath = usePathname();

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex flex-col px-6 max-w-screen-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      { currentPath === "/" ? (
        <div className="max-w-screen-sm hidden lg:flex md:flex flex-col mx-auto items-center justify-center text-xs text-center font-normal tracking-tight text-muted-foreground mb-6">
          <p>
            Nosso gerador online de CPF tem como intenção ajudar estudantes,
            programadores, analistas e testadores a gerar CPF válidos. Normalmente
            necessários para testar seus softwares em desenvolvimento.
          </p>
          <p>
            A má utilização dos dados aqui gerados é de total responsabilidade do
            usuário.
          </p>
          <p>
            Os números são gerados de forma aleatória, e não salvamos nenhum CPF
            gerado em nossa base, respeitando as regras de criação de cada
            documento.
          </p>
        </div>
      ) : null }
      <div className="bg-background dark:bg-primary-dark-2 pointer-events-auto relative mx-auto flex h-full items-center overflow-y-scroll rounded-[14px] px-2 py-2 shadow-[rgba(142,140,152,0.2)_0px_0px_30px,rgba(219,216,224,0.2)_0px_0px_0px_1px] dark:shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px] sm:overflow-y-visible">
        {currentPath === "/" ? (
          <Link href={"/"}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-lg [&_svg]:size-5"
            >
              <IdCard className="stroke-primary-light-12 dark:stroke-primary-dark-12 h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link href={"/"}>
            <Button variant="ghost" size="icon" className="rounded-lg [&_svg]:size-5">
              <IdCard className="text-muted-foreground/50 dark:stroke-primary-dark-12 h-5 w-5" />
            </Button>
          </Link>
        )}
        {currentPath === "/qr-code" ? (
          <Link href={"/qr-code"}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-lg [&_svg]:size-5"
            >
              <ScanLine className="stroke-primary-light-12 dark:stroke-primary-dark-12 h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link href={"/qr-code"}>
            <Button variant="ghost" size="icon" className="rounded-lg [&_svg]:size-5">
              <ScanLine className="text-muted-foreground/50 dark:stroke-primary-dark-12 h-5 w-5" />
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg [&_svg]:size-5 bg-transparent shadow-none hover:bg-transparent"
          onClick={toggleTheme}
        >
          <Square
            fill={resolvedTheme === "dark" ? "white" : "black"}
            className={`${resolvedTheme === "dark" ? "white" : "black"} h-5 w-5`}
          />
        </Button>
      </div>
    </motion.div>
  );
};

export default FooterSection;
