"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { DoorOpen, Minus } from 'lucide-react';
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
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';

const NavbarSection: React.FC = () => {
  const currentPath = usePathname();

  return (
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
        <div className="mx-auto hidden lg:inline md:inline">
          <Button variant="ghost" asChild>
            <Link href={'/'} className={currentPath === '/' ? '' : 'text-zinc-500'}>
              CPF
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={'/qr-code'} className={currentPath === '/qr-code' ? '' : 'text-zinc-500'}>
              QRCode
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={'/whatsapp'} className={currentPath === '/whatsapp' ? '' : 'text-zinc-500'}>
              Whatsapp
            </Link>
          </Button>
        </div>
        <Drawer>
          <DrawerTrigger className='flex lg:hidden md:hidden ms-auto me-2'>
            <div className="flex flex-col space-y-1.5 h-8 w-8 items-center justify-center">
              <div className="w-5 h-[1px] p-0 bg-primary rounded-full"></div>
              <div className="w-5 h-[1px] p-0 bg-primary rounded-full"></div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              {/* <DrawerDescription>Entenda nossa intenção</DrawerDescription> */}
            </DrawerHeader>
            <div className="flex flex-col px-4 pb-12 space-y-2">
              <Link href={'/'} className={currentPath === '/' ? '' : 'text-zinc-500'}>
                CPF
              </Link>
              <Link href={'/qr-code'} className={currentPath === '/qr-code' ? '' : 'text-zinc-500'}>
                QRCode
              </Link>
              <Link href={'/whatsapp'} className={currentPath === '/whatsapp' ? '' : 'text-zinc-500'}>
                Whatsapp
              </Link>
              { currentPath === "/" && (
                <div className="flex flex-col space-y-4 text-sm">
                  <Separator className='my-6'/>
                  <p>Nosso gerador online de CPF tem como intenção ajudar estudantes, programadores, analistas e testadores a gerar CPF válidos. Normalmente necessários para testar seus softwares em desenvolvimento.</p>
                  <p>A má utilização dos dados aqui gerados é de total responsabilidade do usuário.</p>
                  <p>Os números são gerados de forma aleatória, e não salvamos nenhum CPF gerado em nossa base, respeitando as regras de criação de cada documento.</p>
                </div>
              ) }
            </div>
            {/* <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>

        <Button variant="link" asChild className='hidden lg:inline md:inline'>
          <Link href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} target='_blank' className="ms-auto text-zinc-400">
            API
          </Link>
        </Button>
        {/* { currentPath === "/" ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="link" className='h-8 lg:hidden md:hidden flex'>
                Saiba mais
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
        ) : null} */}
      </div>
    </motion.div>
  );
};

export default NavbarSection;
