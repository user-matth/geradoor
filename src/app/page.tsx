"use client";

import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { formatCPF, generateCPF } from './utils/cpf_gen';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { DoorOpen,  House, IdCard, Info, Square } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const CPFGenerator: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme || "dark");
      handleGenerate();
    }
  }, [theme]);  

  const handleGenerate = () => {
    const newCpf = generateCPF();
    setCpf(newCpf);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cpf);
    setCopied(true);
    toast("Copiado pro trem que coisa", {
      description: "CPF copiado para a área de transferência",
      action: {
        label: "Cancelar",
        onClick: () => console.log("Cancelar"),
      },
    });
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden">
      <motion.div
        className="pattern absolute inset-0 -z-10 h-full w-full" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-20 mx-auto max-w-screen-sm mt-4 flex px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-background dark:bg-primary-dark-2 pointer-events-auto relative mx-auto w-full flex h-full items-center overflow-y-scroll rounded-[14px] px-2 py-2 shadow-[rgba(142,140,152,0.2)_0px_0px_30px,rgba(219,216,224,0.2)_0px_0px_0px_1px] dark:shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px] sm:overflow-y-visible">
          <Button variant="link">
            <DoorOpen className="w-4 h-4" />
            Geradoor
          </Button>
          <Button variant="link" asChild>
            <Link href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} className="ms-auto text-zinc-400">
              API
            </Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        className="max-w-screen-sm w-full h-full flex flex-col space-y-2 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex flex-col items-center justify-center space-y-3 my-5">
          <h1 className="text-4xl font-semibold tracking-tighter">Gerador de CPF</h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-400 font-normal leading-6 tracking-tighter text-center">Clique em &quot;Gerar CPF&quot; e obtenha um número<br />de CPF válido instantaneamente.</p>
        </div>
        <Button className="w-full max-w-[250px] mt-8" onClick={handleGenerate}>
          Gerar CPF
        </Button>
        <div className="flex space-x-2 w-full max-w-[250px] mx-auto">
          <Input readOnly type="text" placeholder="CPF" className="bg-background" value={formatCPF(cpf)} />
          <Button variant="outline" onClick={copyToClipboard}>
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className='w-10 h-10 lg:hidden md:hidden flex'>
              <Info className='w-4 h-4'/>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full">
              <DrawerHeader>
                <DrawerTitle>Como funciona?</DrawerTitle>
                <DrawerDescription>Entenda nossa intenção</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0 flex flex-col space-y-4">
                <p>Nosso gerador online de CPF tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar CPF válidos. Normalmente necessários para testar seus softwares em desenvolvimento.</p>
                <p>A má utilização dos dados aqui gerados é de total responsabilidade do usuário.</p>
                <p>Os números são gerados de forma aleatória, e não salvamos nenhum CPF gerado em nossa base, respeitando as regras de criação de cada documento.</p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Entendi</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex flex-col px-6 max-w-screen-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="max-w-screen-sm hidden lg:flex md:flex flex-col mx-auto items-center justify-center text-xs text-center font-normal tracking-tight text-muted-foreground mb-6">
          <p>Nosso gerador online de CPF tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar CPF válidos. Normalmente necessários para testar seus softwares em desenvolvimento.</p>
          <p>A má utilização dos dados aqui gerados é de total responsabilidade do usuário.</p>
          <p>Os números são gerados de forma aleatória, e não salvamos nenhum CPF gerado em nossa base, respeitando as regras de criação de cada documento.</p>
        </div>
        <div className="bg-background dark:bg-primary-dark-2 pointer-events-auto relative mx-auto flex h-full items-center overflow-y-scroll rounded-[14px] px-2 py-2 shadow-[rgba(142,140,152,0.2)_0px_0px_30px,rgba(219,216,224,0.2)_0px_0px_0px_1px] dark:shadow-[rgba(111,109,120,0.1)_0px_0px_30px,rgba(60,57,63,0.4)_0px_0px_0px_1px] sm:overflow-y-visible">
          <Button variant="secondary" size="icon" className="rounded-lg [&_svg]:size-5">
            <IdCard className="stroke-primary-light-12 dark:stroke-primary-dark-12 h-5 w-5" />
          </Button>
          {/* <Button variant="ghost" size="icon" className="rounded-lg [&_svg]:size-5">
            <House className="text-muted-foreground/50 dark:stroke-primary-dark-12 h-5 w-5" />
          </Button> */}
          <Button variant="ghost" size="icon" className="rounded-lg [&_svg]:size-5 bg-transparent shadow-none hover:bg-transparent" onClick={toggleTheme}>
            <Square fill={resolvedTheme === 'dark' ? 'white' : 'black'} className={`${resolvedTheme === 'dark' ? 'white' : 'black'} h-5 w-5`} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CPFGenerator;
