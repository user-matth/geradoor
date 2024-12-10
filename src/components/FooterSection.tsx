"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, IdCard, MessageCircleMore, ScanLine, Square, WalletCards } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { AnimatedLink } from "./PageTransition";
import React from "react";

interface FooterSectionProps {
  toggleTheme: () => void;
}

interface NavItem {
  path: string;
  icon: React.ReactNode;
}

interface FooterText {
  path: string;
  content: string[];
}

const navItems: NavItem[] = [
  {
    path: "/",
    icon: <IdCard className="h-5 w-5" />,
  },
  {
    path: "/cnpj",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    path: "/cartao-de-credito",
    icon: <WalletCards className="h-5 w-5" />,
  },
  {
    path: "/qr-code",
    icon: <ScanLine className="h-5 w-5" />,
  },
  {
    path: "/whatsapp",
    icon: <MessageCircleMore className="h-5 w-5" />,
  },
];

const footerTexts: FooterText[] = [
  {
    path: "/",
    content: [
      "Nosso gerador online de CPF tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar CPF válidos. Normalmente necessários para testar seus softwares em desenvolvimento.",
      "A má utilização dos dados aqui gerados é de total responsabilidade do usuário.",
      "Os números são gerados de forma aleatória, e não salvamos nenhum CPF gerado em nossa base, respeitando as regras de criação de cada documento.",
    ],
  },
  {
    path: "/cnpj",
    content: [
      "Nosso gerador online de CNPJ tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar CNPJ válidos. Normalmente necessários parar testar seus softwares em desenvolvimento.",
      "A má utilização dos dados aqui gerados é de total responsabilidade do usuário.",
      "Os números são gerados de forma aleatória, respeitando as regras de criação de cada documento.",
    ],
  },
  {
    path: "/cartao-de-credito",
    content: [
      "Nosso gerador online de Cartão de Crédito tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar Cartões válidos. Normalmente necessários parar testar seus softwares em desenvolvimento.",
      "Esses dados não servem para fazer compras na internet.",
      "A má utilização dos dados aqui gerados é de total responsabilidade do usuário.",
      "Os números são gerados de forma aleatória, respeitando as regras de criação de cada documento.",
    ],
  },
];

const FooterText = ({ currentPath }: { currentPath: string }) => {
  const text = footerTexts.find((item) => item.path === currentPath);
  
  if (!text) return null;

  return (
    <div className="max-w-screen-md hidden lg:flex md:flex flex-col mx-auto items-center justify-center text-xs text-center font-normal tracking-tight text-muted-foreground mb-6">
      {text.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

const NavigationButton = ({ path, icon, currentPath }: { path: string; icon: React.ReactNode; currentPath: string }) => {
  const isActive = path === currentPath;
  const iconClassName = `${isActive ? "stroke-primary-light-12" : "text-muted-foreground/50"} dark:stroke-primary-dark-12 h-5 w-5`;

  return (
    <AnimatedLink href={path}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        size="icon"
        className="rounded-lg [&_svg]:size-5"
      >
        {React.cloneElement(icon as React.ReactElement, { className: iconClassName })}
      </Button>
    </AnimatedLink>
  );
};

const ThemeToggle = ({ resolvedTheme, toggleTheme }: { resolvedTheme: string | undefined; toggleTheme: () => void }) => (
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
);

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
      <FooterText currentPath={currentPath} />
      
      <div className="bg-background dark:bg-primary-dark-2 pointer-events-auto relative mx-auto flex h-full items-center overflow-y-scroll rounded-[14px] px-2 py-2 shadow-[rgba(142,140,152,0.2)_0px_0px_30px,rgba(219,216,224,0.2)_0px_0px_0px_1px] dark:shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px] sm:overflow-y-visible">
        {navItems.map((item) => (
          <NavigationButton
            key={item.path}
            path={item.path}
            icon={item.icon}
            currentPath={currentPath}
          />
        ))}
        <ThemeToggle resolvedTheme={resolvedTheme} toggleTheme={toggleTheme} />
      </div>
    </motion.div>
  );
};

export default FooterSection;